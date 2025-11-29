'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, getLocalizedName, getLocalizedCategory } from '@/lib/products';
import { ArrowRight } from 'lucide-react';
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
 * Luxury ProductCard Component - Furlan Marri Style
 * - Warm shadows with dramatic hover lift
 * - Massive serif pricing with USD superscript
 * - Slow, elegant transitions (700ms)
 * - Hover CTA reveal with arrow
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
    
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => setImageLoaded(true), []);
    const handleImageError = useCallback(() => setImageError(true), []);

    const localizedName = getLocalizedName(product, locale);
    const localizedCategory = getLocalizedCategory(product, locale);

    return (
        <div className="group cursor-pointer">
            {/* Card container - Warm shadow, dramatic lift */}
            <Link
                href={`/${locale}/products/${product.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-4"
                aria-label={`View ${localizedName} - $${product.price}`}
            >
                <article className="
                    relative bg-white
                    shadow-lg hover:shadow-2xl
                    transition-all duration-500 ease-out
                    hover:-translate-y-2
                    will-change-transform
                "
                style={{
                    boxShadow: '0 4px 20px rgba(139, 111, 71, 0.08)',
                }}
                >
                    {/* Product Image - 3:4 aspect ratio */}
                    <div className="relative aspect-[3/4] bg-cream-50 overflow-hidden">
                        {/* Skeleton loader */}
                        {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 bg-cream-100 animate-pulse" aria-hidden="true" />
                        )}

                        {imageError ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-cream-50">
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
                                    will-change-transform
                                    mix-blend-multiply dark:mix-blend-normal
                                    ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                                `}
                                style={{
                                    filter: 'contrast(1.05) saturate(1.08)'
                                }}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                            />
                        )}
                        
                        {/* Darkening overlay on hover */}
                        <div className="
                            absolute inset-0
                            bg-black/0 group-hover:bg-black/10
                            transition-all duration-500
                        " />
                        
                        {/* Category badge - top left */}
                        <div className="absolute top-4 left-4 z-10">
                            <span className="
                                px-3 py-1.5
                                bg-white/90 backdrop-blur-sm
                                text-[10px] uppercase tracking-[0.25em]
                                text-charcoal-900 font-medium
                                shadow-sm
                            ">
                                {localizedCategory}
                            </span>
                        </div>
                        
                        {/* NEW Badge - top right (gold) */}
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
                    <div className="p-6 space-y-3">
                        {/* Product Name */}
                        <h3 className="
                            text-xl font-serif text-charcoal-900
                            group-hover:text-gold-700
                            transition-colors duration-500
                            leading-tight
                        ">
                            {localizedName}
                        </h3>
                        
                        {/* Price Row - HUGE price + Hover CTA */}
                        <div className="flex items-end justify-between pt-2">
                            {/* Price - MASSIVE serif with USD superscript */}
                            <div className="flex items-baseline">
                                <span className="text-4xl font-serif font-light text-charcoal-900 tracking-tight">
                                    ${product.price.toLocaleString()}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium ml-1 -translate-y-3">
                                    USD
                                </span>
                            </div>
                            
                            {/* Hover CTA - View Details with arrow */}
                            <div className="
                                flex items-center gap-1
                                text-[11px] uppercase tracking-[0.15em]
                                text-gold-700 font-medium
                                opacity-0 group-hover:opacity-100
                                translate-x-2 group-hover:translate-x-0
                                transition-all duration-500
                            ">
                                <span>{t.view_details || 'View'}</span>
                                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
});

export default ProductCard;
