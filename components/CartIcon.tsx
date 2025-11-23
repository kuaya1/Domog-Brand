'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function CartIcon() {
    const count = useCartStore((state) => state.getCartCount());
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (count > 0) {
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 300);
            return () => clearTimeout(timer);
        }
    }, [count]);

    return (
        <Link
            href="/cart"
            className="relative p-2 text-gray-600 hover:text-amber-700 transition-colors"
            aria-label="Cart"
        >
            <ShoppingBag size={24} />
            {count > 0 && (
                <span
                    className={cn(
                        'absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full transition-transform duration-300',
                        animate ? 'scale-125' : 'scale-100'
                    )}
                >
                    {count}
                </span>
            )}
        </Link>
    );
}
