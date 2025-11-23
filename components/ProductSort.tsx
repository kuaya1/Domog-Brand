'use client';

interface ProductSortProps {
    sortBy: string;
    onSortChange: (sort: string) => void;
}

export default function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600">
                Sort by:
            </label>
            <select
                id="sort"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="text-sm border-gray-200 rounded-md focus:border-amber-500 focus:ring-amber-500 py-1 pl-2 pr-8"
            >
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>
        </div>
    );
}
