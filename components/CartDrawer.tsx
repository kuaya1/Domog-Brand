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
    FREE_SHIPPING_THRESHOLD,
    type CartItem,
} from '@/lib/stores/cart-store';
import { useUIStore, useCartDrawerOpen } from '@/lib/stores/ui-store';
import { getProductById, getLocalizedName } from '@/lib/products';
import { useLocalizedPath } from '@/lib/i18n/navigation';
import { useMessages } from '@/lib/i18n/use-messages';
import { format, formatPrice, plural } from '@/lib/i18n/messages';
import { cn } from '@/lib/utils';

/** Display name for a bag line in the current language; falls back to the stored model name. */
export function useCartItemName() {
    const { locale } = useMessages();
    return (item: CartItem) => {
        const product = getProductById(item.productId);
        return product ? getLocalizedName(product, locale) : item.name;
    };
}

function CartItemCard({
    item,
    onUpdateQuantity,
    onRemove,
}: {
    item: CartItem;
    onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
    onRemove: (productId: string, size: string) => void;
}) {
    const { t } = useMessages();
    const itemName = useCartItemName();
    const localizedPath = useLocalizedPath();
    const [isRemoving, setIsRemoving] = useState(false);
    const name = itemName(item);

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => onRemove(item.productId, item.size), 200);
    };

    return (
        <div className={cn('flex gap-4 py-4 transition-all duration-200', isRemoving && 'opacity-0 translate-x-4')}>
            <Link
                href={localizedPath(`/products/${item.productId}`)}
                className="relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded bg-cream-100"
                tabIndex={-1}
                aria-hidden="true"
            >
                {item.image ? (
                    <Image src={item.image} alt="" fill className="object-cover transition-transform hover:scale-105" sizes="80px" />
                ) : (
                    <span className="flex h-full items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-cream-400" />
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col justify-between min-w-0">
                <div>
                    <Link
                        href={localizedPath(`/products/${item.productId}`)}
                        className="font-serif text-sm font-medium text-charcoal-900 hover:text-cognac-600 transition-default line-clamp-2"
                    >
                        {name}
                    </Link>
                    <p className="mt-1 text-xs text-stone-warm">{format(t.bag.size, { size: item.size })}</p>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center border border-cream-200 rounded">
                        <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1.5 hover:bg-cream-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label={t.product.decrease}
                        >
                            <Minus className="h-3 w-3" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="p-1.5 hover:bg-cream-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label={t.product.increase}
                        >
                            <Plus className="h-3 w-3" aria-hidden="true" />
                        </button>
                    </div>
                    <p className="font-medium text-charcoal-900">{formatPrice(item.price * item.quantity)}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={handleRemove}
                className="p-1 text-cream-500 hover:text-burgundy-600 transition-colors self-start"
                aria-label={format(t.bag.removeNamed, { model: name })}
            >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
        </div>
    );
}

export function PromoCodeInput() {
    const { t } = useMessages();
    const [code, setCode] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const applyPromoCode = useCartStore((state) => state.applyPromoCode);
    const removePromoCode = useCartStore((state) => state.removePromoCode);
    const appliedPromo = useCartPromo();
    const toast = useUIStore((state) => state.toast);

    const handleApply = () => {
        if (!code.trim()) return;
        setIsApplying(true);
        setError(null);

        const result = applyPromoCode(code);
        if (result.success) {
            toast.success(t.bag.promoAppliedTitle, format(t.bag.promoAppliedBody, { amount: formatPrice(result.discount) }));
            setCode('');
        } else {
            setError(
                result.code === 'EXPIRED'
                    ? t.bag.promoExpired
                    : result.code === 'MIN_PURCHASE' && result.minPurchase
                      ? format(t.bag.promoMinimum, { amount: formatPrice(result.minPurchase) })
                      : t.bag.promoInvalid
            );
        }
        setIsApplying(false);
    };

    if (appliedPromo) {
        return (
            <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
                <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-600" aria-hidden="true" />
                    <span className="text-sm font-medium text-green-800">{appliedPromo.code}</span>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        removePromoCode();
                        toast.info(t.bag.promoRemoved);
                    }}
                    className="text-sm text-green-700 hover:text-green-900 transition-colors"
                >
                    {t.bag.promoRemove}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <label htmlFor="promo-code" className="sr-only">
                    {t.bag.promoCode}
                </label>
                <input
                    id="promo-code"
                    type="text"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setError(null);
                    }}
                    placeholder={t.bag.promoCode}
                    className={cn(
                        'flex-1 min-w-0 rounded border px-3 py-2 text-sm',
                        'focus:outline-none focus:ring-2 focus:ring-black/5',
                        error ? 'border-red-500' : 'border-cream-200'
                    )}
                    onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'promo-code-error' : undefined}
                />
                <button
                    type="button"
                    onClick={handleApply}
                    disabled={!code.trim() || isApplying}
                    className="px-4 py-2 border border-gold-600 text-gold-700 text-label-lg uppercase transition-default hover:bg-gold-600 hover:text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                >
                    {isApplying ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : t.bag.promoApply}
                </button>
            </div>
            {error && (
                <p id="promo-code-error" className="text-xs text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export function CartDrawer({ className }: { className?: string }) {
    const { locale, t } = useMessages();
    const localizedPath = useLocalizedPath();

    const isOpen = useCartDrawerOpen();
    const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);

    const items = useCartItems();
    const itemCount = useCartItemCount();
    const subtotal = useCartSubtotal();
    const total = useCartTotal();
    const discount = useCartDiscount();
    const promo = useCartPromo();
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const shipping = useCartStore((state) => state.getShippingEstimate());
    const tax = useCartStore((state) => state.getTaxEstimate());

    const handleClose = useCallback(() => setCartDrawerOpen(false), [setCartDrawerOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) handleClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, handleClose]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <Fragment>
            <div
                className={cn(
                    'fixed inset-0 z-50 bg-charcoal-900/50 transition-opacity duration-medium',
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={handleClose}
                aria-hidden="true"
            />

            <div
                className={cn(
                    'fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream-50 shadow-xl transition-[transform,visibility] duration-medium ease-symmetric',
                    isOpen ? 'translate-x-0' : 'translate-x-full invisible',
                    className
                )}
                role="dialog"
                aria-modal="true"
                aria-label={t.bag.drawerLabel}
                aria-hidden={!isOpen}
            >
                <div className="flex items-center justify-between border-b border-cream-300 px-6 py-4">
                    <h2 className="font-serif text-lg font-medium text-charcoal-900">
                        {t.bag.title}
                        {itemCount > 0 && (
                            <span className="ml-2 text-sm font-normal text-stone-warm">
                                ({plural(locale, itemCount, t.bag.itemCount)})
                            </span>
                        )}
                    </h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded p-2 text-stone-warm hover:bg-cream-200 hover:text-charcoal-900 transition-default"
                        aria-label={t.bag.close}
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16">
                        <div className="mb-8 w-20 h-20 flex items-center justify-center bg-cream-100 rounded-full">
                            <ShoppingBag className="h-10 w-10 text-cream-400" aria-hidden="true" />
                        </div>
                        <h3 className="mb-3 font-serif text-2xl font-medium text-charcoal-900 text-center">{t.bag.empty}</h3>
                        <p className="mb-10 text-center text-sm text-stone-warm leading-relaxed max-w-xs">{t.bag.emptyBody}</p>
                        <Link
                            href={localizedPath('/shop')}
                            onClick={handleClose}
                            className="inline-flex items-center justify-center px-8 py-4 bg-charcoal-900 text-cream-50 font-sans text-label-lg uppercase transition-default hover:bg-charcoal-800 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                        >
                            {t.bag.explore}
                            <ArrowRight className="ml-3 h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                ) : (
                    <Fragment>
                        <div className="flex-1 overflow-y-auto px-6 divide-y divide-cream-100">
                            {items.map((item) => (
                                <CartItemCard
                                    key={`${item.productId}-${item.size}`}
                                    item={item}
                                    onUpdateQuantity={(id, size, qty) => qty >= 1 && updateQuantity(id, size, qty)}
                                    onRemove={removeItem}
                                />
                            ))}
                        </div>

                        <div className="border-t border-cream-100 px-6 py-4 space-y-4">
                            <PromoCodeInput />

                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between text-stone-warm">
                                    <dt>{t.bag.subtotal}</dt>
                                    <dd>{formatPrice(subtotal)}</dd>
                                </div>
                                {discount > 0 && promo && (
                                    <div className="flex justify-between text-green-700">
                                        <dt>{format(t.bag.discount, { code: promo.code })}</dt>
                                        <dd>-{formatPrice(discount)}</dd>
                                    </div>
                                )}
                                <div className="flex justify-between text-stone-warm">
                                    <dt>{t.bag.shipping}</dt>
                                    <dd>{shipping === 0 ? <span className="text-green-700">{t.bag.shippingFree}</span> : formatPrice(shipping)}</dd>
                                </div>
                                <div className="flex justify-between text-stone-warm">
                                    <dt>{t.bag.tax}</dt>
                                    <dd>{formatPrice(tax)}</dd>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-cream-300 text-base font-medium text-charcoal-900">
                                    <dt>{t.bag.total}</dt>
                                    <dd>{formatPrice(total)}</dd>
                                </div>
                            </dl>

                            {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs text-stone-warm">
                                        {format(t.bag.freeShippingProgress, { amount: formatPrice(FREE_SHIPPING_THRESHOLD - subtotal) })}
                                    </p>
                                    <div className="h-1.5 w-full rounded-full bg-cream-100 overflow-hidden" aria-hidden="true">
                                        <div
                                            className="h-full bg-cognac-500 rounded-full transition-all duration-300"
                                            style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            <Link
                                href={localizedPath('/cart')}
                                onClick={handleClose}
                                className="w-full inline-flex items-center justify-center px-8 py-4 bg-charcoal-900 text-cream-50 font-sans text-label-lg uppercase transition-default hover:bg-charcoal-800 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                            >
                                {t.bag.viewBag}
                                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Link>

                            <p className="text-center text-xs text-stone-warm">{t.bag.estimateNote}</p>
                        </div>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
}

export default CartDrawer;
