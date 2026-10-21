'use client';

import { Minus, Plus } from 'lucide-react';
import { useMessages } from '@/lib/i18n/use-messages';

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    max?: number;
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease, max = 10 }: QuantitySelectorProps) {
    const { t } = useMessages();

    return (
        <div className="flex items-center border border-cream-300 rounded-md w-fit">
            <button
                type="button"
                onClick={onDecrease}
                disabled={quantity <= 1}
                className="p-2 hover:bg-cream-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-md"
                aria-label={t.product.decrease}
            >
                <Minus size={16} aria-hidden="true" />
            </button>
            <span className="w-12 text-center font-medium" aria-live="polite">{quantity}</span>
            <button
                type="button"
                onClick={onIncrease}
                disabled={quantity >= max}
                className="p-2 hover:bg-cream-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-md"
                aria-label={t.product.increase}
            >
                <Plus size={16} aria-hidden="true" />
            </button>
        </div>
    );
}
