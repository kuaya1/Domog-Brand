'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
    selectedCategory: string | null;
    selectedSize: string | null;
    priceRange: [number, number];
    onCategoryChange: (category: string | null) => void;
    onSizeChange: (size: string | null) => void;
    onPriceRangeChange: (range: [number, number]) => void;
}

const CATEGORIES = ['Traditional', 'Ceremonial', 'Festival', 'Daily Wear'];
const SIZES = ['38', '39', '40', '41', '42', '43', '44', '45'];

export default function ProductFilters({
    selectedCategory,
    selectedSize,
    priceRange,
    onCategoryChange,
    onSizeChange,
    onPriceRangeChange,
}: ProductFiltersProps) {
    return (
        <div className="space-y-8">
            {/* Categories */}
            <div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
                    Collection
                </h3>
                <div className="space-y-2">
                    <button
                        onClick={() => onCategoryChange(null)}
                        className={cn(
                            'block text-sm transition-colors hover:text-amber-700',
                            selectedCategory === null
                                ? 'text-amber-700 font-medium'
                                : 'text-gray-600'
                        )}
                    >
                        All Collections
                    </button>
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() =>
                                onCategoryChange(selectedCategory === category ? null : category)
                            }
                            className={cn(
                                'block text-sm transition-colors hover:text-amber-700',
                                selectedCategory === category
                                    ? 'text-amber-700 font-medium'
                                    : 'text-gray-600'
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
                    Size
                </h3>
                <div className="grid grid-cols-4 gap-2">
                    {SIZES.map((size) => (
                        <button
                            key={size}
                            onClick={() => onSizeChange(selectedSize === size ? null : size)}
                            className={cn(
                                'py-1 px-2 border rounded text-sm transition-colors',
                                selectedSize === size
                                    ? 'bg-amber-600 text-white border-amber-600'
                                    : 'border-gray-200 text-gray-600 hover:border-amber-600'
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
                    Price Range
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) =>
                            onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                </div>
            </div>
        </div>
    );
}
