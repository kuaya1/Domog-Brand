'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, MessageCircle, Ruler } from 'lucide-react';
import { type Product, getLocalizedName, getCategoryLabel } from '@/lib/products';
import { useCartStore } from '@/lib/stores/cart-store';
import { useWishlistStore, useIsInWishlist } from '@/lib/stores/wishlist-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { useRecentlyViewedStore } from '@/lib/stores/recently-viewed-store';
import { useMessages } from '@/lib/i18n/use-messages';
import { format, formatPrice } from '@/lib/i18n/messages';
import ImageGallery from '@/components/ImageGallery';
import SizeSelector from '@/components/SizeSelector';
import QuantitySelector from '@/components/QuantitySelector';
import SizeGuide from '@/components/SizeGuide';
import ProductRecommendations from '@/components/ProductRecommendations';
import { cn } from '@/lib/utils';

const MAX_QUANTITY = 10;

interface ProductDetailsProps {
    product: Product;
}

/**
 * Interactive part of the product page: gallery, size and quantity, add to
 * bag, wishlist, size guide, and recommendations.
 *
 * The personalization panel (engraving, gift wrap, express shipping) is not
 * rendered: its selections never reached the cart, and the services are not
 * confirmed. See docs/content/ARCHITECTURE-DECISIONS.md (AD-8).
 */
export default function ProductDetails({ product }: ProductDetailsProps) {
    const { locale, t } = useMessages();
    const addToCart = useCartStore((state) => state.addItem);
    const toggleWishlist = useWishlistStore((state) => state.toggleItem);
    const isInWishlist = useIsInWishlist(product.id);
    const toast = useUIStore((state) => state.toast);
    const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);
    const addViewedProduct = useRecentlyViewedStore((state) => state.addViewedProduct);

    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    const model = getLocalizedName(product, locale);
    const category = getCategoryLabel(product.category, locale);
    const description = product.details?.[locale] ?? format(t.product.fallbackDescription, { model });
    const available = product.inStock !== false;

    useEffect(() => {
        addViewedProduct(product);
    }, [product, addViewedProduct]);

    const handleAddToCart = useCallback(() => {
        if (!selectedSize || isAdding) return;
        setIsAdding(true);

        const result = addToCart(product, selectedSize, quantity);
        if (result.success) {
            toast.success(t.product.addedTitle, format(t.product.addedBody, { model, size: selectedSize }));
            setTimeout(() => setCartDrawerOpen(true), 300);
        } else {
            const reasons = {
                INVALID_SIZE: t.product.errorInvalidSize,
                OUT_OF_STOCK: t.product.errorOutOfStock,
                MAX_QUANTITY: format(t.product.errorMaxQuantity, { max: MAX_QUANTITY }),
                INVALID_PRODUCT: t.product.errorInvalidProduct,
            };
            toast.error(t.product.addFailedTitle, reasons[result.code]);
        }

        setTimeout(() => setIsAdding(false), 300);
    }, [selectedSize, isAdding, addToCart, product, quantity, toast, t, model, setCartDrawerOpen]);

    const handleToggleWishlist = useCallback(() => {
        const result = toggleWishlist(product);
        if (result.action === 'added') {
            toast.success(t.product.savedTitle, format(t.product.savedBody, { model }));
        } else {
            toast.info(t.product.removedTitle, format(t.product.removedBody, { model }));
        }
    }, [product, toggleWishlist, toast, t, model]);

    const supportLinks = [
        { href: `/${locale}/size-guide`, title: t.product.sizeFit, body: t.product.supportSize },
        { href: `/${locale}/shipping`, title: t.footer.shipping, body: t.product.supportShipping },
        { href: `/${locale}/warranty`, title: t.footer.warranty, body: t.product.supportWarranty },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <ImageGallery images={product.images} productName={model} />

            <div className="px-1 sm:px-0">
                <div className="mb-4">
                    <span className="inline-block text-xs uppercase tracking-[0.25em] text-cognac-600 border border-cognac-200 px-3 py-1">
                        {category}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-charcoal-900 mb-3 tracking-tight">
                    {model}
                </h1>

                <p className="text-2xl sm:text-3xl text-charcoal-900 mb-8">
                    {formatPrice(product.price)} <span className="text-sm text-stone-warm align-middle">USD</span>
                </p>

                <p className="text-stone-warm text-lg leading-relaxed mb-10">{description}</p>

                <div className="space-y-8 mb-10 border-t border-b border-cream-200 py-8">
                    <div>
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                            <h2 className="font-serif text-lg text-charcoal-900">{t.product.chooseSize}</h2>
                            <button
                                type="button"
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="min-h-[44px] px-3 -mr-3 text-sm text-cognac hover:text-cognac-dark active:text-cognac-700 transition-colors flex items-center gap-1.5"
                            >
                                <Ruler className="h-4 w-4" aria-hidden="true" />
                                <span className="underline underline-offset-4">{t.product.sizeGuide}</span>
                            </button>
                        </div>
                        <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelect={setSelectedSize} />
                        <p className="text-xs text-stone-warm mt-3">{t.product.sizesAreEu}</p>
                        {!selectedSize && available && (
                            <p className="text-cognac-600 text-sm mt-3 flex items-center gap-2" role="status">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cognac-600" aria-hidden="true" />
                                {t.product.sizeRequired}
                            </p>
                        )}
                    </div>

                    <div>
                        <span className="block font-serif text-lg text-charcoal-900 mb-3">{t.product.quantity}</span>
                        <QuantitySelector
                            quantity={quantity}
                            onIncrease={() => setQuantity((q) => Math.min(q + 1, MAX_QUANTITY))}
                            onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
                            max={MAX_QUANTITY}
                        />
                    </div>
                </div>

                <div className="flex gap-3 sm:gap-4 mb-6">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={!selectedSize || !available || isAdding}
                        className="flex-1 bg-charcoal-900 text-cream-50 min-h-[56px] py-4 px-6 sm:px-8 font-sans text-sm uppercase tracking-[0.15em] hover:bg-charcoal-800 active:bg-charcoal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                    >
                        {!available ? t.product.unavailable : isAdding ? t.product.adding : t.product.addBag}
                    </button>

                    <button
                        type="button"
                        onClick={handleToggleWishlist}
                        className={cn(
                            'w-14 h-14 sm:w-auto sm:h-auto sm:p-4 flex items-center justify-center border-2 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2',
                            isInWishlist
                                ? 'border-burgundy-500 bg-burgundy-50 text-burgundy-600'
                                : 'border-cream-300 text-cream-500 hover:border-burgundy-500 hover:text-burgundy-600 active:bg-burgundy-50'
                        )}
                        aria-label={isInWishlist ? t.product.wishlistRemove : t.product.wishlistAdd}
                        aria-pressed={isInWishlist}
                    >
                        <Heart className={cn('h-5 w-5', isInWishlist && 'fill-current')} aria-hidden="true" />
                    </button>
                </div>

                <Link
                    href={`/${locale}/contact?product=${product.id}`}
                    className="inline-flex items-center gap-2 text-sm text-cognac hover:text-cognac-dark transition-colors mb-10 min-h-[44px]"
                >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span className="underline underline-offset-4">{t.product.ask}</span>
                </Link>

                <div className="border-t border-cream-200 pt-6">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-stone-warm mb-4">{t.product.supportTitle}</h2>
                    <ul className="divide-y divide-cream-200">
                        {supportLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="group flex items-center justify-between gap-4 py-4">
                                    <span>
                                        <span className="block text-sm font-medium text-charcoal-900 group-hover:text-cognac transition-colors">
                                            {link.title}
                                        </span>
                                        <span className="block text-xs text-stone-warm mt-0.5">{link.body}</span>
                                    </span>
                                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-stone-warm group-hover:text-cognac transition-colors" aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <SizeGuide
                isOpen={isSizeGuideOpen}
                onClose={() => setIsSizeGuideOpen(false)}
                onSelectSize={setSelectedSize}
                availableSizes={product.sizes}
            />

            <div className="lg:col-span-2">
                <ProductRecommendations
                    currentProduct={product}
                    type="similar"
                    className="border-t border-cream-200"
                />
                <ProductRecommendations
                    type="recently-viewed"
                    excludeIds={[product.id]}
                    className="border-t border-cream-200"
                />
            </div>
        </div>
    );
}
