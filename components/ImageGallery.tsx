'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

/**
 * OPTIMIZED IMAGE GALLERY
 * 
 * Key fixes for Vercel deployment:
 * 1. Added proper `sizes` prop for responsive image loading
 * 2. Main image is priority loaded (above the fold)
 * 3. Thumbnails are lazy loaded
 * 4. Proper error handling with onError fallback
 * 5. Multi-angle support with object-contain for studio look
 */
export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageError, setImageError] = useState<Record<number, boolean>>({});

    // Debug: Log the image paths being loaded
    useEffect(() => {
        console.log('ImageGallery - Product:', productName);
        console.log('ImageGallery - Images:', images);
    }, [images, productName]);

    const handleImageError = useCallback((index: number) => {
        console.error(`ImageGallery - Failed to load image ${index}:`, images[index]);
        setImageError(prev => ({ ...prev, [index]: true }));
    }, [images]);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image - Studio style with cream background */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-cream-50">
                {imageError[selectedImage] ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-cream-50">
                        <span className="text-lg">Image unavailable</span>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="relative w-full h-full">
                            <Image
                                src={images[selectedImage]}
                                alt={`${productName} - View ${selectedImage + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                className="object-contain drop-shadow-lg transition-opacity duration-500"
                                style={{
                                    filter: 'contrast(1.05) saturate(1.08) drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))'
                                }}
                                priority
                                onError={() => handleImageError(selectedImage)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        aria-label={`View ${productName} image ${index + 1}`}
                        className={cn(
                            'relative aspect-square overflow-hidden rounded-md bg-cream-50 p-2',
                            selectedImage === index
                                ? 'ring-2 ring-gold-700 shadow-lg'
                                : 'ring-1 ring-stone-200 hover:ring-gold-400 shadow-md'
                        )}
                    >
                        {imageError[index] ? (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                                N/A
                            </div>
                        ) : (
                            <Image
                                src={image}
                                alt={`${productName} thumbnail ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 25vw, 150px"
                                className="object-contain p-1"
                                loading="lazy"
                                onError={() => handleImageError(index)}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
