'use client';

import { useState, useMemo, useCallback } from 'react';
import { products } from '@/lib/data';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import ProductSort from '@/components/ProductSort';

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
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50 py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                        Shop All Boots
                    </h1>
                    <p className="text-gray-600 max-w-2xl">
                        Discover our collection of handcrafted Mongolian boots, blending
                        centuries of tradition with modern comfort and style.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
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
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm text-gray-500">
                                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                            </p>
                            <ProductSort sortBy={sortBy} onSortChange={handleSortChange} />
                        </div>

                        {filteredProducts.length > 0 ? (
                            <ProductGrid products={filteredProducts} />
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <p className="text-gray-600 text-lg">
                                    No products found matching your criteria.
                                </p>
                                <button
                                    onClick={handleClearFilters}
                                    className="mt-4 text-amber-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
