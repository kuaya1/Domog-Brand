'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                {/* Placeholder for when images are not actually available in the file system yet */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                    {/* In a real app, Next/Image would handle this, but for this demo we might not have the files */}
                    {/* We will assume the images exist or show a fallback if they fail to load (not implemented here for simplicity) */}
                    <Image
                        src={images[selectedImage]}
                        alt={`${productName} view ${selectedImage + 1}`}
                        fill
                        className="object-cover object-center transition-transform duration-500 hover:scale-105"
                        priority
                    />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                            'relative aspect-square overflow-hidden rounded-md bg-gray-100',
                            selectedImage === index
                                ? 'ring-2 ring-amber-600'
                                : 'ring-1 ring-transparent hover:ring-gray-300'
                        )}
                    >
                        <Image
                            src={image}
                            alt={`${productName} thumbnail ${index + 1}`}
                            fill
                            className="object-cover object-center"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
