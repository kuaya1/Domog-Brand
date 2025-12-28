'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

/**
 * OPTIMIZED IMAGE GALLERY
 * 
 * Features:
 * 1. Touch swipe navigation for mobile
 * 2. Responsive image loading with proper sizes
 * 3. Main image priority loaded (above the fold)
 * 4. Thumbnails lazy loaded
 * 5. Error handling with graceful fallback
 * 6. Studio-style presentation with drop shadow
 */
export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageError, setImageError] = useState<Record<number, boolean>>({});
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    
    // Handle touch swipe for mobile navigation
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    }, []);
    
    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    }, []);
    
    const handleTouchEnd = useCallback(() => {
        const diff = touchStartX.current - touchEndX.current;
        const threshold = 50;
        
        if (diff > threshold && selectedImage < images.length - 1) {
            setSelectedImage(prev => prev + 1);
        } else if (diff < -threshold && selectedImage > 0) {
            setSelectedImage(prev => prev - 1);
        }
    }, [selectedImage, images.length]);

    const goToNext = useCallback(() => {
        setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : prev));
    }, [images.length]);

    const goToPrev = useCallback(() => {
        setSelectedImage(prev => (prev > 0 ? prev - 1 : prev));
    }, []);

    const handleImageError = useCallback((index: number) => {
        console.error(`ImageGallery - Failed to load image ${index}:`, images[index]);
        setImageError(prev => ({ ...prev, [index]: true }));
    }, [images]);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image - Studio style with touch swipe support */}
            <div 
                className="relative aspect-square w-full overflow-hidden bg-transparent"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {imageError[selectedImage] ? (
                    <div className="absolute inset-0 flex items-center justify-center text-cream-400 bg-cream-50">
                        <span className="text-lg">Image unavailable</span>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <Image
                                src={images[selectedImage]}
                                alt={`${productName} - View ${selectedImage + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                className="object-contain transition-all duration-300 mix-blend-multiply"
                                priority
                                onError={() => handleImageError(selectedImage)}
                            />
                        </div>
                    </div>
                )}
                
                {/* Navigation Arrows - Subtle, appear on hover/focus */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrev}
                            disabled={selectedImage === 0}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed lg:opacity-0 lg:hover:opacity-100"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5 text-charcoal-900" />
                        </button>
                        <button
                            onClick={goToNext}
                            disabled={selectedImage === images.length - 1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed lg:opacity-0 lg:hover:opacity-100"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5 text-charcoal-900" />
                        </button>
                    </>
                )}
                
                {/* Mobile Image Indicator Dots */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    selectedImage === index 
                                        ? "bg-cognac w-4" 
                                        : "bg-black/20"
                                )}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Thumbnails - Desktop focused, hidden on smallest screens if many images */}
            <div className="hidden sm:grid grid-cols-4 gap-2 sm:gap-3">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        aria-label={`View ${productName} image ${index + 1}`}
                        className={cn(
                            'relative aspect-square min-h-[48px] overflow-hidden rounded bg-transparent p-1 sm:p-2',
                            'transition-all duration-200 active:scale-95',
                            selectedImage === index
                                ? 'ring-2 ring-gold-600'
                                : 'ring-1 ring-cream-200/50 hover:ring-gold-600/50'
                        )}
                    >
                        {imageError[index] ? (
                            <div className="absolute inset-0 flex items-center justify-center text-cream-400 text-xs">
                                N/A
                            </div>
                        ) : (
                            <div className="absolute inset-0" style={{ backgroundColor: '#FAF8F3' }}>
                                <Image
                                    src={image}
                                    alt={`${productName} thumbnail ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 22vw, 150px"
                                    className="object-contain p-0.5 sm:p-1 mix-blend-multiply"
                                    loading="lazy"
                                    onError={() => handleImageError(index)}
                                />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
