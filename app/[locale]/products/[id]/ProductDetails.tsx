'use client';

import { useState, useCallback, useEffect } from 'react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/lib/stores/cart-store';
import { useWishlistStore, useIsInWishlist } from '@/lib/stores/wishlist-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { useRecentlyViewedStore } from '@/lib/stores/recently-viewed-store';
import ImageGallery from '@/components/ImageGallery';
import SizeSelector from '@/components/SizeSelector';
import QuantitySelector from '@/components/QuantitySelector';
import SizeGuide from '@/components/SizeGuide';
import ProductCustomization, { type CustomizationState } from '@/components/ProductCustomization';
import ProductRecommendations from '@/components/ProductRecommendations';
import ProductReviews, { generateMockReviews } from '@/components/ProductReviews';
import { ShieldCheck, Truck, Clock, Heart, Ruler } from 'lucide-react';
import { cn } from '@/lib/utils';

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
 * - Add to cart action with slide-out drawer
 * - Add to wishlist
 * - Toast notifications via Zustand UI store
 * - Size guide modal
 * - Product customization (engraving, gift wrapping, express shipping)
 * - Recently viewed tracking
 * - Product recommendations
 * - Customer reviews
 * 
 * By isolating interactivity here, the parent page remains a Server Component,
 * enabling full SEO and caching benefits while only hydrating this island.
 */
export default function ProductDetails({ product }: ProductDetailsProps) {
    const addToCart = useCartStore((state) => state.addItem);
    const toggleWishlist = useWishlistStore((state) => state.toggleItem);
    const isInWishlist = useIsInWishlist(product.id);
    const toast = useUIStore(state => state.toast);
    const setCartDrawerOpen = useUIStore(state => state.setCartDrawerOpen);
    const addViewedProduct = useRecentlyViewedStore(state => state.addViewedProduct);

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [customization, setCustomization] = useState<CustomizationState>({
        engraving: null,
        giftWrapping: null,
        expressShipping: false,
    });
    const [customizationCost, setCustomizationCost] = useState(0);
    
    // Generate mock reviews for this product
    const reviews = generateMockReviews(product.id);
    
    // Track recently viewed
    useEffect(() => {
        addViewedProduct(product as import('@/lib/products').Product);
    }, [product, addViewedProduct]);
    
    // Handle customization changes
    const handleCustomizationChange = useCallback((newCustomization: CustomizationState, additionalCost: number) => {
        setCustomization(newCustomization);
        setCustomizationCost(additionalCost);
    }, []);

    // Memoize handlers to prevent unnecessary re-renders
    const handleAddToCart = useCallback(() => {
        if (!selectedSize || isAdding) return;
        
        setIsAdding(true);
        
        // Add to cart using new store
        const result = addToCart(product, selectedSize, quantity);
        
        if (result.success) {
            toast.success('Added to cart', result.message);
            // Open cart drawer to show the item
            setTimeout(() => {
                setCartDrawerOpen(true);
            }, 300);
        } else {
            toast.error('Could not add to cart', result.error);
        }
        
        // Reset adding state
        setTimeout(() => setIsAdding(false), 300);
    }, [selectedSize, quantity, product, addToCart, toast, setCartDrawerOpen, isAdding]);

    const handleToggleWishlist = useCallback(() => {
        const result = toggleWishlist(product);
        
        if (result.action === 'added') {
            toast.success('Added to wishlist', `${product.name} saved for later`);
        } else {
            toast.info('Removed from wishlist', `${product.name} removed`);
        }
    }, [product, toggleWishlist, toast]);

    const handleQuantityIncrease = useCallback(() => {
        setQuantity(q => Math.min(q + 1, 10));
    }, []);

    const handleQuantityDecrease = useCallback(() => {
        setQuantity(q => Math.max(q - 1, 1));
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Gallery */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Details */}
            <div>
                <div className="mb-2">
                    <span className="text-cognac-600 font-medium text-sm tracking-wide uppercase">
                        {product.category}
                    </span>
                </div>
                <h1 className="text-4xl font-serif font-bold text-black mb-4">
                    {product.name}
                </h1>
                <p className="text-2xl text-black font-bold mb-6">
                    ${product.price.toLocaleString()}
                </p>

                <div className="prose prose-stone mb-8 text-cream-700">
                    <p>{product.description}</p>
                </div>

                {/* Selectors */}
                <div className="space-y-6 mb-8 border-t border-b border-cream-200 py-8">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="font-medium text-black">Select Size</span>
                            <button 
                                type="button"
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="text-sm text-cream-600 underline hover:text-cognac-600 transition-colors flex items-center gap-1"
                            >
                                <Ruler className="h-4 w-4" />
                                Size Guide
                            </button>
                        </div>
                        <SizeSelector
                            sizes={product.sizes}
                            selectedSize={selectedSize}
                            onSelect={setSelectedSize}
                        />
                        {!selectedSize && (
                            <p className="text-cognac-600 text-sm mt-2">
                                Please select a size to continue
                            </p>
                        )}
                    </div>

                    <div>
                        <span className="block font-medium text-black mb-2">
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
                        className="flex-1 bg-black text-white py-4 px-8 font-sans text-sm uppercase tracking-widest hover:bg-black-rich disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                    >
                        {!product.inStock 
                            ? 'Out of Stock' 
                            : isAdding 
                                ? 'Adding...' 
                                : 'Add to Cart'}
                    </button>
                    
                    {/* Wishlist Button */}
                    <button
                        type="button"
                        onClick={handleToggleWishlist}
                        className={cn(
                            "p-4 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
                            isInWishlist 
                                ? "border-burgundy-500 bg-burgundy-50 text-burgundy-600" 
                                : "border-cream-300 text-cream-500 hover:border-burgundy-500 hover:text-burgundy-600"
                        )}
                        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart 
                            className={cn("h-5 w-5", isInWishlist && "fill-current")} 
                        />
                    </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-cream-600">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-cognac-600 flex-shrink-0" size={20} aria-hidden="true" />
                        <span>Authentic Craftsmanship</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Truck className="text-cognac-600 flex-shrink-0" size={20} aria-hidden="true" />
                        <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="text-cognac-600 flex-shrink-0" size={20} aria-hidden="true" />
                        <span>Lifetime Warranty</span>
                    </div>
                </div>
                
                {/* Customization Options */}
                <div className="mt-8 pt-8 border-t border-cream-200">
                    <ProductCustomization
                        basePrice={product.price}
                        onChange={handleCustomizationChange}
                    />
                </div>
            </div>
            
            {/* Size Guide Modal */}
            <SizeGuide
                isOpen={isSizeGuideOpen}
                onClose={() => setIsSizeGuideOpen(false)}
                onSelectSize={setSelectedSize}
                availableSizes={product.sizes}
                productCategory={product.category}
            />
            
            {/* Full Width Sections */}
            <div className="lg:col-span-2">
                {/* Customer Reviews */}
                <ProductReviews
                    productId={product.id}
                    reviews={reviews}
                    className="border-t border-cream-200"
                />
                
                {/* Similar Products */}
                <ProductRecommendations
                    currentProduct={product as import('@/lib/products').Product}
                    type="similar"
                    title="You May Also Like"
                    className="border-t border-cream-200"
                />
                
                {/* Recently Viewed */}
                <ProductRecommendations
                    type="recently-viewed"
                    excludeIds={[product.id]}
                    className="border-t border-cream-200"
                />
            </div>
        </div>
    );
}
