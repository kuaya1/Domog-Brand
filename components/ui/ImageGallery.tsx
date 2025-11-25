'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Enhanced ImageGallery with lightbox and keyboard navigation
 * Follows Furlan Marri luxury aesthetic
 */
interface GalleryImage {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

interface ImageGalleryProps {
    /** Array of images */
    images: GalleryImage[];
    /** Aspect ratio for thumbnails */
    aspectRatio?: 'square' | 'portrait' | 'landscape';
    /** Show thumbnail strip */
    showThumbnails?: boolean;
    /** Enable lightbox on click */
    enableLightbox?: boolean;
    /** Enable zoom on hover */
    enableZoom?: boolean;
    /** Additional class names */
    className?: string;
}

const aspectRatioStyles = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
};

/**
 * Premium Image Gallery Component
 * 
 * @example
 * const images = [
 *   { src: '/boot-1.jpg', alt: 'Front view' },
 *   { src: '/boot-2.jpg', alt: 'Side view' },
 * ];
 * 
 * <ImageGallery 
 *   images={images} 
 *   aspectRatio="portrait"
 *   enableLightbox
 *   showThumbnails
 * />
 */
export default function ImageGallery({
    images,
    aspectRatio = 'portrait',
    showThumbnails = true,
    enableLightbox = true,
    enableZoom = true,
    className,
}: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const containerRef = useRef<HTMLDivElement>(null);

    const currentImage = images[currentIndex];

    // Navigate to previous image
    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    // Navigate to next image
    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isLightboxOpen) return;

            switch (e.key) {
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
                case 'Escape':
                    setIsLightboxOpen(false);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, goToPrevious, goToNext]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLightboxOpen]);

    // Handle zoom position on mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!enableZoom || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    if (!images.length) return null;

    return (
        <div className={cn('space-y-4', className)}>
            {/* Main Image */}
            <div
                ref={containerRef}
                className={cn(
                    'relative overflow-hidden bg-cream-warm cursor-pointer group',
                    aspectRatioStyles[aspectRatio]
                )}
                onClick={() => enableLightbox && setIsLightboxOpen(true)}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                role="button"
                tabIndex={0}
                aria-label={`View ${currentImage.alt} in fullscreen`}
                onKeyDown={(e) => e.key === 'Enter' && enableLightbox && setIsLightboxOpen(true)}
            >
                <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    className={cn(
                        'object-cover transition-transform duration-500 ease-luxury',
                        enableZoom && isZoomed && 'scale-150'
                    )}
                    style={
                        enableZoom && isZoomed
                            ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                            : undefined
                    }
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentIndex === 0}
                />

                {/* Zoom indicator */}
                {enableLightbox && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-cream p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn size={20} />
                    </div>
                )}

                {/* Navigation arrows (main image) */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-luxury opacity-0 group-hover:opacity-100 transition-all duration-300"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} className="text-black" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-luxury opacity-0 group-hover:opacity-100 transition-all duration-300"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} className="text-black" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail Strip */}
            {showThumbnails && images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-muted">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                'relative flex-shrink-0 w-20 h-20 rounded overflow-hidden',
                                'transition-all duration-200',
                                'ring-2 ring-offset-2',
                                index === currentIndex
                                    ? 'ring-gold'
                                    : 'ring-transparent hover:ring-stone-muted'
                            )}
                            aria-label={`View ${image.alt}`}
                            aria-current={index === currentIndex}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={() => setIsLightboxOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                >
                    {/* Close button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 transition-colors"
                        aria-label="Close lightbox"
                    >
                        <X size={32} />
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-4 left-4 text-white/70 font-sans text-sm tracking-wider">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Main lightbox image */}
                    <div
                        className="relative w-full h-full max-w-5xl max-h-[85vh] m-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={currentImage.src}
                            alt={currentImage.alt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Navigation arrows (lightbox) */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevious();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 transition-colors"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={48} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNext();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 transition-colors"
                                aria-label="Next image"
                            >
                                <ChevronRight size={48} />
                            </button>
                        </>
                    )}

                    {/* Thumbnail strip in lightbox */}
                    {showThumbnails && images.length > 1 && (
                        <div
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={cn(
                                        'relative w-16 h-16 rounded overflow-hidden',
                                        'transition-all duration-200',
                                        'ring-2',
                                        index === currentIndex
                                            ? 'ring-gold'
                                            : 'ring-transparent opacity-50 hover:opacity-100'
                                    )}
                                    aria-label={`View ${image.alt}`}
                                    aria-current={index === currentIndex}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export type { ImageGalleryProps, GalleryImage };
