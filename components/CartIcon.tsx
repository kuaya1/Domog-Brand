'use client';

import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cart-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * HYDRATION-SAFE CART ICON
 * 
 * Problem: Zustand's persist middleware reads from localStorage on client only.
 * During SSR, cart count = 0. On hydration, cart count = X (from storage).
 * This causes React hydration mismatch errors.
 * 
 * Solution: Delay reading from store until after hydration completes.
 * Show a consistent "0" during SSR/initial render, then update on mount.
 */
export default function CartIcon() {
    // Start with null to indicate "not yet hydrated"
    const [isHydrated, setIsHydrated] = useState(false);
    const [animate, setAnimate] = useState(false);
    const prevCountRef = useRef(0);
    
    // Only read from store after hydration
    const storeCount = useCartStore((state) => state.getItemCount());
    const setCartDrawerOpen = useUIStore(state => state.setCartDrawerOpen);
    const count = isHydrated ? storeCount : 0;
    
    // Mark as hydrated after first client render
    useEffect(() => {
        setIsHydrated(true);
    }, []);
    
    // Animate on count change (only after hydration)
    useEffect(() => {
        if (isHydrated && count > 0 && count !== prevCountRef.current) {
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 300);
            prevCountRef.current = count;
            return () => clearTimeout(timer);
        }
        prevCountRef.current = count;
    }, [count, isHydrated]);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setCartDrawerOpen(true);
    };

    return (
        <button
            onClick={handleClick}
            className="relative p-2 text-cream-600 hover:text-cognac-600 transition-colors"
            aria-label={`Cart${count > 0 ? ` (${count} items)` : ''}`}
        >
            <ShoppingBag size={24} />
            {count > 0 && (
                <span
                    className={cn(
                        'absolute top-0 right-0 bg-cognac-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full transition-transform duration-300',
                        animate ? 'scale-125' : 'scale-100'
                    )}
                >
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </button>
    );
}
