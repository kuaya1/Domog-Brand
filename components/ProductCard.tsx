'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, getLocalizedName, getLocalizedCategory } from '@/lib/products';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import { type ProductCardDictionary, getDictionarySection } from '@/lib/dictionaries';

interface ProductCardProps {
    product: Product;
    priority?: boolean;
    locale?: Locale;
    dictionary?: ProductCardDictionary;
}

/**
 * Optimized ProductCard Component
 * - Memoized to prevent unnecessary re-renders
 * - Lazy loads images below the fold
 * - Supports localized product names, categories, and UI strings
 */
const ProductCard = memo(function ProductCard({ 
    product, 
    priority = false,
    locale: propLocale,
    dictionary: propDictionary
}: ProductCardProps) {
    const hookLocale = useLocale();
    const locale = propLocale || hookLocale;
    
    // Get dictionary - use prop if provided, otherwise fetch from locale
    const t = propDictionary || getDictionarySection(locale, 'productCard');
    
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);
    const handleImageLoad = useCallback(() => setImageLoaded(true), []);
    const handleImageError = useCallback(() => setImageError(true), []);

    const localizedName = getLocalizedName(product, locale);
    const localizedCategory = getLocalizedCategory(product, locale);

    return (
        <Link
            href={`/${locale}/products/${product.id}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={`View ${localizedName} - $${product.price}`}
        >
            <article className="bg-cream border border-gold/10 transition-all duration-500 hover:border-gold/30 hover:shadow-luxury overflow-hidden">
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-cream-sand overflow-hidden">
                    {/* Skeleton loader */}
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 bg-cream-sand animate-pulse" aria-hidden="true" />
                    )}

                    {imageError ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-cream-sand">
                            <span className="font-sans text-sm text-stone-muted">Image unavailable</span>
                        </div>
                    ) : (
                        <Image
                            src={product.images[0]}
                            alt={`${localizedName} - ${localizedCategory}`}
                            fill
                            priority={priority}
                            loading={priority ? 'eager' : 'lazy'}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={`
                                object-cover object-center transition-all duration-700
                                ${isHovered ? 'scale-105' : 'scale-100'}
                                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                            `}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                    )}

                    {/* Overlay on hover */}
                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`} />

                    {/* Category Badge */}
                    <div className={`absolute top-6 left-6 transition-all duration-500 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}>
                        <span className="inline-block px-4 py-2 bg-black/80 backdrop-blur-sm text-gold font-sans text-xs uppercase tracking-widest">
                            {localizedCategory}
                        </span>
                    </div>

                    {/* New Badge */}
                    {product.isNew && (
                        <div className="absolute top-6 right-6">
                            <span className="inline-block px-3 py-1.5 bg-gold text-black font-sans text-xs uppercase tracking-wider">
                                {t.new_badge}
                            </span>
                        </div>
                    )}

                    {/* View Details - appears on hover */}
                    <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                        <span className="inline-flex items-center gap-2 text-cream font-sans text-sm uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                            <span>{t.view_details}</span>
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                    {/* Product Name */}
                    <h3 className="font-serif text-xl lg:text-2xl text-black font-medium mb-3 group-hover:text-cognac transition-colors duration-300">
                        {localizedName}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl lg:text-3xl text-cognac">
                            ${product.price.toLocaleString()}
                        </span>
                        <span className="font-sans text-xs text-stone-muted uppercase tracking-wider">
                            {t.usd}
                        </span>
                    </div>

                    {/* Stock Status */}
                    {product.inStock === false && (
                        <p className="mt-3 font-sans text-xs text-burgundy uppercase tracking-wider">
                            {t.currently_unavailable}
                        </p>
                    )}
                </div>
            </article>
        </Link>
    );
});

export default ProductCard;
