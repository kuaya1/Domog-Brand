'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/data';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import ProductSort from '@/components/ProductSort';

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [sortBy, setSortBy] = useState('newest');

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by Category
        if (selectedCategory) {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // Filter by Size
        if (selectedSize) {
            result = result.filter((p) => p.sizes.includes(selectedSize));
        }

        // Filter by Price
        result = result.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // Sort
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
    }, [selectedCategory, selectedSize, priceRange, sortBy]);

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
                            priceRange={priceRange}
                            onCategoryChange={setSelectedCategory}
                            onSizeChange={setSelectedSize}
                            onPriceRangeChange={setPriceRange}
                        />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm text-gray-500">
                                Showing {filteredProducts.length} results
                            </p>
                            <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
                        </div>

                        {filteredProducts.length > 0 ? (
                            <ProductGrid products={filteredProducts} />
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <p className="text-gray-600 text-lg">
                                    No products found matching your criteria.
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSelectedSize(null);
                                        setPriceRange([0, 500]);
                                    }}
                                    className="mt-4 text-amber-700 font-medium hover:underline"
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
