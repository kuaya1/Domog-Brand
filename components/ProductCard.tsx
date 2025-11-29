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
        <div className="group cursor-pointer">
            {/* Card container with refined shadow - Furlan Marri style */}
            <Link
                href={`/${locale}/products/${product.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label={`View ${localizedName} - $${product.price}`}
            >
                <article className="
                    relative bg-white
                    shadow-lg hover:shadow-2xl
                    transition-all duration-500 ease-out
                    hover:-translate-y-1
                ">
                    {/* Product Image - 3:4 aspect ratio */}
                    <div className="relative aspect-[3/4] bg-warm-50 overflow-hidden">
                        {/* Skeleton loader */}
                        {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 bg-warm-50 animate-pulse" aria-hidden="true" />
                        )}

                        {imageError ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-warm-50">
                                <span className="font-sans text-sm text-warm-500">Image unavailable</span>
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
                                    object-cover object-center
                                    transition-transform duration-700 ease-out
                                    group-hover:scale-105
                                    ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                                `}
                                style={{
                                    filter: 'contrast(1.1) saturate(1.05)'
                                }}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                            />
                        )}
                        
                        {/* Subtle dark overlay on hover */}
                        <div className="
                            absolute inset-0
                            bg-black/0 group-hover:bg-black/5
                            transition-all duration-500
                        " />
                        
                        {/* Category badge - top left */}
                        <div className="absolute top-4 left-4 z-10">
                            <span className="
                                px-3 py-1.5
                                bg-white/90 backdrop-blur-sm
                                text-[10px] uppercase tracking-[0.25em]
                                text-charcoal-800 font-medium
                                shadow-sm
                            ">
                                {localizedCategory}
                            </span>
                        </div>
                        
                        {/* New Badge - top right */}
                        {product.isNew && (
                            <div className="absolute top-4 right-4 z-10">
                                <span className="
                                    px-3 py-1.5
                                    bg-gold-700 text-white
                                    text-[10px] uppercase tracking-[0.25em] font-semibold
                                    shadow-md
                                ">
                                    {t.new_badge}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6 space-y-4">
                        {/* Product Name */}
                        <h3 className="
                            text-xl font-serif font-medium text-charcoal-900
                            group-hover:text-burgundy-700
                            transition-colors duration-300
                            leading-tight
                        ">
                            {localizedName}
                        </h3>
                        
                        {/* Short Description - if available */}
                        {product.description && (
                            <p className="
                                text-sm text-warm-700 
                                line-clamp-2 leading-relaxed
                                font-light
                            ">
                                {product.description}
                            </p>
                        )}
                        
                        {/* Price and CTA */}
                        <div className="flex items-baseline justify-between pt-4 border-t border-warm-200">
                            {/* Price - LARGE and sculptural */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-serif font-light text-charcoal-900">
                                    ${product.price.toLocaleString()}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-warm-500 font-medium">
                                    USD
                                </span>
                            </div>
                            
                            {/* View Details link - appears on hover */}
                            <span className="
                                text-xs uppercase tracking-[0.15em]
                                text-gold-700 font-medium
                                opacity-0 group-hover:opacity-100
                                transition-all duration-300
                                flex items-center gap-2
                            ">
                                View Details
                                <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>

                        {/* Stock Status */}
                        {product.inStock === false && (
                            <p className="text-xs text-burgundy-700 uppercase tracking-wider font-medium">
                                {t.currently_unavailable}
                            </p>
                        )}
                    </div>
                </article>
            </Link>
        </div>
    );
});

export default ProductCard;
