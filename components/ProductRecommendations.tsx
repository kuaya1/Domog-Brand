'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Eye, TrendingUp, Heart } from 'lucide-react';
import { products, type Product } from '@/lib/products';
import { useRecentlyViewedStore } from '@/lib/stores/recently-viewed-store';
import { useWishlistStore } from '@/lib/stores/wishlist-store';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

type RecommendationType = 'similar' | 'recently-viewed' | 'trending' | 'wishlist-based';

interface ProductRecommendationsProps {
    /** Current product (for "similar products") */
    currentProduct?: Product;
    /** Recommendation type */
    type?: RecommendationType;
    /** Maximum products to show */
    maxItems?: number;
    /** Title override */
    title?: string;
    /** Class name for styling */
    className?: string;
    /** Exclude these product IDs */
    excludeIds?: string[];
}

// ============================================================================
// Recommendation Logic
// ============================================================================

function getSimilarProducts(
    currentProduct: Product,
    allProducts: Product[],
    maxItems: number,
    excludeIds: string[]
): Product[] {
    return allProducts
        .filter((p) => {
            // Exclude current and specified products
            if (p.id === currentProduct.id || excludeIds.includes(p.id)) return false;
            return true;
        })
        .map((p) => {
            let score = 0;
            
            // Same category = high score
            if (p.category === currentProduct.category) score += 10;
            
            // Similar price range (within 30%)
            const priceDiff = Math.abs(p.price - currentProduct.price) / currentProduct.price;
            if (priceDiff < 0.3) score += 5;
            else if (priceDiff < 0.5) score += 2;
            
            // Both new arrivals
            if (p.isNew && currentProduct.isNew) score += 3;
            
            // Both in stock
            if (p.inStock !== false && currentProduct.inStock !== false) score += 1;
            
            return { product: p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, maxItems)
        .map((item) => item.product);
}

function getRecentlyViewedRecommendations(
    viewedProductIds: string[],
    allProducts: Product[],
    maxItems: number,
    excludeIds: string[]
): Product[] {
    return viewedProductIds
        .filter((id) => !excludeIds.includes(id))
        .slice(0, maxItems)
        .map((id) => allProducts.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined);
}

function getTrendingProducts(
    allProducts: Product[],
    maxItems: number,
    excludeIds: string[]
): Product[] {
    // Simulate trending: new arrivals + in stock
    return allProducts
        .filter((p) => !excludeIds.includes(p.id) && p.inStock !== false)
        .sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;
            
            if (a.isNew) scoreA += 10;
            if (b.isNew) scoreB += 10;
            
            // Higher price items often more "desirable"
            scoreA += a.price / 100;
            scoreB += b.price / 100;
            
            return scoreB - scoreA;
        })
        .slice(0, maxItems);
}

function getWishlistBasedRecommendations(
    wishlistItems: { productId: string }[],
    allProducts: Product[],
    maxItems: number,
    excludeIds: string[]
): Product[] {
    // Get categories and average price from wishlist
    const wishlistProducts = wishlistItems
        .map((item) => allProducts.find((p) => p.id === item.productId))
        .filter((p): p is Product => p !== undefined);
    
    if (wishlistProducts.length === 0) {
        return getTrendingProducts(allProducts, maxItems, excludeIds);
    }
    
    const wishlistCategories = [...new Set(wishlistProducts.map((p) => p.category))];
    const avgPrice = wishlistProducts.reduce((sum, p) => sum + p.price, 0) / wishlistProducts.length;
    
    return allProducts
        .filter((p) => {
            // Exclude wishlist items and specified exclusions
            if (wishlistItems.some((w) => w.productId === p.id)) return false;
            if (excludeIds.includes(p.id)) return false;
            return true;
        })
        .map((p) => {
            let score = 0;
            
            // Same category as wishlist items
            if (wishlistCategories.includes(p.category)) score += 10;
            
            // Similar price to wishlist average
            const priceDiff = Math.abs(p.price - avgPrice) / avgPrice;
            if (priceDiff < 0.2) score += 5;
            else if (priceDiff < 0.4) score += 2;
            
            // New items are interesting
            if (p.isNew) score += 3;
            
            return { product: p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, maxItems)
        .map((item) => item.product);
}

// ============================================================================
// Component
// ============================================================================

const TYPE_CONFIG: Record<RecommendationType, { icon: typeof Sparkles; defaultTitle: string }> = {
    'similar': { icon: Sparkles, defaultTitle: 'You May Also Like' },
    'recently-viewed': { icon: Eye, defaultTitle: 'Recently Viewed' },
    'trending': { icon: TrendingUp, defaultTitle: 'Trending Now' },
    'wishlist-based': { icon: Heart, defaultTitle: 'Based on Your Wishlist' },
};

export function ProductRecommendations({
    currentProduct,
    type = 'similar',
    maxItems = 4,
    title,
    className,
    excludeIds = [],
}: ProductRecommendationsProps) {
    const viewedProducts = useRecentlyViewedStore((state) => state.viewedProducts);
    const wishlistItems = useWishlistStore((state) => state.items);
    
    const recommendations = useMemo(() => {
        const allExcluded = [...excludeIds];
        if (currentProduct) allExcluded.push(currentProduct.id);
        
        switch (type) {
            case 'similar':
                if (!currentProduct) return [];
                return getSimilarProducts(currentProduct, products, maxItems, allExcluded);
            
            case 'recently-viewed':
                return getRecentlyViewedRecommendations(
                    viewedProducts.map((p) => p.productId),
                    products,
                    maxItems,
                    allExcluded
                );
            
            case 'trending':
                return getTrendingProducts(products, maxItems, allExcluded);
            
            case 'wishlist-based':
                return getWishlistBasedRecommendations(
                    wishlistItems,
                    products,
                    maxItems,
                    allExcluded
                );
            
            default:
                return [];
        }
    }, [type, currentProduct, maxItems, excludeIds, viewedProducts, wishlistItems]);
    
    const config = TYPE_CONFIG[type];
    const Icon = config.icon;
    const displayTitle = title || config.defaultTitle;
    
    // Don't render if no recommendations
    if (recommendations.length === 0) return null;
    
    return (
        <section className={cn('py-12', className)}>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl md:text-3xl text-black flex items-center gap-3">
                    <Icon className="h-6 w-6 text-cognac-500" />
                    {displayTitle}
                </h2>
                
                {type === 'recently-viewed' && recommendations.length > 0 && (
                    <button
                        onClick={() => useRecentlyViewedStore.getState().clearHistory()}
                        className="text-sm text-cream-500 hover:text-black transition-colors"
                    >
                        Clear history
                    </button>
                )}
            </div>
            
            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {recommendations.map((product) => (
                    <RecommendationCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

// ============================================================================
// Recommendation Card
// ============================================================================

function RecommendationCard({ product }: { product: Product }) {
    const toggleWishlist = useWishlistStore((state) => state.toggleItem);
    const isInWishlist = useWishlistStore((state) => 
        state.items.some((item) => item.productId === product.id)
    );
    
    return (
        <div className="group relative">
            {/* Image */}
            <Link href={`/products/${product.id}`} className="block relative aspect-[3/4] bg-cream-100 overflow-hidden mb-3">
                {product.images[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-cream-300">
                        <Sparkles className="h-8 w-8" />
                    </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isNew && (
                        <span className="bg-gold text-black text-[10px] uppercase tracking-wider px-2 py-1">
                            New
                        </span>
                    )}
                    {product.inStock === false && (
                        <span className="bg-burgundy text-white text-[10px] uppercase tracking-wider px-2 py-1">
                            Sold Out
                        </span>
                    )}
                </div>
                
                {/* Quick Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                    }}
                    className={cn(
                        "absolute top-3 right-3 p-2 rounded-full transition-all",
                        "opacity-0 group-hover:opacity-100",
                        isInWishlist 
                            ? "bg-burgundy text-white" 
                            : "bg-white/90 text-cream-600 hover:text-burgundy"
                    )}
                    aria-label={isInWishlist ? "In wishlist" : "Add to wishlist"}
                >
                    <Heart className={cn("h-4 w-4", isInWishlist && "fill-current")} />
                </button>
            </Link>
            
            {/* Product Info */}
            <Link href={`/products/${product.id}`} className="block">
                <h3 className="font-serif text-sm md:text-base text-black mb-1 group-hover:text-cognac-600 transition-colors line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-xs text-cream-500 mb-1">
                    {product.category}
                </p>
                <p className="font-serif text-sm md:text-base text-cognac-600">
                    ${product.price}
                </p>
            </Link>
        </div>
    );
}

export default ProductRecommendations;
