'use client';

import { useState, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { products } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import ProductSort from '@/components/ProductSort';
import { getNamespace } from '@/lib/i18n/translations';
import { isValidLocale } from '@/lib/i18n/config';

/**
 * SHOP PAGE - Optimized for High Traffic
 * 
 * Key optimizations:
 * 1. Price range stored as individual values to prevent tuple reference issues
 * 2. Memoized filter/sort functions to prevent recalculation
 * 3. ProductGrid is memoized and only re-renders when product list changes
 * 4. useCallback for all handler functions
 */
export default function ShopPage() {
    const params = useParams();
    const locale = typeof params.locale === 'string' ? params.locale : 'en';
    const t = isValidLocale(locale) ? getNamespace(locale, 'shop') : getNamespace('en', 'shop');
    
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    // Store price range as individual values to prevent reference equality issues
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(500);
    const [sortBy, setSortBy] = useState('newest');

    // Memoize the filtered products
    const filteredProducts = useMemo(() => {
        let result = products;

        // Filter by Category
        if (selectedCategory) {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // Filter by Size
        if (selectedSize) {
            result = result.filter((p) => p.sizes.includes(selectedSize));
        }

        // Filter by Price (using individual values, not tuple)
        result = result.filter(
            (p) => p.price >= priceMin && p.price <= priceMax
        );

        // Sort (create new array only here, after all filters)
        result = [...result];
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
                break;
        }

        return result;
    }, [selectedCategory, selectedSize, priceMin, priceMax, sortBy]);

    // Memoize handlers to prevent child re-renders
    const handleCategoryChange = useCallback((category: string | null) => {
        setSelectedCategory(category);
    }, []);

    const handleSizeChange = useCallback((size: string | null) => {
        setSelectedSize(size);
    }, []);

    const handlePriceRangeChange = useCallback((range: [number, number]) => {
        setPriceMin(range[0]);
        setPriceMax(range[1]);
    }, []);

    const handleSortChange = useCallback((sort: string) => {
        setSortBy(sort);
    }, []);

    const handleClearFilters = useCallback(() => {
        setSelectedCategory(null);
        setSelectedSize(null);
        setPriceMin(0);
        setPriceMax(500);
    }, []);

    return (
        <div className="min-h-screen bg-cream-50">
            {/* Hero Header */}
            <div className="bg-cream-sand border-b border-cream-300">
                <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
                    <div className="max-w-2xl">
                        <span className="eyebrow mb-4 inline-block">
                            {t.hero_label}
                        </span>
                        <h1 className="text-display-sm lg:text-display-md font-serif font-medium text-charcoal-900 mb-5">
                            {t.hero_title}
                        </h1>
                        <p className="text-body-lg text-stone-warm max-w-xl">
                            {t.hero_description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Mobile Filter Toggle - Above content on mobile */}
                    <details className="lg:hidden mb-4 group">
                        <summary className="flex items-center justify-between py-4 px-5 bg-cream-sand border border-cream-300 cursor-pointer select-none rounded">
                            <span className="font-sans text-label-lg uppercase">Filter & Sort</span>
                            <span className="text-cognac text-body-sm">{filteredProducts.length} results</span>
                        </summary>
                        <div className="mt-4 p-5 bg-cream-50 border border-cream-300 rounded">
                            <ProductFilters
                                selectedCategory={selectedCategory}
                                selectedSize={selectedSize}
                                priceRange={[priceMin, priceMax]}
                                onCategoryChange={handleCategoryChange}
                                onSizeChange={handleSizeChange}
                                onPriceRangeChange={handlePriceRangeChange}
                            />
                            <div className="mt-8 pt-8 border-t border-cream-300">
                                <ProductSort sortBy={sortBy} onSortChange={handleSortChange} />
                            </div>
                        </div>
                    </details>
                    
                    {/* Sidebar - Desktop Only */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <ProductFilters
                            selectedCategory={selectedCategory}
                            selectedSize={selectedSize}
                            priceRange={[priceMin, priceMax]}
                            onCategoryChange={handleCategoryChange}
                            onSizeChange={handleSizeChange}
                            onPriceRangeChange={handlePriceRangeChange}
                        />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="hidden lg:flex justify-between items-center mb-8 pb-6 border-b border-cream-300">
                            <p className="text-body-sm text-stone-warm">
                                {t.showing} <span className="text-charcoal-900 font-medium">{filteredProducts.length}</span> {filteredProducts.length === 1 ? t.piece : t.pieces}
                            </p>
                            <ProductSort sortBy={sortBy} onSortChange={handleSortChange} />
                        </div>

                        {filteredProducts.length > 0 ? (
                            <ProductGrid products={filteredProducts} />
                        ) : (
                            <div className="text-center py-20 lg:py-24 bg-cream-sand border border-cream-300 rounded">
                                <div className="max-w-md mx-auto px-6">
                                    <p className="font-serif text-xl text-charcoal-900 mb-3">
                                        No boots match these criteria
                                    </p>
                                    <p className="text-stone-warm mb-8 leading-relaxed">
                                        Our collection is curated, not exhaustive. Perhaps adjust your filters to discover what our craftsmen have prepared.
                                    </p>
                                    <button
                                        onClick={handleClearFilters}
                                        className="inline-flex items-center font-sans text-label-lg uppercase text-charcoal-900 border-b-2 border-cognac pb-1 hover:text-cognac transition-default"
                                    >
                                        {t.clear_filters}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
