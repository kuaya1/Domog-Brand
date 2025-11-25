import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Product } from '@/lib/products';

// ============================================================================
// Types
// ============================================================================

interface ViewedProduct {
    productId: string;
    viewedAt: number;
    category: string;
    price: number;
}

interface RecentlyViewedState {
    // State
    viewedProducts: ViewedProduct[];
    maxItems: number;
}

interface RecentlyViewedActions {
    // Actions
    addViewedProduct: (product: Product) => void;
    removeViewedProduct: (productId: string) => void;
    clearHistory: () => void;
    getRecentlyViewed: () => ViewedProduct[];
    getViewedCategories: () => string[];
    getAveragePriceRange: () => { min: number; max: number } | null;
}

type RecentlyViewedStore = RecentlyViewedState & RecentlyViewedActions;

// ============================================================================
// Constants
// ============================================================================

const MAX_VIEWED_ITEMS = 20;
const STORE_NAME = 'recently-viewed-store';
const STORAGE_KEY = 'domog-recently-viewed-v1';

// ============================================================================
// Store
// ============================================================================

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
    devtools(
        persist(
            immer((set, get) => ({
                // ========================================
                // Initial State
                // ========================================
                viewedProducts: [],
                maxItems: MAX_VIEWED_ITEMS,

                // ========================================
                // Actions
                // ========================================

                /**
                 * Add a product to recently viewed
                 * Moves to front if already viewed
                 */
                addViewedProduct: (product: Product) => {
                    set((state) => {
                        // Remove if already exists
                        state.viewedProducts = state.viewedProducts.filter(
                            (p) => p.productId !== product.id
                        );
                        
                        // Add to front
                        state.viewedProducts.unshift({
                            productId: product.id,
                            viewedAt: Date.now(),
                            category: product.category,
                            price: product.price,
                        });
                        
                        // Trim to max
                        if (state.viewedProducts.length > state.maxItems) {
                            state.viewedProducts = state.viewedProducts.slice(0, state.maxItems);
                        }
                    });
                },

                /**
                 * Remove a product from history
                 */
                removeViewedProduct: (productId: string) => {
                    set((state) => {
                        state.viewedProducts = state.viewedProducts.filter(
                            (p) => p.productId !== productId
                        );
                    });
                },

                /**
                 * Clear all viewing history
                 */
                clearHistory: () => {
                    set((state) => {
                        state.viewedProducts = [];
                    });
                },

                /**
                 * Get recently viewed products
                 */
                getRecentlyViewed: () => {
                    return get().viewedProducts;
                },

                /**
                 * Get categories from recently viewed
                 * Ordered by frequency
                 */
                getViewedCategories: () => {
                    const { viewedProducts } = get();
                    const categoryCount = viewedProducts.reduce((acc, p) => {
                        acc[p.category] = (acc[p.category] || 0) + 1;
                        return acc;
                    }, {} as Record<string, number>);
                    
                    return Object.entries(categoryCount)
                        .sort((a, b) => b[1] - a[1])
                        .map(([category]) => category);
                },

                /**
                 * Get average price range from viewing history
                 */
                getAveragePriceRange: () => {
                    const { viewedProducts } = get();
                    if (viewedProducts.length === 0) return null;
                    
                    const prices = viewedProducts.map((p) => p.price);
                    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
                    const variance = avg * 0.3; // 30% variance
                    
                    return {
                        min: Math.max(0, avg - variance),
                        max: avg + variance,
                    };
                },
            })),
            {
                name: STORAGE_KEY,
                partialize: (state) => ({
                    viewedProducts: state.viewedProducts,
                }),
            }
        ),
        { name: STORE_NAME }
    )
);

// ============================================================================
// Selectors
// ============================================================================

export const selectViewedProductIds = (state: RecentlyViewedStore) =>
    state.viewedProducts.map((p) => p.productId);

export const selectRecentCount = (state: RecentlyViewedStore) =>
    state.viewedProducts.length;

export const selectHasHistory = (state: RecentlyViewedStore) =>
    state.viewedProducts.length > 0;
