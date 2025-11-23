'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import QuantitySelector from '@/components/QuantitySelector';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getSubtotal } = useCartStore();
    const subtotal = getSubtotal();
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                        Your Cart is Empty
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Looks like you haven&apos;t added any boots to your cart yet.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                    Shopping Cart
                </h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    {/* Cart Items */}
                    <section className="lg:col-span-7">
                        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                            {cart.map((item) => (
                                <li key={`${item.id}-${item.selectedSize}`} className="flex py-6">
                                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden relative bg-gray-100">
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="font-serif">
                                                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                                                </h3>
                                                <p className="ml-4">${item.price * item.quantity}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Size: {item.selectedSize}
                                            </p>
                                        </div>
                                        <div className="flex-1 flex items-end justify-between text-sm">
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
                                                className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order Summary */}
                    <section className="lg:col-span-5 mt-16 lg:mt-0 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">
                            Order Summary
                        </h2>

                        <div className="flow-root">
                            <dl className="-my-4 text-sm divide-y divide-gray-200">
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">${subtotal}</dd>
                                </div>
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-gray-600">Shipping</dt>
                                    <dd className="font-medium text-gray-900">Free</dd>
                                </div>
                                <div className="py-4 flex items-center justify-between border-t border-gray-200">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">
                                        ${total}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                disabled
                                className="w-full bg-amber-700 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <ArrowRight size={18} />
                            </button>
                            <p className="mt-4 text-center text-xs text-gray-500">
                                Checkout is currently disabled for this demo.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
