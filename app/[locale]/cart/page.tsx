'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Trash2, ArrowRight, ShoppingBag, Shield, Truck, RefreshCw } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import QuantitySelector from '@/components/QuantitySelector';
import { cn } from '@/lib/utils';
import { getNamespace } from '@/lib/i18n/translations';
import { isValidLocale } from '@/lib/i18n/config';

export default function CartPage() {
    const params = useParams();
    const locale = typeof params.locale === 'string' ? params.locale : 'en';
    const t = isValidLocale(locale) ? getNamespace(locale, 'cartPage') : getNamespace('en', 'cartPage');
    
    const { cart, removeFromCart, updateQuantity, getSubtotal } = useCartStore();
    const subtotal = getSubtotal();
    const shipping = subtotal >= 500 ? 0 : 45; // Free shipping over $500
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-cream py-24 lg:py-32">
                <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
                    <div className="w-20 h-20 bg-cream-sand flex items-center justify-center mx-auto mb-8">
                        <ShoppingBag className="h-10 w-10 text-cream-400" />
                    </div>
                    <h1 className="font-serif text-3xl lg:text-4xl text-black mb-4">
                        {t.empty_title}
                    </h1>
                    <p className="text-stone-warm text-lg mb-10 max-w-md mx-auto">
                        {t.empty_description}
                    </p>
                    <Link
                        href={`/${locale}/shop`}
                        className="inline-flex items-center gap-3 bg-black text-white py-4 px-10 font-sans text-sm uppercase tracking-widest hover:bg-black-rich transition-colors"
                    >
                        {t.explore_collection}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream">
            {/* Header */}
            <div className="bg-cream-sand border-b border-cream-200 py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h1 className="font-serif text-3xl lg:text-4xl text-black">
                        {t.page_title}
                    </h1>
                    <p className="text-stone-warm mt-2">
                        {cart.length} {cart.length === 1 ? t.item_count : t.items_count}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                    {/* Cart Items */}
                    <section className="lg:col-span-7">
                        <ul className="divide-y divide-cream-200">
                            {cart.map((item) => (
                                <li key={`${item.id}-${item.selectedSize}`} className="py-8 first:pt-0">
                                    <div className="flex gap-6">
                                        {/* Product Image */}
                                        <Link 
                                            href={`/${locale}/products/${item.id}`}
                                            className="flex-shrink-0 w-28 h-32 lg:w-32 lg:h-40 bg-cream-100 relative overflow-hidden group"
                                        >
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between">
                                                <div>
                                                    <Link 
                                                        href={`/${locale}/products/${item.id}`}
                                                        className="font-serif text-lg text-black hover:text-cognac transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-sm text-stone-warm mt-1">
                                                        {t.size_label} {item.selectedSize}
                                                    </p>
                                                </div>
                                                <p className="font-serif text-lg text-black">
                                                    ${(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>

                                            <div className="mt-auto pt-4 flex items-end justify-between">
                                                <QuantitySelector
                                                    quantity={item.quantity}
                                                    onIncrease={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.selectedSize,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    onDecrease={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.selectedSize,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromCart(item.id, item.selectedSize)
                                                    }
                                                    className="text-sm text-cream-500 hover:text-burgundy transition-colors flex items-center gap-1"
                                                >
                                                    <Trash2 size={14} />
                                                    {t.remove}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Continue Shopping */}
                        <div className="mt-8 pt-8 border-t border-cream-200">
                            <Link
                                href={`/${locale}/shop`}
                                className="inline-flex items-center text-sm text-cognac hover:text-cognac-dark transition-colors"
                            >
                                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                                {t.continue_shopping}
                            </Link>
                        </div>
                    </section>

                    {/* Order Summary */}
                    <section className="lg:col-span-5 mt-12 lg:mt-0">
                        <div className="bg-cream-sand border border-cream-200 p-8">
                            <h2 className="font-serif text-xl text-black mb-6">
                                {t.order_summary}
                            </h2>

                            <dl className="space-y-4 text-sm">
                                <div className="flex items-center justify-between">
                                    <dt className="text-stone-warm">{t.subtotal}</dt>
                                    <dd className="text-black">${subtotal.toLocaleString()}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-stone-warm">{t.shipping}</dt>
                                    <dd className={cn(
                                        shipping === 0 ? "text-cognac" : "text-black"
                                    )}>
                                        {shipping === 0 ? t.shipping_free : `$${shipping}`}
                                    </dd>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-cognac">
                                        {t.shipping_note}
                                    </p>
                                )}
                                <div className="pt-4 border-t border-cream-300 flex items-center justify-between">
                                    <dt className="font-medium text-black">{t.total}</dt>
                                    <dd className="font-serif text-xl text-black">
                                        ${total.toLocaleString()}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-8">
                                <button
                                    type="button"
                                    disabled
                                    className="w-full bg-black text-white py-4 px-8 font-sans text-sm uppercase tracking-widest hover:bg-black-rich focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
                                >
                                    {t.checkout}
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Trust Signals */}
                            <div className="mt-8 pt-8 border-t border-cream-300 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-stone-warm">
                                    <Shield className="h-4 w-4 text-cognac flex-shrink-0" />
                                    <span>{t.secure_note}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-stone-warm">
                                    <Truck className="h-4 w-4 text-cognac flex-shrink-0" />
                                    <span>{t.free_shipping_note}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-stone-warm">
                                    <RefreshCw className="h-4 w-4 text-cognac flex-shrink-0" />
                                    <span>{t.returns_note}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
