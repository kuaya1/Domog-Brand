'use client';

import { useState, useCallback } from 'react';
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
 */
export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageError, setImageError] = useState<Record<number, boolean>>({});

    const handleImageError = useCallback((index: number) => {
        setImageError(prev => ({ ...prev, [index]: true }));
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                {imageError[selectedImage] ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                        <span className="text-lg">Image unavailable</span>
                    </div>
                ) : (
                    <Image
                        src={images[selectedImage]}
                        alt={`${productName} - View ${selectedImage + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover object-center transition-transform duration-500 hover:scale-105"
                        priority
                        onError={() => handleImageError(selectedImage)}
                    />
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
                            'relative aspect-square overflow-hidden rounded-md bg-gray-100',
                            selectedImage === index
                                ? 'ring-2 ring-amber-600'
                                : 'ring-1 ring-transparent hover:ring-gray-300'
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
                                className="object-cover object-center"
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
