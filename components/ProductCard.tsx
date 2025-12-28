'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { OptimizedImage } from './ui/OptimizedImage';
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
 * - Multi-angle image gallery with hover swap and thumbnails
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const handleImageLoad = useCallback(() => setImageLoaded(true), []);
    const handleImageError = useCallback(() => setImageError(true), []);
    const handleThumbnailClick = useCallback((index: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(index);
    }, []);

    // Get the display image - show second image on hover if not manually selected
    const displayImageIndex = isHovering && currentImageIndex === 0 && product.images.length > 1 
        ? 1 
        : currentImageIndex;

    const localizedName = getLocalizedName(product, locale);
    const localizedCategory = getLocalizedCategory(product, locale);

    return (
        <div className="group cursor-pointer">
            {/* Card container - Warm shadow, dramatic lift, touch feedback */}
            <Link
                href={`/${locale}/products/${product.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-4"
                aria-label={`View ${localizedName} - $${product.price}`}
            >
                <article className="
                    relative bg-white
                    shadow-card-warm hover:shadow-card-warm-hover
                    transition-all duration-500 ease-out
                    hover:-translate-y-2 active:translate-y-0 active:shadow-card-warm
                    will-change-transform
                "
                >
                    {/* Product Image - 3:4 aspect ratio with centered contain-fit */}
                    <div 
                        className="relative aspect-[3/4] bg-cream-50 overflow-hidden"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {/* Skeleton loader */}
                        {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 bg-cream-100 animate-pulse" aria-hidden="true" />
                        )}

                        {imageError ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-cream-50">
                                <span className="font-sans text-sm text-warm-500">Image unavailable</span>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <div className="relative w-full h-full">
                                    <OptimizedImage
                                        key={displayImageIndex}
                                        src={product.images[displayImageIndex]}
                                        alt={`${localizedName} - ${localizedCategory} - Handcrafted Mongolian Boot by Domog - View ${displayImageIndex + 1}`}
                                        fill
                                        priority={priority}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className={`
                                            object-contain
                                            transition-opacity duration-500 ease-out
                                            will-change-opacity
                                            filter-product-enhance drop-shadow-product
                                            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                                        `}
                                    />
                                </div>
                            </div>
                        )}
                        
                        {/* Thumbnail Gallery - Bottom of image area */}
                        {product.images.length > 1 && (
                            <div className="
                                absolute bottom-4 left-0 right-0 z-10
                                flex items-center justify-center gap-3
                                px-4
                                opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                                transition-opacity duration-500
                            ">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => handleThumbnailClick(index, e)}
                                        className={`
                                            relative w-12 h-12 min-w-[48px] min-h-[48px]
                                            bg-white
                                            rounded-md
                                            overflow-hidden
                                            transition-all duration-300
                                            active:scale-95
                                            ${currentImageIndex === index 
                                                ? 'ring-2 ring-gold-700 shadow-lg scale-105' 
                                                : 'ring-1 ring-stone-200 hover:ring-gold-400 shadow-md'
                                            }
                                        `}
                                        aria-label={`View angle ${index + 1}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${localizedName} angle ${index + 1}`}
                                            fill
                                            sizes="48px"
                                            className="object-contain p-1"
                                        />
                                    </button>
                                ))}
                            </div>
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
                    
                    {/* Product Info - Better mobile padding */}
                    <div className="p-5 sm:p-6 space-y-3">
                        {/* Product Name */}
                        <h3 className="
                            text-lg sm:text-xl font-serif text-charcoal-900
                            group-hover:text-gold-text-accessible
                            transition-colors duration-500
                            leading-snug
                        ">
                            {localizedName}
                        </h3>
                        
                        {/* Price Row - HUGE price + Hover CTA */}
                        <div className="flex items-end justify-between pt-2">
                            {/* Price - MASSIVE serif with USD superscript */}
                            <div className="flex items-baseline">
                                <span className="text-3xl sm:text-4xl font-serif font-light text-charcoal-900 tracking-tight">
                                    ${product.price.toLocaleString()}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-stone-accessible font-medium ml-1 -translate-y-2.5 sm:-translate-y-3">
                                    USD
                                </span>
                            </div>
                            
                            {/* Mobile: Always visible CTA, Desktop: Hover CTA */}
                            <div className="
                                flex items-center gap-1
                                text-[11px] uppercase tracking-[0.15em]
                                text-gold-text-accessible font-medium
                                opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                                sm:translate-x-2 sm:group-hover:translate-x-0
                                transition-all duration-500
                            ">
                                <span>{t.view_details || 'Study'}</span>
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
