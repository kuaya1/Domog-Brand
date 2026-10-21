'use client';

import { cn } from '@/lib/utils';
import { getUsedCategories, getCatalogSizes, getCategoryLabel, type CategoryId } from '@/lib/products';
import { useMessages } from '@/lib/i18n/use-messages';
import { format, formatPrice } from '@/lib/i18n/messages';

interface ProductFiltersProps {
    selectedCategory: CategoryId | null;
    selectedSize: string | null;
    priceRange: [number, number];
    /** Upper bound of the price slider */
    maxPrice: number;
    onCategoryChange: (category: CategoryId | null) => void;
    onSizeChange: (size: string | null) => void;
    onPriceRangeChange: (range: [number, number]) => void;
}

/** Categories and sizes come from the catalog, so every option matches at least one product. */
export default function ProductFilters({
    selectedCategory,
    selectedSize,
    priceRange,
    maxPrice,
    onCategoryChange,
    onSizeChange,
    onPriceRangeChange,
}: ProductFiltersProps) {
    const { locale, t } = useMessages();

    return (
        <div className="space-y-10 lg:space-y-12">
            <fieldset>
                <legend className="w-full font-sans text-xs uppercase tracking-[0.2em] text-charcoal-900 mb-5 pb-3 border-b border-cream-200">
                    {t.collection.category}
                </legend>
                <div className="space-y-3">
                    <FilterOption active={selectedCategory === null} onClick={() => onCategoryChange(null)}>
                        {t.collection.all}
                    </FilterOption>
                    {getUsedCategories().map((category) => (
                        <FilterOption
                            key={category}
                            active={selectedCategory === category}
                            onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
                        >
                            {getCategoryLabel(category, locale)}
                        </FilterOption>
                    ))}
                </div>
            </fieldset>

            <fieldset>
                <legend className="w-full font-sans text-xs uppercase tracking-[0.2em] text-charcoal-900 mb-5 pb-3 border-b border-cream-200">
                    {t.collection.size}
                </legend>
                <div className="grid grid-cols-4 gap-2">
                    {getCatalogSizes().map((size) => (
                        <button
                            key={size}
                            type="button"
                            aria-pressed={selectedSize === size}
                            onClick={() => onSizeChange(selectedSize === size ? null : size)}
                            className={cn(
                                'py-3 px-2 border text-sm transition-all duration-200',
                                selectedSize === size
                                    ? 'bg-charcoal-900 text-cream-50 border-charcoal-900'
                                    : 'border-cream-300 text-stone-warm hover:border-cognac hover:text-cognac'
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </fieldset>

            <div>
                <label
                    htmlFor="price-filter"
                    className="block font-sans text-xs uppercase tracking-[0.2em] text-charcoal-900 mb-5 pb-3 border-b border-cream-200"
                >
                    {t.collection.price}
                </label>
                <div className="space-y-4">
                    <p className="text-sm text-charcoal-900 font-medium">
                        {format(t.collection.priceUpTo, { price: formatPrice(priceRange[1]) })}
                    </p>
                    <input
                        id="price-filter"
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                        aria-valuetext={formatPrice(priceRange[1])}
                        className="w-full h-1 bg-cream-300 rounded-none appearance-none cursor-pointer accent-cognac"
                    />
                </div>
            </div>
        </div>
    );
}

function FilterOption({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onClick}
            className={cn(
                'block w-full text-left text-sm py-1.5 transition-colors duration-300',
                active ? 'text-charcoal-900 font-medium' : 'text-stone-warm hover:text-cognac'
            )}
        >
            {children}
        </button>
    );
}
