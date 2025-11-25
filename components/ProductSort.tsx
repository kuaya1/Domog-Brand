'use client';

interface ProductSortProps {
    sortBy: string;
    onSortChange: (sort: string) => void;
}

export default function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
    return (
        <div className="flex items-center gap-3">
            <label htmlFor="sort" className="font-sans text-xs uppercase tracking-wider text-stone-warm">
                Sort by
            </label>
            <select
                id="sort"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="font-sans text-sm text-black border border-cream-300 bg-cream focus:border-cognac focus:ring-1 focus:ring-cognac py-2 pl-4 pr-10 appearance-none cursor-pointer transition-colors duration-200"
            >
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>
        </div>
    );
}
