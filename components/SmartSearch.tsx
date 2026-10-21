'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Clock, ArrowRight, Loader2, LayoutGrid } from 'lucide-react';
import {
    products,
    getUsedCategories,
    getLocalizedName,
    getCategoryLabel,
    matchesQuery,
    type Product,
    type CategoryId,
} from '@/lib/products';
import { useUIStore } from '@/lib/stores/ui-store';
import { useMessages } from '@/lib/i18n/use-messages';
import { format, formatPrice, plural } from '@/lib/i18n/messages';
import { cn } from '@/lib/utils';

const RECENT_SEARCHES_KEY = 'domog-recent-searches';
const MAX_RECENT_SEARCHES = 5;
const DEBOUNCE_MS = 200;

interface PriceRange {
    id: string;
    min: number;
    max: number;
}

const PRICE_RANGES: PriceRange[] = [
    { id: 'under-300', min: 0, max: 300 },
    { id: '300-400', min: 300, max: 400 },
    { id: '400-500', min: 400, max: 500 },
    { id: '500-plus', min: 500, max: Infinity },
];

function highlightMatch(text: string, query: string): JSX.Element {
    const q = query.trim();
    if (!q) return <>{text}</>;
    const index = text.toLocaleLowerCase().indexOf(q.toLocaleLowerCase());
    if (index === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, index)}
            <mark className="bg-gold/30 text-charcoal-900 rounded-sm px-0.5">{text.slice(index, index + q.length)}</mark>
            {text.slice(index + q.length)}
        </>
    );
}

export function SmartSearch() {
    const router = useRouter();
    const { locale, t } = useMessages();
    const inputRef = useRef<HTMLInputElement>(null);

    const isSearchOpen = useUIStore((state) => state.isSearchOpen);
    const setSearchOpen = useUIStore((state) => state.setSearchOpen);

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [priceRange, setPriceRange] = useState<PriceRange | undefined>();
    const [category, setCategory] = useState<CategoryId | undefined>();
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    useEffect(() => {
        if (query) setIsLoading(true);
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            setIsLoading(false);
        }, DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
            if (stored) setRecentSearches(JSON.parse(stored));
        } catch {
            // Ignore unreadable storage
        }
    }, []);

    useEffect(() => {
        if (isSearchOpen) setTimeout(() => inputRef.current?.focus(), 100);
    }, [isSearchOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isSearchOpen) setSearchOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isSearchOpen, setSearchOpen]);

    useEffect(() => {
        document.body.style.overflow = isSearchOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isSearchOpen]);

    const results = useMemo(() => {
        if (!debouncedQuery.trim() && !priceRange && !category) return [];
        return products.filter(
            (p) =>
                matchesQuery(p, debouncedQuery) &&
                (!category || p.category === category) &&
                (!priceRange || (p.price >= priceRange.min && p.price < priceRange.max))
        );
    }, [debouncedQuery, priceRange, category]);

    const saveRecentSearch = useCallback((term: string) => {
        if (!term.trim()) return;
        setRecentSearches((prev) => {
            const updated = [term, ...prev.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, MAX_RECENT_SEARCHES);
            try {
                localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
            } catch {
                // Ignore unavailable storage
            }
            return updated;
        });
    }, []);

    const close = useCallback(() => {
        setSearchOpen(false);
        setQuery('');
    }, [setSearchOpen]);

    const submitSearch = useCallback(
        (term = query) => {
            if (!term.trim()) return;
            saveRecentSearch(term);
            router.push(`/${locale}/shop?search=${encodeURIComponent(term.trim())}`);
            close();
        },
        [query, router, locale, saveRecentSearch, close]
    );

    const openProduct = useCallback(
        (product: Product) => {
            saveRecentSearch(getLocalizedName(product, locale));
            close();
        },
        [saveRecentSearch, locale, close]
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown' && results.length) {
            e.preventDefault();
            setFocusedIndex((prev) => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp' && results.length) {
            e.preventDefault();
            setFocusedIndex((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter') {
            const focused = results[focusedIndex];
            if (focused) {
                router.push(`/${locale}/products/${focused.id}`);
                openProduct(focused);
            } else {
                submitSearch();
            }
        }
    };

    const priceLabel = (range: PriceRange) =>
        range.min === 0
            ? format(t.search.priceUnder, { price: formatPrice(range.max) })
            : range.max === Infinity
              ? format(t.search.priceOver, { price: formatPrice(range.min) })
              : format(t.search.priceBetween, { min: formatPrice(range.min), max: formatPrice(range.max) });

    if (!isSearchOpen) return null;

    const showInitialState = !debouncedQuery && !priceRange && !category;
    const showEmptyState = !showInitialState && results.length === 0 && !isLoading;

    return (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={t.search.dialogLabel}>
            <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={close} aria-hidden="true" />

            <div className="absolute inset-x-0 top-0 bg-cream shadow-2xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-in-top">
                <div className="border-b border-cream-200 px-6 py-6">
                    <div className="max-w-4xl mx-auto pr-10">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cream-500" aria-hidden="true" />
                            <input
                                ref={inputRef}
                                type="search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setFocusedIndex(-1);
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder={t.search.placeholder}
                                aria-label={t.search.placeholder}
                                className="w-full pl-12 pr-12 py-4 bg-cream-50 border border-cream-200 text-lg placeholder:text-cream-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-cream-500 hover:text-charcoal-900 transition-colors"
                                    aria-label={t.search.clear}
                                >
                                    <X className="h-5 w-5" aria-hidden="true" />
                                </button>
                            )}
                            {isLoading && (
                                <span className="absolute right-12 top-1/2 -translate-y-1/2" aria-hidden="true">
                                    <Loader2 className="h-5 w-5 text-cognac-500 animate-spin" />
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs text-stone-warm uppercase tracking-wider">{t.search.price}</span>
                                {PRICE_RANGES.map((range) => (
                                    <FilterChip
                                        key={range.id}
                                        active={priceRange?.id === range.id}
                                        onClick={() => setPriceRange(priceRange?.id === range.id ? undefined : range)}
                                    >
                                        {priceLabel(range)}
                                    </FilterChip>
                                ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs text-stone-warm uppercase tracking-wider">{t.search.category}</span>
                                {getUsedCategories().map((id) => (
                                    <FilterChip key={id} active={category === id} onClick={() => setCategory(category === id ? undefined : id)}>
                                        {getCategoryLabel(id, locale)}
                                    </FilterChip>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="max-w-4xl mx-auto" aria-live="polite">
                        {showInitialState && recentSearches.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-serif text-lg text-charcoal-900 flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-cognac-500" aria-hidden="true" />
                                        {t.search.recent}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRecentSearches([]);
                                            try {
                                                localStorage.removeItem(RECENT_SEARCHES_KEY);
                                            } catch {
                                                // Ignore unavailable storage
                                            }
                                        }}
                                        className="text-xs text-stone-warm hover:text-charcoal-900 transition-colors"
                                    >
                                        {t.search.clearRecent}
                                    </button>
                                </div>
                                <ul className="space-y-2">
                                    {recentSearches.map((term) => (
                                        <li key={term}>
                                            <button
                                                type="button"
                                                onClick={() => submitSearch(term)}
                                                className="w-full text-left px-4 py-3 bg-cream-50 border border-cream-100 hover:border-cognac-300 transition-colors flex items-center justify-between group"
                                            >
                                                <span className="text-charcoal-800">{term}</span>
                                                <ArrowRight className="h-4 w-4 text-cream-400 group-hover:text-cognac-500 transition-colors" aria-hidden="true" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {results.length > 0 && (
                            <div>
                                <p className="text-sm text-stone-warm mb-4">{plural(locale, results.length, t.search.results)}</p>
                                <div className="grid gap-4">
                                    {results.map((product, idx) => {
                                        const name = getLocalizedName(product, locale);
                                        return (
                                            <Link
                                                key={product.id}
                                                href={`/${locale}/products/${product.id}`}
                                                onClick={() => openProduct(product)}
                                                className={cn(
                                                    'flex gap-4 p-4 bg-cream-50 border transition-all',
                                                    focusedIndex === idx ? 'border-gold ring-2 ring-gold/20' : 'border-cream-100 hover:border-cognac-300'
                                                )}
                                            >
                                                <span className="relative w-20 h-20 bg-cream-100 flex-shrink-0">
                                                    <Image src={product.images[0]} alt="" fill className="object-cover" sizes="80px" />
                                                </span>
                                                <span className="flex-1 min-w-0">
                                                    <span className="block font-serif text-lg text-charcoal-900">{highlightMatch(name, debouncedQuery)}</span>
                                                    <span className="block text-sm text-cognac-600">
                                                        {highlightMatch(getCategoryLabel(product.category, locale), debouncedQuery)}
                                                    </span>
                                                </span>
                                                <span className="text-right flex-shrink-0">
                                                    <span className="block font-serif text-lg text-charcoal-900">{formatPrice(product.price)}</span>
                                                    {product.isNew && (
                                                        <span className="text-xs text-gold-700 uppercase tracking-wider">{t.product.new}</span>
                                                    )}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {(showEmptyState || (showInitialState && recentSearches.length === 0)) && (
                            <div className={cn('text-center', showEmptyState ? 'py-12' : 'py-4')}>
                                {showEmptyState && (
                                    <>
                                        <Search className="h-12 w-12 text-cream-300 mx-auto mb-4" aria-hidden="true" />
                                        <h3 className="font-serif text-xl text-charcoal-900 mb-2">{t.search.none}</h3>
                                        <p className="text-stone-warm mb-6 max-w-md mx-auto">{t.search.noneBody}</p>
                                    </>
                                )}
                                <Link
                                    href={`/${locale}/shop`}
                                    onClick={close}
                                    className="inline-flex items-center gap-2 text-cognac-700 hover:text-cognac-900 text-sm underline underline-offset-4"
                                >
                                    <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                                    {t.search.viewAll}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={close}
                    className="absolute top-6 right-4 sm:right-6 p-2 text-stone-warm hover:text-charcoal-900 transition-colors"
                    aria-label={t.search.close}
                >
                    <X className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'px-3 py-1 text-xs border transition-colors',
                active ? 'bg-charcoal-900 text-cream-50 border-charcoal-900' : 'bg-cream-50 text-charcoal-700 border-cream-200 hover:border-charcoal-900'
            )}
        >
            {children}
        </button>
    );
}

export default SmartSearch;
