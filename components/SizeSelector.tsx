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
                            ? 'border-amber-600 bg-amber-50 text-amber-900 ring-1 ring-amber-600'
                            : 'border-gray-200 hover:border-amber-600 hover:text-amber-900'
                    )}
                >
                    {size}
                </button>
            ))}
        </div>
    );
}
