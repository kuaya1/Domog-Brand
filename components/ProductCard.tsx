'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';
import { type Product, getLocalizedName, getCategoryLabel } from '@/lib/products';
import { useMessages } from '@/lib/i18n/use-messages';
import { format, formatPrice } from '@/lib/i18n/messages';

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

/** Product card with hover image swap and angle thumbnails (home page featured grid). */
const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
    const { locale, t } = useMessages();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const handleThumbnailClick = useCallback((index: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(index);
    }, []);

    const displayImageIndex = isHovering && currentImageIndex === 0 && product.images.length > 1 ? 1 : currentImageIndex;
    const name = getLocalizedName(product, locale);
    const category = getCategoryLabel(product.category, locale);
    const price = formatPrice(product.price);

    return (
        <div className="group cursor-pointer">
            <Link
                href={`/${locale}/products/${product.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-4"
                aria-label={`${name}, ${category}, ${price} USD`}
            >
                <article className="relative bg-cream-50 shadow-card hover:shadow-card-hover transition-all duration-500 ease-out hover:-translate-y-2 active:translate-y-0 active:shadow-card will-change-transform rounded">
                    <div
                        className="relative aspect-[3/4] bg-transparent overflow-hidden"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {!imageLoaded && <div className="absolute inset-0 bg-cream-100 animate-pulse" aria-hidden="true" />}

                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="relative w-full h-full">
                                <OptimizedImage
                                    key={displayImageIndex}
                                    src={product.images[displayImageIndex]}
                                    alt={format(t.product.imageAlt, { model: name, number: displayImageIndex + 1 })}
                                    fill
                                    priority={priority}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    onLoad={() => setImageLoaded(true)}
                                    className={`object-contain mix-blend-multiply transition-opacity duration-500 ease-out will-change-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                />
                            </div>
                        </div>

                        {product.images.length > 1 && (
                            <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center gap-3 px-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={(e) => handleThumbnailClick(index, e)}
                                        className={`relative w-12 h-12 min-w-[48px] min-h-[48px] bg-cream-50 rounded overflow-hidden transition-default active:scale-95 ${
                                            currentImageIndex === index
                                                ? 'ring-2 ring-gold-600 shadow-lg scale-105'
                                                : 'ring-1 ring-cream-300 hover:ring-gold-400 shadow-md'
                                        }`}
                                        aria-label={format(t.product.imageNumber, { number: index + 1 })}
                                        aria-current={currentImageIndex === index}
                                    >
                                        <Image src={img} alt="" fill sizes="48px" className="object-contain p-1" />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" aria-hidden="true" />

                        <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1.5 bg-cream-50/90 backdrop-blur-sm text-label-sm uppercase text-charcoal-900 font-medium shadow-sm rounded">
                                {category}
                            </span>
                        </div>

                        {product.isNew && (
                            <div className="absolute top-4 right-4 z-10">
                                <span className="px-3 py-1.5 bg-gold-600 text-charcoal-900 text-label-sm uppercase font-semibold shadow-md rounded">
                                    {t.product.new}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="p-5 sm:p-6 space-y-3">
                        <h3 className="text-lg sm:text-xl font-serif text-charcoal-900 group-hover:text-gold-text-accessible transition-colors duration-500 leading-snug">
                            {name}
                        </h3>

                        <div className="flex items-end justify-between gap-3 pt-2">
                            <div className="flex items-baseline">
                                <span className="text-3xl sm:text-4xl font-serif font-light text-charcoal-900 tracking-tight">{price}</span>
                                <span className="text-[10px] uppercase tracking-widest text-stone-accessible font-medium ml-1 -translate-y-2.5 sm:-translate-y-3">
                                    USD
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-gold-text-accessible font-medium text-right opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-x-2 sm:group-hover:translate-x-0 transition-all duration-500">
                                <span>{t.product.view}</span>
                                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
});

export default ProductCard;
