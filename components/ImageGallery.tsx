'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMessages } from '@/lib/i18n/use-messages';
import { format } from '@/lib/i18n/messages';

interface ImageGalleryProps {
    images: string[];
    /** Localized model name, used in alt text and control labels. */
    productName: string;
}

/** Product image gallery with swipe, arrows, dots (mobile), and thumbnails (desktop). */
export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const { t } = useMessages();
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageError, setImageError] = useState<Record<number, boolean>>({});
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const imageAlt = (index: number) => format(t.product.imageAlt, { model: productName, number: index + 1 });
    const viewLabel = (index: number) => format(t.product.imageNumber, { number: index + 1 });

    const handleTouchEnd = useCallback(() => {
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50 && selectedImage < images.length - 1) setSelectedImage((prev) => prev + 1);
        else if (diff < -50 && selectedImage > 0) setSelectedImage((prev) => prev - 1);
    }, [selectedImage, images.length]);

    const markError = useCallback((index: number) => {
        setImageError((prev) => ({ ...prev, [index]: true }));
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div
                className="group relative aspect-square w-full overflow-hidden bg-transparent"
                onTouchStart={(e) => (touchStartX.current = e.targetTouches[0].clientX)}
                onTouchMove={(e) => (touchEndX.current = e.targetTouches[0].clientX)}
                onTouchEnd={handleTouchEnd}
            >
                {imageError[selectedImage] ? (
                    <div className="absolute inset-0 flex items-center justify-center text-cream-500 bg-cream-50">
                        <span className="text-lg">{t.common.imageUnavailable}</span>
                    </div>
                ) : (
                    <Image
                        src={images[selectedImage]}
                        alt={imageAlt(selectedImage)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-contain transition-all duration-300 mix-blend-multiply"
                        priority
                        onError={() => markError(selectedImage)}
                    />
                )}

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => setSelectedImage((prev) => Math.max(prev - 1, 0))}
                            disabled={selectedImage === 0}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label={t.product.previousImage}
                        >
                            <ChevronLeft className="w-5 h-5 text-charcoal-900" aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedImage((prev) => Math.min(prev + 1, images.length - 1))}
                            disabled={selectedImage === images.length - 1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label={t.product.nextImage}
                        >
                            <ChevronRight className="w-5 h-5 text-charcoal-900" aria-hidden="true" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedImage(index)}
                                    className={cn(
                                        'w-2 h-2 rounded-full transition-all',
                                        selectedImage === index ? 'bg-cognac w-4' : 'bg-black/20'
                                    )}
                                    aria-label={viewLabel(index)}
                                    aria-current={selectedImage === index}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="hidden sm:grid grid-cols-4 gap-2 sm:gap-3">
                {images.map((image, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                        aria-label={viewLabel(index)}
                        aria-current={selectedImage === index}
                        className={cn(
                            'relative aspect-square min-h-[48px] overflow-hidden rounded bg-transparent p-1 sm:p-2',
                            'transition-all duration-200 active:scale-95',
                            selectedImage === index ? 'ring-2 ring-gold-600' : 'ring-1 ring-cream-200/50 hover:ring-gold-600/50'
                        )}
                    >
                        {imageError[index] ? (
                            <span className="absolute inset-0 flex items-center justify-center text-cream-500 text-xs">
                                {t.common.imageUnavailable}
                            </span>
                        ) : (
                            <span className="absolute inset-0" style={{ backgroundColor: '#FAF8F3' }}>
                                <Image
                                    src={image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 22vw, 150px"
                                    className="object-contain p-0.5 sm:p-1 mix-blend-multiply"
                                    loading="lazy"
                                    onError={() => markError(index)}
                                />
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
