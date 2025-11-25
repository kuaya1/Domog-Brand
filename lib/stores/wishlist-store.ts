import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Product } from '@/lib/products';

// ============================================================================
// Types
// ============================================================================

export interface WishlistItem {
    /** Product ID */
    productId: string;
    /** Product name */
    name: string;
    /** Product price at time of adding */
    price: number;
    /** Product image */
    image: string;
    /** Product category */
    category: string;
    /** When added to wishlist */
    addedAt: number;
    /** Optional note from user */
    note?: string;
    /** Preferred size (optional) */
    preferredSize?: string;
    /** Price when added (for price drop alerts) */
    originalPrice: number;
    /** In stock status when added */
    wasInStock: boolean;
}

export interface WishlistState {
    items: WishlistItem[];
    isLoading: boolean;
    lastSyncedAt: number | null;
}

export interface WishlistActions {
    // Core actions
    addItem: (product: Product, options?: { note?: string; preferredSize?: string }) => AddWishlistResult;
    removeItem: (productId: string) => void;
    toggleItem: (product: Product) => ToggleWishlistResult;
    clearWishlist: () => void;
    
    // Item management
    updateNote: (productId: string, note: string) => void;
    updatePreferredSize: (productId: string, size: string) => void;
    
    // Queries
    hasItem: (productId: string) => boolean;
    getItem: (productId: string) => WishlistItem | undefined;
    getItemCount: () => number;
    getItemsByCategory: (category: string) => WishlistItem[];
    getPriceDrops: (products: Product[]) => PriceDropItem[];
    getBackInStock: (products: Product[]) => BackInStockItem[];
    
    // Sync actions (for future API integration)
    setLoading: (loading: boolean) => void;
    syncFromServer: (items: WishlistItem[]) => void;
    markSynced: () => void;
    
    // Utility
    exportWishlist: () => WishlistExport;
    importWishlist: (data: WishlistExport) => ImportResult;
    
    // Debug
    _debug: () => WishlistDebugInfo;
    _reset: () => void;
}

export type WishlistStore = WishlistState & WishlistActions;

// Result types
export type AddWishlistResult = 
    | { success: true; item: WishlistItem; message: string }
    | { success: false; error: string; code: 'ALREADY_EXISTS' | 'INVALID_PRODUCT' };

export type ToggleWishlistResult = 
    | { action: 'added'; item: WishlistItem }
    | { action: 'removed'; productId: string };

export interface PriceDropItem {
    item: WishlistItem;
    currentPrice: number;
    originalPrice: number;
    dropAmount: number;
    dropPercent: number;
}

export interface BackInStockItem {
    item: WishlistItem;
    product: Product;
}

export interface WishlistExport {
    version: number;
    exportedAt: number;
    items: Array<{
        productId: string;
        note?: string;
        preferredSize?: string;
    }>;
}

export type ImportResult = 
    | { success: true; imported: number; skipped: number }
    | { success: false; error: string };

export interface WishlistDebugInfo {
    itemCount: number;
    items: WishlistItem[];
    lastSynced: string | null;
    storageKey: string;
}

// ============================================================================
// Constants
// ============================================================================

const WISHLIST_STORAGE_KEY = 'domog-wishlist-v1';
const MAX_WISHLIST_ITEMS = 100;

// ============================================================================
// Store Implementation
// ============================================================================

export const useWishlistStore = create<WishlistStore>()(
    devtools(
        persist(
            immer((set, get) => ({
                // Initial state
                items: [],
                isLoading: false,
                lastSyncedAt: null,

                // ============================================================
                // Core Actions
                // ============================================================

                addItem: (product, options = {}): AddWishlistResult => {
                    if (!product || !product.id) {
                        return { success: false, error: 'Invalid product', code: 'INVALID_PRODUCT' };
                    }

                    const state = get();
                    if (state.hasItem(product.id)) {
                        return { success: false, error: 'Already in wishlist', code: 'ALREADY_EXISTS' };
                    }

                    const wishlistItem: WishlistItem = {
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0] || '',
                        category: product.category,
                        addedAt: Date.now(),
                        note: options.note,
                        preferredSize: options.preferredSize,
                        originalPrice: product.price,
                        wasInStock: product.inStock !== false,
                    };

                    set(state => {
                        // Enforce max items (remove oldest if at limit)
                        if (state.items.length >= MAX_WISHLIST_ITEMS) {
                            state.items.sort((a, b) => a.addedAt - b.addedAt);
                            state.items.shift(); // Remove oldest
                        }
                        state.items.push(wishlistItem);
                    });

                    return { 
                        success: true, 
                        item: wishlistItem, 
                        message: `${product.name} added to wishlist` 
                    };
                },

                removeItem: (productId) => {
                    set(state => {
                        const index = state.items.findIndex(item => item.productId === productId);
                        if (index > -1) {
                            state.items.splice(index, 1);
                        }
                    });
                },

                toggleItem: (product): ToggleWishlistResult => {
                    const state = get();
                    
                    if (state.hasItem(product.id)) {
                        state.removeItem(product.id);
                        return { action: 'removed', productId: product.id };
                    }

                    const result = state.addItem(product);
                    if (result.success) {
                        return { action: 'added', item: result.item };
                    }

                    // Fallback (shouldn't happen)
                    return { action: 'removed', productId: product.id };
                },

                clearWishlist: () => {
                    set(state => {
                        state.items = [];
                    });
                },

                // ============================================================
                // Item Management
                // ============================================================

                updateNote: (productId, note) => {
                    set(state => {
                        const item = state.items.find(i => i.productId === productId);
                        if (item) {
                            item.note = note || undefined;
                        }
                    });
                },

                updatePreferredSize: (productId, size) => {
                    set(state => {
                        const item = state.items.find(i => i.productId === productId);
                        if (item) {
                            item.preferredSize = size || undefined;
                        }
                    });
                },

                // ============================================================
                // Queries
                // ============================================================

                hasItem: (productId) => {
                    return get().items.some(item => item.productId === productId);
                },

                getItem: (productId) => {
                    return get().items.find(item => item.productId === productId);
                },

                getItemCount: () => {
                    return get().items.length;
                },

                getItemsByCategory: (category) => {
                    return get().items.filter(item => item.category === category);
                },

                getPriceDrops: (products): PriceDropItem[] => {
                    const state = get();
                    const priceDrops: PriceDropItem[] = [];

                    for (const item of state.items) {
                        const product = products.find(p => p.id === item.productId);
                        if (product && product.price < item.originalPrice) {
                            const dropAmount = item.originalPrice - product.price;
                            const dropPercent = (dropAmount / item.originalPrice) * 100;
                            
                            priceDrops.push({
                                item,
                                currentPrice: product.price,
                                originalPrice: item.originalPrice,
                                dropAmount,
                                dropPercent,
                            });
                        }
                    }

                    return priceDrops.sort((a, b) => b.dropPercent - a.dropPercent);
                },

                getBackInStock: (products): BackInStockItem[] => {
                    const state = get();
                    const backInStock: BackInStockItem[] = [];

                    for (const item of state.items) {
                        // Item was out of stock when added
                        if (!item.wasInStock) {
                            const product = products.find(p => p.id === item.productId);
                            // Now in stock
                            if (product && product.inStock !== false) {
                                backInStock.push({ item, product });
                            }
                        }
                    }

                    return backInStock;
                },

                // ============================================================
                // Sync Actions
                // ============================================================

                setLoading: (loading) => {
                    set(state => {
                        state.isLoading = loading;
                    });
                },

                syncFromServer: (items) => {
                    set(state => {
                        // Merge server items with local, preferring server
                        const serverIds = new Set(items.map(i => i.productId));
                        const localOnly = state.items.filter(i => !serverIds.has(i.productId));
                        
                        state.items = [...items, ...localOnly];
                        state.lastSyncedAt = Date.now();
                    });
                },

                markSynced: () => {
                    set(state => {
                        state.lastSyncedAt = Date.now();
                    });
                },

                // ============================================================
                // Utility
                // ============================================================

                exportWishlist: (): WishlistExport => {
                    const state = get();
                    return {
                        version: 1,
                        exportedAt: Date.now(),
                        items: state.items.map(item => ({
                            productId: item.productId,
                            note: item.note,
                            preferredSize: item.preferredSize,
                        })),
                    };
                },

                importWishlist: (data): ImportResult => {
                    if (!data || data.version !== 1 || !Array.isArray(data.items)) {
                        return { success: false, error: 'Invalid wishlist format' };
                    }

                    const state = get();
                    let imported = 0;
                    let skipped = 0;

                    set(state => {
                        for (const importItem of data.items) {
                            if (!importItem.productId) {
                                skipped++;
                                continue;
                            }

                            // Skip if already exists
                            if (state.items.some(i => i.productId === importItem.productId)) {
                                skipped++;
                                continue;
                            }

                            // Create placeholder item (full data would come from product lookup)
                            state.items.push({
                                productId: importItem.productId,
                                name: 'Imported Item',
                                price: 0,
                                image: '',
                                category: '',
                                addedAt: Date.now(),
                                note: importItem.note,
                                preferredSize: importItem.preferredSize,
                                originalPrice: 0,
                                wasInStock: true,
                            });
                            imported++;
                        }
                    });

                    return { success: true, imported, skipped };
                },

                // ============================================================
                // Debug
                // ============================================================

                _debug: (): WishlistDebugInfo => {
                    const state = get();
                    return {
                        itemCount: state.items.length,
                        items: state.items,
                        lastSynced: state.lastSyncedAt 
                            ? new Date(state.lastSyncedAt).toISOString() 
                            : null,
                        storageKey: WISHLIST_STORAGE_KEY,
                    };
                },

                _reset: () => {
                    set(state => {
                        state.items = [];
                        state.isLoading = false;
                        state.lastSyncedAt = null;
                    });
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem(WISHLIST_STORAGE_KEY);
                    }
                },
            })),
            {
                name: WISHLIST_STORAGE_KEY,
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                    items: state.items,
                    lastSyncedAt: state.lastSyncedAt,
                }),
            }
        ),
        {
            name: 'WishlistStore',
            enabled: process.env.NODE_ENV === 'development',
        }
    )
);

// ============================================================================
// Selector Hooks
// ============================================================================

export const useWishlistItems = () => useWishlistStore(state => state.items);
export const useWishlistCount = () => useWishlistStore(state => state.getItemCount());
export const useWishlistLoading = () => useWishlistStore(state => state.isLoading);

// Check if specific product is in wishlist
export const useIsInWishlist = (productId: string) => 
    useWishlistStore(state => state.hasItem(productId));

// Get wishlist items by category
export const useWishlistByCategory = (category: string) =>
    useWishlistStore(state => state.getItemsByCategory(category));
