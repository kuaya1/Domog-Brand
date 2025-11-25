'use client';

import { useState, useCallback } from 'react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import ImageGallery from '@/components/ImageGallery';
import SizeSelector from '@/components/SizeSelector';
import QuantitySelector from '@/components/QuantitySelector';
import Toast from '@/components/Toast';
import { ShieldCheck, Truck, Clock } from 'lucide-react';

interface ProductDetailsProps {
    product: Product;
}

/**
 * PRODUCT DETAILS - Client Component Island
 * 
 * This component handles all interactive functionality:
 * - Image gallery with thumbnail selection
 * - Size selector
 * - Quantity selector
 * - Add to cart action
 * - Toast notifications
 * 
 * By isolating interactivity here, the parent page remains a Server Component,
 * enabling full SEO and caching benefits while only hydrating this island.
 */
export default function ProductDetails({ product }: ProductDetailsProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // Memoize handlers to prevent unnecessary re-renders
    const handleAddToCart = useCallback(() => {
        if (!selectedSize || isAdding) return;
        
        setIsAdding(true);
        
        // Simulate network delay for better UX feedback
        // In production, this would be an actual API call
        addToCart(product, selectedSize, quantity);
        setShowToast(true);
        
        // Reset adding state
        setTimeout(() => setIsAdding(false), 300);
    }, [selectedSize, quantity, product, addToCart, isAdding]);

    const handleCloseToast = useCallback(() => {
        setShowToast(false);
    }, []);

    const handleQuantityIncrease = useCallback(() => {
        setQuantity(q => Math.min(q + 1, 10));
    }, []);

    const handleQuantityDecrease = useCallback(() => {
        setQuantity(q => Math.max(q - 1, 1));
    }, []);

    return (
        <>
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
                        ${product.price.toLocaleString()}
                    </p>

                    <div className="prose prose-stone mb-8 text-gray-600">
                        <p>{product.description}</p>
                    </div>

                    {/* Selectors */}
                    <div className="space-y-6 mb-8 border-t border-b border-gray-100 py-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium text-gray-900">Select Size</span>
                                <button 
                                    type="button"
                                    className="text-sm text-gray-500 underline hover:text-amber-700 transition-colors"
                                >
                                    Size Guide
                                </button>
                            </div>
                            <SizeSelector
                                sizes={product.sizes}
                                selectedSize={selectedSize}
                                onSelect={setSelectedSize}
                            />
                            {!selectedSize && (
                                <p className="text-amber-600 text-sm mt-2">
                                    Please select a size to continue
                                </p>
                            )}
                        </div>

                        <div>
                            <span className="block font-medium text-gray-900 mb-2">
                                Quantity
                            </span>
                            <QuantitySelector
                                quantity={quantity}
                                onIncrease={handleQuantityIncrease}
                                onDecrease={handleQuantityDecrease}
                                max={10}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-8">
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={!selectedSize || !product.inStock || isAdding}
                            aria-disabled={!selectedSize || !product.inStock || isAdding}
                            className="flex-1 bg-amber-700 text-white py-4 px-8 rounded-md font-bold hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        >
                            {!product.inStock 
                                ? 'Out of Stock' 
                                : isAdding 
                                    ? 'Adding...' 
                                    : 'Add to Cart'}
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-amber-700 flex-shrink-0" size={20} aria-hidden="true" />
                            <span>Authentic Craftsmanship</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Truck className="text-amber-700 flex-shrink-0" size={20} aria-hidden="true" />
                            <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="text-amber-700 flex-shrink-0" size={20} aria-hidden="true" />
                            <span>Lifetime Warranty</span>
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                message={`${product.name} (Size ${selectedSize}) added to cart`}
                isVisible={showToast}
                onClose={handleCloseToast}
            />
        </>
    );
}
