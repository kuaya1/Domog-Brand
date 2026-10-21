'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, ShoppingBag, Truck, RefreshCw, MessageCircle } from 'lucide-react';
import {
    useCartStore,
    useCartItems,
    useCartItemCount,
    useCartSubtotal,
    useCartTotal,
    useCartDiscount,
    useCartPromo,
} from '@/lib/stores/cart-store';
import { PromoCodeInput, useCartItemName } from '@/components/CartDrawer';
import QuantitySelector from '@/components/QuantitySelector';
import { useMessages } from '@/lib/i18n/use-messages';
import { format, formatPrice, plural } from '@/lib/i18n/messages';
import { cn } from '@/lib/utils';

/**
 * The bag reads the same cart the product page and drawer write
 * (lib/stores/cart-store.ts), and shows the same figures as the drawer.
 * There is no online payment: the order action opens the contact form with
 * the order prefilled.
 */
export default function CartPage() {
    const { locale, t } = useMessages();
    const itemName = useCartItemName();
    // Cart contents come from localStorage; avoid a flash of the empty state before hydration.
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => setIsHydrated(true), []);

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

    if (!isHydrated) {
        return <div className="min-h-screen bg-cream" aria-busy="true" />;
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-cream">
                <div className="bg-cream-sand border-b border-cream-200 pt-32 pb-12 lg:pt-36 lg:pb-16">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                        <h1 className="font-serif text-3xl lg:text-4xl text-charcoal-900">{t.bag.title}</h1>
                    </div>
                </div>
                <div className="py-16 lg:py-24">
                    <div className="max-w-md mx-auto px-6 lg:px-8 text-center">
                        <div className="w-20 h-20 bg-cream-100 flex items-center justify-center mx-auto mb-8 rounded-full">
                            <ShoppingBag className="h-10 w-10 text-cream-400" aria-hidden="true" />
                        </div>
                        <p className="font-serif text-2xl text-charcoal-900 mb-3">{t.bag.empty}</p>
                        <p className="text-stone-warm text-lg mb-10 leading-relaxed">{t.bag.emptyBody}</p>
                        <Link
                            href={`/${locale}/shop`}
                            className="inline-flex items-center gap-3 bg-charcoal-900 text-cream-50 py-4 px-10 font-sans text-sm uppercase tracking-[0.15em] hover:bg-charcoal-800 transition-colors"
                        >
                            {t.bag.explore}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream">
            <div className="bg-cream-sand border-b border-cream-200 pt-32 pb-12 lg:pt-36 lg:pb-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h1 className="font-serif text-3xl lg:text-4xl text-charcoal-900">{t.bag.title}</h1>
                    <p className="text-stone-warm mt-3">{plural(locale, itemCount, t.bag.itemCount)}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                    <section className="lg:col-span-7" aria-label={t.bag.title}>
                        <ul className="divide-y divide-cream-200">
                            {items.map((item) => {
                                const name = itemName(item);
                                return (
                                    <li key={`${item.productId}-${item.size}`} className="py-8 first:pt-0">
                                        <div className="flex gap-6">
                                            <Link
                                                href={`/${locale}/products/${item.productId}`}
                                                className="flex-shrink-0 w-28 h-32 lg:w-32 lg:h-40 bg-cream-100 relative overflow-hidden group"
                                                tabIndex={-1}
                                                aria-hidden="true"
                                            >
                                                {item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt=""
                                                        fill
                                                        sizes="128px"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                )}
                                            </Link>

                                            <div className="flex-1 flex flex-col min-w-0">
                                                <div className="flex justify-between gap-4">
                                                    <div className="min-w-0">
                                                        <Link
                                                            href={`/${locale}/products/${item.productId}`}
                                                            className="font-serif text-lg text-charcoal-900 hover:text-cognac transition-colors"
                                                        >
                                                            {name}
                                                        </Link>
                                                        <p className="text-sm text-stone-warm mt-1">{format(t.bag.size, { size: item.size })}</p>
                                                    </div>
                                                    <p className="font-serif text-lg text-charcoal-900 whitespace-nowrap">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                </div>

                                                <div className="mt-auto pt-4 flex flex-wrap items-end justify-between gap-3">
                                                    <QuantitySelector
                                                        quantity={item.quantity}
                                                        max={item.maxStock}
                                                        onIncrease={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                                                        onDecrease={() =>
                                                            item.quantity > 1 && updateQuantity(item.productId, item.size, item.quantity - 1)
                                                        }
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.productId, item.size)}
                                                        className="text-sm text-stone-warm hover:text-burgundy transition-colors flex items-center gap-1"
                                                        aria-label={format(t.bag.removeNamed, { model: name })}
                                                    >
                                                        <Trash2 size={14} aria-hidden="true" />
                                                        {t.bag.remove}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-8 pt-8 border-t border-cream-200">
                            <Link
                                href={`/${locale}/shop`}
                                className="inline-flex items-center text-sm text-cognac hover:text-cognac-dark transition-colors"
                            >
                                <ArrowRight className="h-4 w-4 mr-2 rotate-180" aria-hidden="true" />
                                {t.bag.continue}
                            </Link>
                        </div>
                    </section>

                    <section className="lg:col-span-5 mt-12 lg:mt-0" aria-labelledby="order-summary">
                        <div className="bg-cream-sand border border-cream-200 p-6 sm:p-8">
                            <h2 id="order-summary" className="font-serif text-xl text-charcoal-900 mb-6">
                                {t.bag.summary}
                            </h2>

                            <div className="mb-6">
                                <PromoCodeInput />
                            </div>

                            <dl className="space-y-4 text-sm">
                                <div className="flex items-center justify-between">
                                    <dt className="text-stone-warm">{t.bag.subtotal}</dt>
                                    <dd className="text-charcoal-900">{formatPrice(subtotal)}</dd>
                                </div>
                                {discount > 0 && promo && (
                                    <div className="flex items-center justify-between text-green-700">
                                        <dt>{format(t.bag.discount, { code: promo.code })}</dt>
                                        <dd>-{formatPrice(discount)}</dd>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <dt className="text-stone-warm">{t.bag.shipping}</dt>
                                    <dd className={cn(shipping === 0 ? 'text-cognac' : 'text-charcoal-900')}>
                                        {shipping === 0 ? t.bag.shippingFree : formatPrice(shipping)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-stone-warm">{t.bag.tax}</dt>
                                    <dd className="text-charcoal-900">{formatPrice(tax)}</dd>
                                </div>
                                <div className="pt-4 border-t border-cream-300 flex items-center justify-between">
                                    <dt className="font-medium text-charcoal-900">{t.bag.total}</dt>
                                    <dd className="font-serif text-xl text-charcoal-900">{formatPrice(total)}</dd>
                                </div>
                            </dl>
                            <p className="mt-3 text-xs text-stone-warm">{t.bag.estimateNote}</p>

                            <div className="mt-8">
                                <Link
                                    href={`/${locale}/contact?inquiry=order`}
                                    className="w-full bg-charcoal-900 text-cream-50 py-4 px-8 font-sans text-sm uppercase tracking-widest hover:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-colors flex items-center justify-center gap-3 text-center"
                                >
                                    <MessageCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                    {t.bag.orderAction}
                                </Link>
                                <p className="mt-3 text-xs text-stone-warm">{t.bag.orderNote}</p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-cream-300 space-y-4">
                                <div className="flex items-start gap-3 text-sm text-stone-warm">
                                    <Truck className="h-4 w-4 text-cognac flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{t.bag.freeShippingNote}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-stone-warm">
                                    <RefreshCw className="h-4 w-4 text-cognac flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <Link href={`/${locale}/shipping`} className="hover:text-cognac underline-offset-4 hover:underline">
                                        {t.bag.returnsNote}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
