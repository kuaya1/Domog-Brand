'use client';

import { cn } from '@/lib/utils';

interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string;
    onSelect: (size: string) => void;
}

export default function SizeSelector({
    sizes,
    selectedSize,
    onSelect,
}: SizeSelectorProps) {
    return (
        <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
                <button
                    key={size}
                    onClick={() => onSelect(size)}
                    className={cn(
                        'py-2 px-4 border rounded-md text-sm font-medium transition-all duration-200',
                        selectedSize === size
                            ? 'border-cognac bg-cognac-50 text-cognac-800 ring-1 ring-cognac'
                            : 'border-cream-300 hover:border-cognac hover:text-cognac-800'
                    )}
                >
                    {size}
                </button>
            ))}
        </div>
    );
}
