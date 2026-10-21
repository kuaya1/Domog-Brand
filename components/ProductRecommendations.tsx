'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Eye, Heart } from 'lucide-react';
import { products, type Product, getLocalizedName, getCategoryLabel } from '@/lib/products';
import { useRecentlyViewedStore } from '@/lib/stores/recently-viewed-store';
import { useWishlistStore } from '@/lib/stores/wishlist-store';
import { useMessages } from '@/lib/i18n/use-messages';
import { formatPrice } from '@/lib/i18n/messages';
import { cn } from '@/lib/utils';

type RecommendationType = 'similar' | 'recently-viewed';

interface ProductRecommendationsProps {
    /** Current product (for "similar"). */
    currentProduct?: Product;
    type?: RecommendationType;
    maxItems?: number;
    className?: string;
    excludeIds?: string[];
}

/** Same category first, then similar price. */
function getSimilarProducts(current: Product, maxItems: number, excludeIds: string[]): Product[] {
    return products
        .filter((p) => p.id !== current.id && !excludeIds.includes(p.id))
        .map((p) => {
            let score = p.category === current.category ? 10 : 0;
            const priceDiff = Math.abs(p.price - current.price) / current.price;
            if (priceDiff < 0.3) score += 5;
            else if (priceDiff < 0.5) score += 2;
            return { product: p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, maxItems)
        .map((item) => item.product);
}

export function ProductRecommendations({
    currentProduct,
    type = 'similar',
    maxItems = 4,
    className,
    excludeIds = [],
}: ProductRecommendationsProps) {
    const { t } = useMessages();
    const viewedProducts = useRecentlyViewedStore((state) => state.viewedProducts);

    const recommendations = useMemo(() => {
        const excluded = currentProduct ? [...excludeIds, currentProduct.id] : excludeIds;
        if (type === 'similar') {
            return currentProduct ? getSimilarProducts(currentProduct, maxItems, excluded) : [];
        }
        return viewedProducts
            .map((v) => v.productId)
            .filter((id) => !excluded.includes(id))
            .slice(0, maxItems)
            .map((id) => products.find((p) => p.id === id))
            .filter((p): p is Product => p !== undefined);
    }, [type, currentProduct, maxItems, excludeIds, viewedProducts]);

    if (recommendations.length === 0) return null;

    const Icon = type === 'similar' ? Sparkles : Eye;
    const title = type === 'similar' ? t.product.related : t.product.recentlyViewed;

    return (
        <section className={cn('py-12', className)}>
            <div className="flex items-center justify-between gap-4 mb-8">
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal-900 flex items-center gap-3">
                    <Icon className="h-6 w-6 text-cognac-500" aria-hidden="true" />
                    {title}
                </h2>
                {type === 'recently-viewed' && (
                    <button
                        type="button"
                        onClick={() => useRecentlyViewedStore.getState().clearHistory()}
                        className="text-sm text-stone-warm hover:text-charcoal-900 transition-colors"
                    >
                        {t.product.clearHistory}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {recommendations.map((product) => (
                    <RecommendationCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

function RecommendationCard({ product }: { product: Product }) {
    const { locale, t } = useMessages();
    const toggleWishlist = useWishlistStore((state) => state.toggleItem);
    const isInWishlist = useWishlistStore((state) => state.items.some((item) => item.productId === product.id));
    const name = getLocalizedName(product, locale);
    const href = `/${locale}/products/${product.id}`;

    return (
        <div className="group relative">
            <Link href={href} className="block relative aspect-[3/4] bg-cream-100 overflow-hidden mb-3" tabIndex={-1} aria-hidden="true">
                {product.images[0] ? (
                    <Image
                        src={product.images[0]}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                ) : (
                    <span className="w-full h-full flex items-center justify-center text-cream-300">
                        <Sparkles className="h-8 w-8" />
                    </span>
                )}
                <span className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isNew && (
                        <span className="bg-gold text-charcoal-900 text-[10px] uppercase tracking-wider px-2 py-1">{t.product.new}</span>
                    )}
                    {product.inStock === false && (
                        <span className="bg-burgundy text-cream-50 text-[10px] uppercase tracking-wider px-2 py-1">
                            {t.product.outOfStockBadge}
                        </span>
                    )}
                </span>
            </Link>

            <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={cn(
                    'absolute top-3 right-3 p-2 rounded-full transition-all',
                    'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100',
                    isInWishlist ? 'bg-burgundy text-cream-50' : 'bg-cream-50/90 text-cream-600 hover:text-burgundy'
                )}
                aria-label={isInWishlist ? t.product.wishlistRemove : t.product.wishlistAdd}
                aria-pressed={isInWishlist}
            >
                <Heart className={cn('h-4 w-4', isInWishlist && 'fill-current')} aria-hidden="true" />
            </button>

            <Link href={href} className="block">
                <h3 className="font-serif text-sm md:text-base text-charcoal-900 mb-1 group-hover:text-cognac transition-colors line-clamp-2">
                    {name}
                </h3>
                <p className="text-xs text-stone-warm mb-1">{getCategoryLabel(product.category, locale)}</p>
                <p className="font-serif text-sm md:text-base text-cognac">{formatPrice(product.price)}</p>
            </Link>
        </div>
    );
}

export default ProductRecommendations;
