'use client';

import { Fragment, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, Trash2, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { 
    useCartStore, 
    useCartItems, 
    useCartItemCount, 
    useCartSubtotal, 
    useCartTotal,
    useCartDiscount,
    useCartPromo,
    type CartItem 
} from '@/lib/stores/cart-store';
import { useUIStore, useCartDrawerOpen } from '@/lib/stores/ui-store';
import { cn } from '@/lib/utils';
import { type CartDictionary } from '@/lib/dictionaries';
import { useLocalizedPath } from '@/lib/i18n/navigation';

// ============================================================================
// Types
// ============================================================================

interface CartDrawerProps {
    className?: string;
    dictionary?: CartDictionary;
    locale?: string;
}

// ============================================================================
// Sub-components
// ============================================================================

function CartItemCard({ item, onUpdateQuantity, onRemove, t }: {
    item: CartItem;
    onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
    onRemove: (productId: string, size: string) => void;
    t: CartDictionary;
}) {
    const [isRemoving, setIsRemoving] = useState(false);
    const localizedPath = useLocalizedPath();

    const handleRemove = () => {
        setIsRemoving(true);
        // Small delay for animation
        setTimeout(() => {
            onRemove(item.productId, item.size);
        }, 200);
    };

    return (
        <div 
            className={cn(
                "flex gap-4 py-4 transition-all duration-200",
                isRemoving && "opacity-0 translate-x-4"
            )}
        >
            {/* Product Image */}
            <Link 
                href={localizedPath(`/products/${item.productId}`)}
                className="relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded bg-cream-100"
            >
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        sizes="80px"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-cream-400" />
                    </div>
                )}
            </Link>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <Link 
                        href={localizedPath(`/products/${item.productId}`)}
                        className="font-serif text-sm font-medium text-black hover:text-cognac-600 transition-colors line-clamp-2"
                    >
                        {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-cream-600">
                        {t.size}: {item.size}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-cream-200 rounded">
                        <button
                            onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1.5 hover:bg-cream-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="p-1.5 hover:bg-cream-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>

                    {/* Price */}
                    <p className="font-medium text-black">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={handleRemove}
                className="p-1 text-cream-400 hover:text-burgundy-600 transition-colors self-start"
                aria-label={`${t.remove} ${item.name}`}
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}

function PromoCodeInput({ t }: { t: CartDictionary }) {
    const [code, setCode] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const applyPromoCode = useCartStore(state => state.applyPromoCode);
    const removePromoCode = useCartStore(state => state.removePromoCode);
    const appliedPromo = useCartPromo();
    const toast = useUIStore(state => state.toast);

    const handleApply = async () => {
        if (!code.trim()) return;
        
        setIsApplying(true);
        setError(null);

        // Simulate API delay
        await new Promise(r => setTimeout(r, 500));

        const result = applyPromoCode(code);
        
        if (result.success) {
            toast.success('Promo code applied!', `You save $${result.discount.toFixed(2)}`);
            setCode('');
        } else {
            setError(result.error);
        }

        setIsApplying(false);
    };

    const handleRemove = () => {
        removePromoCode();
        toast.info(t.promo_code + ' ' + t.remove.toLowerCase());
    };

    if (appliedPromo) {
        return (
            <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
                <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                        {appliedPromo.code}
                    </span>
                </div>
                <button
                    onClick={handleRemove}
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                >
                    {t.remove}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setError(null);
                    }}
                    placeholder={t.promo_code}
                    className={cn(
                        "flex-1 rounded border px-3 py-2 text-sm",
                        "focus:outline-none focus:ring-2 focus:ring-black/5",
                        error ? "border-red-500" : "border-cream-200"
                    )}
                    onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                />
                <button
                    onClick={handleApply}
                    disabled={!code.trim() || isApplying}
                    className="px-4 py-2 border-2 border-gold text-gold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-gold hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : t.apply}
                </button>
            </div>
            {error && (
                <p className="text-xs text-red-600">{error}</p>
            )}
        </div>
    );
}

function EmptyCart({ onClose, t }: { onClose: () => void; t: CartDictionary }) {
    const localizedPath = useLocalizedPath();
    
    return (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
            <div className="mb-6 rounded-full bg-cream-100 p-6">
                <ShoppingBag className="h-12 w-12 text-cream-400" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-medium text-black">
                {t.empty_cart_title}
            </h3>
            <p className="mb-8 text-center text-sm text-cream-600">
                {t.empty_cart_description}
            </p>
            <Link 
                href={localizedPath('/shop')}
                onClick={onClose}
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-sans text-sm uppercase tracking-widest transition-all duration-300 hover:bg-gold-light focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
                {t.browse_collection}
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>
    );
}

// ============================================================================
// Default Dictionary (fallback)
// ============================================================================

const defaultDict: CartDictionary = {
    your_cart: "Your Cart",
    empty_cart_title: "Your cart is empty",
    empty_cart_description: "Discover our collection of handcrafted Mongolian boots and find the perfect pair.",
    browse_collection: "Browse Collection",
    size: "Size",
    remove: "Remove",
    subtotal: "Subtotal",
    shipping: "Shipping",
    shipping_calculated: "Calculated at checkout",
    free_shipping: "Free",
    tax: "Tax",
    discount: "Discount",
    total: "Total",
    checkout: "Proceed to Checkout",
    continue_shopping: "Continue Shopping",
    promo_code: "Promo Code",
    apply: "Apply",
    promo_applied: "applied",
    items_in_cart: "items",
    item_in_cart: "item",
};

// ============================================================================
// Main Component
// ============================================================================

export function CartDrawer({ className, dictionary, locale }: CartDrawerProps) {
    const t = dictionary || defaultDict;
    const localizedPath = useLocalizedPath();
    
    const isOpen = useCartDrawerOpen();
    const setCartDrawerOpen = useUIStore(state => state.setCartDrawerOpen);
    
    const items = useCartItems();
    const itemCount = useCartItemCount();
    const subtotal = useCartSubtotal();
    const total = useCartTotal();
    const discount = useCartDiscount();
    const promo = useCartPromo();
    
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeItem = useCartStore(state => state.removeItem);
    const getShippingEstimate = useCartStore(state => state.getShippingEstimate);
    const getTaxEstimate = useCartStore(state => state.getTaxEstimate);

    const shipping = getShippingEstimate();
    const tax = getTaxEstimate();

    const handleClose = useCallback(() => {
        setCartDrawerOpen(false);
    }, [setCartDrawerOpen]);

    const handleUpdateQuantity = useCallback((productId: string, size: string, quantity: number) => {
        if (quantity < 1) return;
        updateQuantity(productId, size, quantity);
    }, [updateQuantity]);

    const handleRemove = useCallback((productId: string, size: string) => {
        removeItem(productId, size);
    }, [removeItem]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, handleClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <Fragment>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
                    isOpen ? "translate-x-0" : "translate-x-full",
                    className
                )}
                role="dialog"
                aria-modal="true"
                aria-label={t.your_cart}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-cream-100 px-6 py-4">
                    <h2 className="font-serif text-lg font-medium text-black">
                        {t.your_cart}
                        {itemCount > 0 && (
                            <span className="ml-2 text-sm font-normal text-cream-500">
                                ({itemCount} {itemCount === 1 ? t.item_in_cart : t.items_in_cart})
                            </span>
                        )}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="rounded-full p-2 text-cream-500 hover:bg-cream-50 hover:text-black transition-colors"
                        aria-label="Close cart"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {items.length === 0 ? (
                    <EmptyCart onClose={handleClose} t={t} />
                ) : (
                    <Fragment>
                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 divide-y divide-cream-100">
                            {items.map((item) => (
                                <CartItemCard
                                    key={`${item.productId}-${item.size}`}
                                    item={item}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemove={handleRemove}
                                    t={t}
                                />
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-cream-100 px-6 py-4 space-y-4">
                            {/* Promo Code */}
                            <PromoCodeInput t={t} />

                            {/* Order Summary */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-cream-600">
                                    <span>{t.subtotal}</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>{t.discount} ({promo?.code})</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between text-cream-600">
                                    <span>{t.shipping}</span>
                                    <span>
                                        {shipping === 0 ? (
                                            <span className="text-green-600">{t.free_shipping}</span>
                                        ) : (
                                            `$${shipping.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between text-cream-600">
                                    <span>{t.tax}</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between pt-2 border-t border-cream-100 text-base font-medium text-black">
                                    <span>{t.total}</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Free Shipping Progress */}
                            {subtotal < 500 && subtotal > 0 && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-cream-600">
                                        <span>Add ${(500 - subtotal).toFixed(0)} more for free shipping</span>
                                        <span>${subtotal.toFixed(0)}/500</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-cream-100 overflow-hidden">
                                        <div 
                                            className="h-full bg-cognac-500 rounded-full transition-all duration-300"
                                            style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Checkout Button */}
                            <Link 
                                href={localizedPath('/cart')} 
                                onClick={handleClose}
                                className="w-full inline-flex items-center justify-center px-8 py-4 bg-black text-white font-sans text-sm uppercase tracking-widest transition-all duration-300 hover:bg-black-rich focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                            >
                                {t.checkout}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>

                            <p className="text-center text-xs text-cream-500">
                                {t.shipping_calculated}
                            </p>
                        </div>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
}

export default CartDrawer;
