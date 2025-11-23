'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import ImageGallery from '@/components/ImageGallery';
import SizeSelector from '@/components/SizeSelector';
import QuantitySelector from '@/components/QuantitySelector';
import Toast from '@/components/Toast';
import ProductGrid from '@/components/ProductGrid';
import { ArrowLeft, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function ProductPage() {
    const params = useParams();
    const product = products.find((p) => p.id === params.id);
    const addToCart = useCartStore((state) => state.addToCart);

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Product not found
                    </h1>
                    <Link
                        href="/shop"
                        className="text-amber-700 hover:underline font-medium"
                    >
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedSize) return;
        addToCart(product, selectedSize, quantity);
        setShowToast(true);
    };

    const relatedProducts = products
        .filter((p) => p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <Link
                    href="/shop"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-amber-700 mb-8 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Gallery */}
                    <ImageGallery images={product.images} productName={product.name} />

                    {/* Details */}
                    <div>
                        <div className="mb-2">
                            <span className="text-amber-700 font-medium text-sm tracking-wide uppercase">
                                {product.category}
                            </span>
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>
                        <p className="text-2xl text-gray-900 font-bold mb-6">
                            ${product.price}
                        </p>

                        <div className="prose prose-stone mb-8 text-gray-600">
                            <p>{product.description}</p>
                        </div>

                        {/* Selectors */}
                        <div className="space-y-6 mb-8 border-t border-b border-gray-100 py-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-gray-900">Select Size</span>
                                    <button className="text-sm text-gray-500 underline hover:text-amber-700">
                                        Size Guide
                                    </button>
                                </div>
                                <SizeSelector
                                    sizes={product.sizes}
                                    selectedSize={selectedSize}
                                    onSelect={setSelectedSize}
                                />
                                {!selectedSize && (
                                    <p className="text-red-500 text-sm mt-2 hidden peer-invalid:block">
                                        Please select a size
                                    </p>
                                )}
                            </div>

                            <div>
                                <span className="block font-medium text-gray-900 mb-2">
                                    Quantity
                                </span>
                                <QuantitySelector
                                    quantity={quantity}
                                    onIncrease={() => setQuantity(quantity + 1)}
                                    onDecrease={() => setQuantity(quantity - 1)}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedSize || !product.inStock}
                                className="flex-1 bg-amber-700 text-white py-4 px-8 rounded-md font-bold hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
                            >
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-amber-700" size={20} />
                                <span>Authentic Craftsmanship</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Truck className="text-amber-700" size={20} />
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="text-amber-700" size={20} />
                                <span>Lifetime Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="border-t border-gray-100 pt-16">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                        You May Also Like
                    </h2>
                    <ProductGrid products={relatedProducts} />
                </div>
            </div>

            <Toast
                message={`${product.name} added to cart`}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}
