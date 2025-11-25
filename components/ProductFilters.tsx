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
        <div className="space-y-10">
            {/* Categories */}
            <div>
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-stone-warm mb-6">
                    Collection
                </h3>
                <div className="space-y-3">
                    <button
                        onClick={() => onCategoryChange(null)}
                        className={cn(
                            'block text-sm transition-colors duration-300',
                            selectedCategory === null
                                ? 'text-black font-medium'
                                : 'text-stone-warm hover:text-cognac'
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
                                'block text-sm transition-colors duration-300',
                                selectedCategory === category
                                    ? 'text-black font-medium'
                                    : 'text-stone-warm hover:text-cognac'
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div>
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-stone-warm mb-6">
                    Size (EU)
                </h3>
                <div className="grid grid-cols-4 gap-2">
                    {SIZES.map((size) => (
                        <button
                            key={size}
                            onClick={() => onSizeChange(selectedSize === size ? null : size)}
                            className={cn(
                                'py-3 px-2 border text-sm transition-all duration-300',
                                selectedSize === size
                                    ? 'bg-black text-white border-black'
                                    : 'border-cream-300 text-stone-warm hover:border-black'
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-stone-warm mb-6">
                    Price Range
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-black">
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
                        className="w-full h-1 bg-cream-300 rounded-none appearance-none cursor-pointer accent-black"
                    />
                </div>
            </div>
        </div>
    );
}
