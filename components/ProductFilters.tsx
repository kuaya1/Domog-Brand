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
        <div className="space-y-10 lg:space-y-12">
            {/* Categories */}
            <div>
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-black mb-5 pb-3 border-b border-cream-200">
                    Collection
                </h3>
                <div className="space-y-3">
                    <button
                        onClick={() => onCategoryChange(null)}
                        className={cn(
                            'block w-full text-left text-sm py-1.5 transition-colors duration-300',
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
                                'block w-full text-left text-sm py-1.5 transition-colors duration-300',
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
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-black mb-5 pb-3 border-b border-cream-200">
                    Size (EU)
                </h3>
                <div className="grid grid-cols-4 gap-2">
                    {SIZES.map((size) => (
                        <button
                            key={size}
                            onClick={() => onSizeChange(selectedSize === size ? null : size)}
                            className={cn(
                                'py-3 px-2 border text-sm transition-all duration-200',
                                selectedSize === size
                                    ? 'bg-black text-cream border-black'
                                    : 'border-cream-300 text-stone-warm hover:border-cognac hover:text-cognac'
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-black mb-5 pb-3 border-b border-cream-200">
                    Investment
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-warm">${priceRange[0]}</span>
                        <span className="text-black font-medium">${priceRange[1]}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="600"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) =>
                            onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
                        }
                        className="w-full h-1 bg-cream-300 rounded-none appearance-none cursor-pointer accent-cognac"
                    />
                </div>
            </div>
        </div>
    );
}
