'use client';

import { cn } from '@/lib/utils';

interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string;
    onSelect: (size: string) => void;
}

/**
 * SIZE SELECTOR - Mobile-Optimized Touch Targets
 * 
 * Luxury mobile UX requirements:
 * - Minimum 48px touch targets (exceeds 44x44px Apple HIG)
 * - Generous spacing between buttons to prevent mis-taps
 * - Active states for immediate tactile feedback
 * - Comfortable thumb-reach grid layout
 */
export default function SizeSelector({
    sizes,
    selectedSize,
    onSelect,
}: SizeSelectorProps) {
    return (
        <div className="grid grid-cols-4 gap-3 sm:gap-2">
            {sizes.map((size) => (
                <button
                    key={size}
                    onClick={() => onSelect(size)}
                    className={cn(
                        // Base: Generous touch targets (48px min-height)
                        'min-h-[48px] px-3 sm:px-4 border rounded-md',
                        'text-sm sm:text-base font-medium',
                        'transition-all duration-200',
                        // Active state for immediate tactile feedback
                        'active:scale-[0.97] active:transition-none',
                        // Selected state
                        selectedSize === size
                            ? 'border-cognac bg-cognac-50 text-cognac-800 ring-2 ring-cognac shadow-sm'
                            : 'border-cream-300 hover:border-cognac hover:text-cognac-800 active:bg-cream-100'
                    )}
                >
                    {size}
                </button>
            ))}
        </div>
    );
}
