'use client';

import { useState, useCallback, useEffect } from 'react';
import { Product } from '@/lib/products';
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
            toast.success('Reserved', result.message);
            // Open cart drawer to show the item
            setTimeout(() => {
                setCartDrawerOpen(true);
            }, 300);
        } else {
            toast.error('Could not reserve', result.error);
        }
        
        // Reset adding state
        setTimeout(() => setIsAdding(false), 300);
    }, [selectedSize, quantity, product, addToCart, toast, setCartDrawerOpen, isAdding]);

    const handleToggleWishlist = useCallback(() => {
        const result = toggleWishlist(product);
        
        if (result.action === 'added') {
            toast.success('Saved for later', `${product.name} set aside for you`);
        } else {
            toast.info('Released', `${product.name} returned to the collection`);
        }
    }, [product, toggleWishlist, toast]);

    const handleQuantityIncrease = useCallback(() => {
        setQuantity(q => Math.min(q + 1, 10));
    }, []);

    const handleQuantityDecrease = useCallback(() => {
        setQuantity(q => Math.max(q - 1, 1));
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Gallery */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Details */}
            <div className="px-1 sm:px-0">
                {/* Category Badge */}
                <div className="mb-4">
                    <span className="inline-block text-xs uppercase tracking-[0.25em] text-cognac-600 border border-cognac-200 px-3 py-1">
                        {product.category}
                    </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-black mb-3 tracking-tight">
                    {product.name}
                </h1>
                
                <p className="text-2xl sm:text-3xl text-black mb-8">
                    ${product.price.toLocaleString()}
                </p>

                {/* The Craft Story */}
                <div className="mb-10">
                    <p className="text-stone-warm text-lg leading-relaxed mb-6">
                        {product.description}
                    </p>
                    <div className="border-l-2 border-gold/30 pl-5">
                        <p className="text-sm text-stone-warm italic">
                            "Leather pulled by human muscle, not machines. A dialogue measured in millimeters."
                        </p>
                    </div>
                </div>

                {/* Selectors */}
                <div className="space-y-8 mb-10 border-t border-b border-cream-200 py-8">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-serif text-lg text-black">Find Your Fit</span>
                            <button 
                                type="button"
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="min-h-[44px] px-3 -mr-3 text-sm text-cognac hover:text-cognac-dark active:text-cognac-700 transition-colors flex items-center gap-1.5"
                            >
                                <Ruler className="h-4 w-4" />
                                <span className="underline underline-offset-4">Size Guide</span>
                            </button>
                        </div>
                        <SizeSelector
                            sizes={product.sizes}
                            selectedSize={selectedSize}
                            onSelect={setSelectedSize}
                        />
                        {!selectedSize && (
                            <p className="text-cognac-600 text-sm mt-4 flex items-center gap-2">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cognac-600"></span>
                                Choose your size to proceed
                            </p>
                        )}
                    </div>

                    <div>
                        <span className="block font-serif text-lg text-black mb-3">
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

                {/* Actions - Mobile-optimized touch targets */}
                <div className="flex gap-3 sm:gap-4 mb-10">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={!selectedSize || !product.inStock || isAdding}
                        aria-disabled={!selectedSize || !product.inStock || isAdding}
                        className="flex-1 bg-black text-white min-h-[56px] py-4 px-6 sm:px-8 font-sans text-sm uppercase tracking-[0.15em] hover:bg-charcoal-800 active:bg-charcoal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                    >
                        {!product.inStock 
                            ? 'Currently at the Bench' 
                            : isAdding 
                                ? 'Reserving...' 
                                : 'Commission This Pair'}
                    </button>
                    
                    {/* Wishlist Button - 56px touch target */}
                    <button
                        type="button"
                        onClick={handleToggleWishlist}
                        className={cn(
                            "w-14 h-14 sm:w-auto sm:h-auto sm:p-4 flex items-center justify-center border-2 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
                            isInWishlist 
                                ? "border-burgundy-500 bg-burgundy-50 text-burgundy-600" 
                                : "border-cream-300 text-cream-500 hover:border-burgundy-500 hover:text-burgundy-600 active:bg-burgundy-50"
                        )}
                        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart 
                            className={cn("h-5 w-5 sm:h-5 sm:w-5", isInWishlist && "fill-current")} 
                        />
                    </button>
                </div>

                {/* Features - Heritage Value Propositions */}
                <div className="grid grid-cols-1 gap-4 py-6 border-t border-cream-200">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-cream-sand rounded-full">
                            <ShieldCheck className="text-cognac-600" size={20} aria-hidden="true" />
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-black">Forty Hours of Devotion</span>
                            <span className="text-xs text-stone-warm">Each pair shaped by master hands</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-cream-sand rounded-full">
                            <Truck className="text-cognac-600" size={20} aria-hidden="true" />
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-black">Worldwide Delivery</span>
                            <span className="text-xs text-stone-warm">From Ulaanbaatar to your door</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-cream-sand rounded-full">
                            <Clock className="text-cognac-600" size={20} aria-hidden="true" />
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-black">Lifetime Craftsmanship</span>
                            <span className="text-xs text-stone-warm">We stand behind every stitch</span>
                        </div>
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
                    title="From the Same Hands"
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
