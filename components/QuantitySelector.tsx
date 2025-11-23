'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    max?: number;
}

export default function QuantitySelector({
    quantity,
    onIncrease,
    onDecrease,
    max = 10,
}: QuantitySelectorProps) {
    return (
        <div className="flex items-center border border-gray-300 rounded-md w-fit">
            <button
                onClick={onDecrease}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-md"
                aria-label="Decrease quantity"
            >
                <Minus size={16} />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
                onClick={onIncrease}
                disabled={quantity >= max}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-md"
                aria-label="Increase quantity"
            >
                <Plus size={16} />
            </button>
        </div>
    );
}
