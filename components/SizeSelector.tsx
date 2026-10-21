'use client';

import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/use-messages';
import { format } from '@/lib/i18n/messages';

interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string;
    onSelect: (size: string) => void;
}

/** EU size buttons with 48px touch targets. */
export default function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
    const { t } = useMessages();

    return (
        <div className="grid grid-cols-4 gap-3 sm:gap-2" role="group" aria-label={t.product.chooseSize}>
            {sizes.map((size) => (
                <button
                    key={size}
                    type="button"
                    onClick={() => onSelect(size)}
                    aria-pressed={selectedSize === size}
                    aria-label={format(t.product.sizeOption, { size })}
                    className={cn(
                        'min-h-[48px] px-3 sm:px-4 border rounded-md',
                        'text-sm sm:text-base font-medium',
                        'transition-all duration-200',
                        'active:scale-[0.97] active:transition-none',
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
