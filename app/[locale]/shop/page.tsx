'use client';

import { Suspense, useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { products, isCategoryId, matchesQuery, type CategoryId } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import ProductSort, { type SortOption } from '@/components/ProductSort';
import { useMessages } from '@/lib/i18n/use-messages';
import { format, plural } from '@/lib/i18n/messages';

// Price filter ceiling: highest catalog price rounded up to the next $50,
// so the default view never hides a product
const PRICE_CEILING = Math.ceil(Math.max(...products.map((p) => p.price)) / 50) * 50;

interface ShopViewProps {
    /** Search term from ?search= (also what the site search submits). */
    search: string;
    /** Category from ?category= (footer links use it). */
    initialCategory: CategoryId | null;
}

function ShopView({ search, initialCategory }: ShopViewProps) {
    const { locale, t } = useMessages();
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(initialCategory);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [priceMax, setPriceMax] = useState(PRICE_CEILING);
    const [sortBy, setSortBy] = useState<SortOption>('newest');

    // Follow the URL when a footer link changes the category on this page
    useEffect(() => setSelectedCategory(initialCategory), [initialCategory]);

    const filteredProducts = useMemo(() => {
        const result = products.filter(
            (p) =>
                matchesQuery(p, search) &&
                (!selectedCategory || p.category === selectedCategory) &&
                (!selectedSize || p.sizes.includes(selectedSize)) &&
                p.price <= priceMax
        );
        switch (sortBy) {
            case 'price-asc':
                return result.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return result.sort((a, b) => b.price - a.price);
            default:
                return result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        }
    }, [search, selectedCategory, selectedSize, priceMax, sortBy]);

    const clearFilters = useCallback(() => {
        setSelectedCategory(null);
        setSelectedSize(null);
        setPriceMax(PRICE_CEILING);
        if (search) router.replace(`/${locale}/shop`);
    }, [search, router, locale]);

    const filters = (
        <ProductFilters
            selectedCategory={selectedCategory}
            selectedSize={selectedSize}
            priceRange={[0, priceMax]}
            maxPrice={PRICE_CEILING}
            onCategoryChange={setSelectedCategory}
            onSizeChange={setSelectedSize}
            onPriceRangeChange={(range) => setPriceMax(range[1])}
        />
    );

    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-cream-sand border-b border-cream-300">
                <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-36 lg:pb-20">
                    <div className="max-w-2xl">
                        <span className="eyebrow mb-4 inline-block">{t.collection.eyebrow}</span>
                        <h1 className="text-display-sm lg:text-display-md font-serif font-medium text-charcoal-900 mb-5">
                            {t.collection.title}
                        </h1>
                        <p className="text-body-lg text-stone-warm max-w-xl">{t.collection.intro}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-16">
                {search && (
                    <div className="mb-8 flex flex-wrap items-center gap-3">
                        <p className="text-body-md text-charcoal-900">{format(t.collection.searchResults, { query: search })}</p>
                        <button
                            type="button"
                            onClick={() => router.replace(`/${locale}/shop`)}
                            className="inline-flex items-center gap-1 text-sm text-cognac hover:text-cognac-dark underline underline-offset-4"
                        >
                            <X className="h-4 w-4" aria-hidden="true" />
                            {t.collection.clearSearch}
                        </button>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <details className="lg:hidden mb-4 group">
                        <summary className="flex items-center justify-between gap-4 py-4 px-5 bg-cream-sand border border-cream-300 cursor-pointer select-none rounded">
                            <span className="font-sans text-label-lg uppercase">{t.collection.filterAndSort}</span>
                            <span className="text-cognac text-body-sm whitespace-nowrap">
                                {plural(locale, filteredProducts.length, t.collection.results)}
                            </span>
                        </summary>
                        <div className="mt-4 p-5 bg-cream-50 border border-cream-300 rounded">
                            {filters}
                            <div className="mt-8 pt-8 border-t border-cream-300">
                                <ProductSort sortBy={sortBy} onSortChange={setSortBy} idSuffix="-mobile" />
                            </div>
                        </div>
                    </details>

                    <aside className="hidden lg:block w-72 flex-shrink-0">{filters}</aside>

                    <div className="flex-1">
                        <div className="hidden lg:flex justify-between items-center gap-4 mb-8 pb-6 border-b border-cream-300">
                            <p className="text-body-sm text-stone-warm" aria-live="polite">
                                {plural(locale, filteredProducts.length, t.collection.showing)}
                            </p>
                            <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
                        </div>

                        {filteredProducts.length > 0 ? (
                            <ProductGrid products={filteredProducts} />
                        ) : (
                            <div className="text-center py-20 lg:py-24 bg-cream-sand border border-cream-300 rounded">
                                <div className="max-w-md mx-auto px-6">
                                    <p className="font-serif text-xl text-charcoal-900 mb-3">{t.collection.emptyTitle}</p>
                                    <p className="text-stone-warm mb-8 leading-relaxed">{t.collection.emptyBody}</p>
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="inline-flex items-center font-sans text-label-lg uppercase text-charcoal-900 border-b-2 border-cognac pb-1 hover:text-cognac transition-default"
                                    >
                                        {t.collection.reset}
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

function ShopWithSearchParams() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    return (
        <ShopView
            search={searchParams.get('search') ?? ''}
            initialCategory={category && isCategoryId(category) ? category : null}
        />
    );
}

export default function ShopPage() {
    // The fallback is the full, unfiltered collection, so the pre-rendered
    // HTML still lists every product.
    return (
        <Suspense fallback={<ShopView search="" initialCategory={null} />}>
            <ShopWithSearchParams />
        </Suspense>
    );
}
