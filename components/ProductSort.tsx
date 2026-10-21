'use client';

import { useMessages } from '@/lib/i18n/use-messages';

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

interface ProductSortProps {
    sortBy: SortOption;
    onSortChange: (sort: SortOption) => void;
    /** Distinguishes the mobile and desktop instances on the same page. */
    idSuffix?: string;
}

export default function ProductSort({ sortBy, onSortChange, idSuffix = '' }: ProductSortProps) {
    const { t } = useMessages();
    const id = `sort${idSuffix}`;

    return (
        <div className="flex items-center gap-3">
            <label htmlFor={id} className="font-sans text-xs uppercase tracking-wider text-stone-warm whitespace-nowrap">
                {t.collection.sort}
            </label>
            <select
                id={id}
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="font-sans text-sm text-charcoal-900 border border-cream-300 bg-cream focus:border-cognac focus:ring-1 focus:ring-cognac py-2 pl-4 pr-10 appearance-none cursor-pointer transition-colors duration-200"
            >
                <option value="newest">{t.collection.newest}</option>
                <option value="price-asc">{t.collection.priceAsc}</option>
                <option value="price-desc">{t.collection.priceDesc}</option>
            </select>
        </div>
    );
}
