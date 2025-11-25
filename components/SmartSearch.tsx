'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Clock, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import { products, productCategories, type Product } from '@/lib/products';
import { useUIStore } from '@/lib/stores/ui-store';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface SearchResult {
    product: Product;
    matchType: 'name' | 'category' | 'description';
    matchedText: string;
}

interface PriceRange {
    min: number;
    max: number;
    label: string;
}

// ============================================================================
// Constants
// ============================================================================

const RECENT_SEARCHES_KEY = 'domog-recent-searches';
const MAX_RECENT_SEARCHES = 5;
const DEBOUNCE_MS = 200;

const PRICE_RANGES: PriceRange[] = [
    { min: 0, max: 300, label: 'Under $300' },
    { min: 300, max: 400, label: '$300 - $400' },
    { min: 400, max: 500, label: '$400 - $500' },
    { min: 500, max: Infinity, label: '$500+' },
];

const POPULAR_SEARCHES = [
    'ceremonial',
    'winter boots',
    'luxury',
    'riding',
    'heritage',
];

// ============================================================================
// Helper Functions
// ============================================================================

function highlightMatch(text: string, query: string): JSX.Element {
    if (!query.trim()) return <>{text}</>;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return (
        <>
            {parts.map((part, i) => 
                regex.test(part) ? (
                    <mark key={i} className="bg-gold/30 text-black rounded-sm px-0.5">
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
}

function searchProducts(query: string, priceRange?: PriceRange, category?: string): SearchResult[] {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery && !priceRange && !category) return [];
    
    return products
        .filter(product => {
            // Price range filter
            if (priceRange) {
                if (product.price < priceRange.min || product.price > priceRange.max) {
                    return false;
                }
            }
            
            // Category filter
            if (category && product.category.toLowerCase() !== category.toLowerCase()) {
                return false;
            }
            
            // Text search
            if (normalizedQuery) {
                const nameMatch = product.name.toLowerCase().includes(normalizedQuery);
                const categoryMatch = product.category.toLowerCase().includes(normalizedQuery);
                const descMatch = product.description.toLowerCase().includes(normalizedQuery);
                return nameMatch || categoryMatch || descMatch;
            }
            
            return true;
        })
        .map(product => {
            const nameMatch = product.name.toLowerCase().includes(normalizedQuery);
            const categoryMatch = product.category.toLowerCase().includes(normalizedQuery);
            
            const matchType: SearchResult['matchType'] = nameMatch ? 'name' : categoryMatch ? 'category' : 'description';
            
            return {
                product,
                matchType,
                matchedText: nameMatch ? product.name : categoryMatch ? product.category : product.description.slice(0, 100),
            };
        })
        .sort((a, b) => {
            // Prioritize name matches, then category, then description
            const priority = { name: 0, category: 1, description: 2 };
            return priority[a.matchType] - priority[b.matchType];
        });
}

// ============================================================================
// Component
// ============================================================================

export function SmartSearch() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const isSearchOpen = useUIStore(state => state.isSearchOpen);
    const setSearchOpen = useUIStore(state => state.setSearchOpen);
    
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    
    // Debounce query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            setIsLoading(false);
        }, DEBOUNCE_MS);
        
        if (query) setIsLoading(true);
        
        return () => clearTimeout(timer);
    }, [query]);
    
    // Load recent searches from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
            if (stored) {
                try {
                    setRecentSearches(JSON.parse(stored));
                } catch {
                    // Ignore parse errors
                }
            }
        }
    }, []);
    
    // Focus input when search opens
    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isSearchOpen]);
    
    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isSearchOpen) {
                setSearchOpen(false);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isSearchOpen, setSearchOpen]);
    
    // Prevent body scroll when open
    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isSearchOpen]);
    
    // Search results
    const results = useMemo(() => {
        return searchProducts(debouncedQuery, selectedPriceRange, selectedCategory);
    }, [debouncedQuery, selectedPriceRange, selectedCategory]);
    
    // Save search to recent
    const saveRecentSearch = useCallback((searchTerm: string) => {
        if (!searchTerm.trim()) return;
        
        setRecentSearches(prev => {
            const filtered = prev.filter(s => s.toLowerCase() !== searchTerm.toLowerCase());
            const updated = [searchTerm, ...filtered].slice(0, MAX_RECENT_SEARCHES);
            
            if (typeof window !== 'undefined') {
                localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
            }
            
            return updated;
        });
    }, []);
    
    // Handle search submit
    const handleSearch = useCallback((searchTerm?: string) => {
        const term = searchTerm || query;
        if (term.trim()) {
            saveRecentSearch(term);
            router.push(`/shop?search=${encodeURIComponent(term)}`);
            setSearchOpen(false);
            setQuery('');
        }
    }, [query, router, saveRecentSearch, setSearchOpen]);
    
    // Handle product click
    const handleProductClick = useCallback((product: Product) => {
        saveRecentSearch(product.name);
        setSearchOpen(false);
        setQuery('');
    }, [saveRecentSearch, setSearchOpen]);
    
    // Clear recent searches
    const clearRecentSearches = useCallback(() => {
        setRecentSearches([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(RECENT_SEARCHES_KEY);
        }
    }, []);
    
    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        const totalItems = results.length;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex(prev => (prev + 1) % totalItems);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex(prev => (prev - 1 + totalItems) % totalItems);
        } else if (e.key === 'Enter') {
            if (focusedIndex >= 0 && results[focusedIndex]) {
                router.push(`/products/${results[focusedIndex].product.id}`);
                handleProductClick(results[focusedIndex].product);
            } else {
                handleSearch();
            }
        }
    }, [results, focusedIndex, router, handleProductClick, handleSearch]);
    
    const showEmptyState = debouncedQuery && results.length === 0 && !isLoading;
    const showInitialState = !debouncedQuery && !selectedPriceRange && !selectedCategory;
    
    if (!isSearchOpen) return null;
    
    return (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Search">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSearchOpen(false)}
            />
            
            {/* Search Container */}
            <div 
                ref={containerRef}
                className="absolute inset-x-0 top-0 bg-cream shadow-2xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-in-top"
            >
                {/* Search Header */}
                <div className="border-b border-cream-200 px-6 py-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cream-500" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search for boots, categories, or styles..."
                                className="w-full pl-12 pr-12 py-4 bg-white border border-cream-200 text-lg placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-cream-400 hover:text-black transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                            {isLoading && (
                                <div className="absolute right-12 top-1/2 -translate-y-1/2">
                                    <Loader2 className="h-5 w-5 text-cognac-500 animate-spin" />
                                </div>
                            )}
                        </div>
                        
                        {/* Filters */}
                        <div className="flex flex-wrap gap-3 mt-4">
                            {/* Price Filters */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-cream-500 uppercase tracking-wider">Price:</span>
                                {PRICE_RANGES.map((range) => (
                                    <button
                                        key={range.label}
                                        onClick={() => setSelectedPriceRange(
                                            selectedPriceRange?.label === range.label ? undefined : range
                                        )}
                                        className={cn(
                                            "px-3 py-1 text-xs border transition-colors",
                                            selectedPriceRange?.label === range.label
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-cream-600 border-cream-200 hover:border-black"
                                        )}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Category Filters */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-cream-500 uppercase tracking-wider">Category:</span>
                                {productCategories.slice(0, 5).map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(
                                            selectedCategory === cat.slug ? undefined : cat.slug
                                        )}
                                        className={cn(
                                            "px-3 py-1 text-xs border transition-colors",
                                            selectedCategory === cat.slug
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-cream-600 border-cream-200 hover:border-black"
                                        )}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Search Results */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Initial State - Recent & Popular Searches */}
                        {showInitialState && (
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Recent Searches */}
                                {recentSearches.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-serif text-lg text-black flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-cognac-500" />
                                                Recent Searches
                                            </h3>
                                            <button
                                                onClick={clearRecentSearches}
                                                className="text-xs text-cream-500 hover:text-black transition-colors"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                        <ul className="space-y-2">
                                            {recentSearches.map((search, idx) => (
                                                <li key={idx}>
                                                    <button
                                                        onClick={() => {
                                                            setQuery(search);
                                                            handleSearch(search);
                                                        }}
                                                        className="w-full text-left px-4 py-3 bg-white border border-cream-100 hover:border-cognac-300 transition-colors flex items-center justify-between group"
                                                    >
                                                        <span className="text-cream-700">{search}</span>
                                                        <ArrowRight className="h-4 w-4 text-cream-300 group-hover:text-cognac-500 transition-colors" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                {/* Popular Searches */}
                                <div>
                                    <h3 className="font-serif text-lg text-black flex items-center gap-2 mb-4">
                                        <TrendingUp className="h-4 w-4 text-gold" />
                                        Popular Searches
                                    </h3>
                                    <ul className="space-y-2">
                                        {POPULAR_SEARCHES.map((search, idx) => (
                                            <li key={idx}>
                                                <button
                                                    onClick={() => {
                                                        setQuery(search);
                                                        handleSearch(search);
                                                    }}
                                                    className="w-full text-left px-4 py-3 bg-white border border-cream-100 hover:border-gold transition-colors flex items-center justify-between group"
                                                >
                                                    <span className="text-cream-700 capitalize">{search}</span>
                                                    <ArrowRight className="h-4 w-4 text-cream-300 group-hover:text-gold transition-colors" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                        
                        {/* Search Results */}
                        {results.length > 0 && (
                            <div>
                                <p className="text-sm text-cream-500 mb-4">
                                    {results.length} result{results.length !== 1 ? 's' : ''} found
                                </p>
                                <div className="grid gap-4">
                                    {results.map((result, idx) => (
                                        <Link
                                            key={result.product.id}
                                            href={`/products/${result.product.id}`}
                                            onClick={() => handleProductClick(result.product)}
                                            className={cn(
                                                "flex gap-4 p-4 bg-white border transition-all",
                                                focusedIndex === idx 
                                                    ? "border-gold ring-2 ring-gold/20" 
                                                    : "border-cream-100 hover:border-cognac-300"
                                            )}
                                        >
                                            {/* Product Image */}
                                            <div className="relative w-20 h-20 bg-cream-100 flex-shrink-0">
                                                {result.product.images[0] ? (
                                                    <Image
                                                        src={result.product.images[0]}
                                                        alt={result.product.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="80px"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-cream-300">
                                                        <Search className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-serif text-lg text-black">
                                                    {highlightMatch(result.product.name, debouncedQuery)}
                                                </h4>
                                                <p className="text-sm text-cognac-600 mb-1">
                                                    {highlightMatch(result.product.category, debouncedQuery)}
                                                </p>
                                                <p className="text-sm text-cream-500 line-clamp-1">
                                                    {highlightMatch(result.product.description.slice(0, 100), debouncedQuery)}...
                                                </p>
                                            </div>
                                            
                                            {/* Price */}
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-serif text-lg text-black">
                                                    ${result.product.price}
                                                </p>
                                                {result.product.isNew && (
                                                    <span className="text-xs text-gold uppercase tracking-wider">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Empty State */}
                        {showEmptyState && (
                            <div className="text-center py-12">
                                <Search className="h-12 w-12 text-cream-300 mx-auto mb-4" />
                                <h3 className="font-serif text-xl text-black mb-2">
                                    No results found
                                </h3>
                                <p className="text-cream-500 mb-6 max-w-md mx-auto">
                                    We couldn&apos;t find any boots matching &ldquo;{debouncedQuery}&rdquo;. 
                                    Try adjusting your search or browse our collections.
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <span className="text-xs text-cream-400 uppercase tracking-wider">
                                        Suggestions:
                                    </span>
                                    {['ceremonial', 'winter', 'riding'].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => setQuery(suggestion)}
                                            className="text-cognac-600 hover:text-cognac-800 text-sm underline underline-offset-2"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Close Button */}
                <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute top-6 right-6 p-2 text-cream-500 hover:text-black transition-colors"
                    aria-label="Close search"
                >
                    <X className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
}

export default SmartSearch;
