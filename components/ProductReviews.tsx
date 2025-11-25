'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, Check, Camera, ChevronDown, User, Calendar, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface ReviewImage {
    url: string;
    alt: string;
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    title: string;
    content: string;
    date: string;
    isVerified: boolean;
    size: string;
    fit: 'small' | 'true-to-size' | 'large';
    helpful: number;
    images?: ReviewImage[];
    response?: {
        author: string;
        content: string;
        date: string;
    };
}

interface ProductReviewsProps {
    productId: string;
    reviews: Review[];
    className?: string;
}

type SortOption = 'newest' | 'highest' | 'lowest' | 'helpful';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1' | 'photos';

// ============================================================================
// Mock Data Generator
// ============================================================================

export function generateMockReviews(productId: string): Review[] {
    const reviews: Review[] = [
        {
            id: `${productId}-r1`,
            author: 'Alexandra M.',
            rating: 5,
            title: 'Exceptional craftsmanship',
            content: 'These boots exceeded all my expectations. The leather quality is outstanding, and you can see the attention to detail in every stitch. I\'ve worn them to several events and always receive compliments. The break-in period was minimal, which surprised me for boots of this quality. Worth every penny.',
            date: '2024-01-15',
            isVerified: true,
            size: 'EU 39',
            fit: 'true-to-size',
            helpful: 24,
            images: [
                { url: '/images/boots/heritage-brown-1.jpg', alt: 'Customer photo of boots' },
            ],
        },
        {
            id: `${productId}-r2`,
            author: 'Thomas K.',
            rating: 5,
            title: 'A true investment piece',
            content: 'I researched extensively before making this purchase, and I\'m so glad I chose Domog. The Mongolian heritage shows in the quality and durability. These boots feel like they\'ll last decades with proper care. The fit was perfect—I went with my usual size.',
            date: '2024-01-10',
            isVerified: true,
            size: 'EU 43',
            fit: 'true-to-size',
            helpful: 18,
            response: {
                author: 'Domog Team',
                content: 'Thank you for your kind words, Thomas. We\'re honored to be part of your wardrobe. With proper care, your boots will indeed last for generations.',
                date: '2024-01-11',
            },
        },
        {
            id: `${productId}-r3`,
            author: 'Marie-Claire B.',
            rating: 4,
            title: 'Beautiful but runs slightly large',
            content: 'Gorgeous boots with impeccable finishing. The leather has a beautiful depth of color. My only note is that they run slightly large—I\'d recommend sizing down half a size if you\'re between sizes. The insole is remarkably comfortable.',
            date: '2024-01-05',
            isVerified: true,
            size: 'EU 38',
            fit: 'large',
            helpful: 31,
        },
        {
            id: `${productId}-r4`,
            author: 'James W.',
            rating: 5,
            title: 'Museum-quality artistry',
            content: 'As someone who appreciates traditional craftsmanship, I\'m in awe of these boots. The construction methods honor centuries of Mongolian leather working tradition while meeting modern standards. The unboxing experience was equally impressive—arrived in a beautiful presentation box.',
            date: '2023-12-28',
            isVerified: true,
            size: 'EU 44',
            fit: 'true-to-size',
            helpful: 15,
            images: [
                { url: '/images/boots/heritage-brown-2.jpg', alt: 'Detail of stitching' },
            ],
        },
        {
            id: `${productId}-r5`,
            author: 'Sarah L.',
            rating: 5,
            title: 'Perfect gift for my husband',
            content: 'Bought these as an anniversary gift. My husband hasn\'t taken them off since! The quality is evident, and he says they\'re the most comfortable dress boots he\'s ever owned. The gift wrapping service was excellent.',
            date: '2023-12-20',
            isVerified: true,
            size: 'EU 42',
            fit: 'true-to-size',
            helpful: 12,
        },
    ];
    
    return reviews;
}

// ============================================================================
// Helper Components
// ============================================================================

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };
    
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={cn(
                        sizeClasses[size],
                        star <= rating
                            ? 'text-gold fill-gold'
                            : 'text-cream-300'
                    )}
                />
            ))}
        </div>
    );
}

function FitIndicator({ fit }: { fit: Review['fit'] }) {
    return (
        <div className="flex items-center gap-2 text-xs text-cream-500">
            <div className="flex items-center gap-1 bg-cream-100 px-2 py-1 rounded-full">
                <div className="flex">
                    {['small', 'true-to-size', 'large'].map((f, i) => (
                        <div
                            key={f}
                            className={cn(
                                'w-2 h-2 rounded-full mx-0.5',
                                f === fit ? 'bg-cognac-500' : 'bg-cream-300'
                            )}
                        />
                    ))}
                </div>
                <span className="capitalize ml-1">
                    {fit === 'true-to-size' ? 'True to size' : fit === 'small' ? 'Runs small' : 'Runs large'}
                </span>
            </div>
        </div>
    );
}

// ============================================================================
// Main Component
// ============================================================================

export function ProductReviews({ productId, reviews, className }: ProductReviewsProps) {
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [filterBy, setFilterBy] = useState<FilterOption>('all');
    const [showAll, setShowAll] = useState(false);
    const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());
    const [expandedImages, setExpandedImages] = useState<ReviewImage | null>(null);
    
    // Calculate statistics
    const stats = useMemo(() => {
        if (reviews.length === 0) {
            return { average: 0, total: 0, distribution: {}, fitSummary: {} };
        }
        
        const total = reviews.length;
        const average = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
        
        const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        const fitSummary: Record<string, number> = { small: 0, 'true-to-size': 0, large: 0 };
        
        reviews.forEach((r) => {
            distribution[r.rating]++;
            fitSummary[r.fit]++;
        });
        
        return { average, total, distribution, fitSummary };
    }, [reviews]);
    
    // Filter and sort reviews
    const filteredReviews = useMemo(() => {
        let result = [...reviews];
        
        // Apply filter
        if (filterBy !== 'all') {
            if (filterBy === 'photos') {
                result = result.filter((r) => r.images && r.images.length > 0);
            } else {
                result = result.filter((r) => r.rating === parseInt(filterBy));
            }
        }
        
        // Apply sort
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case 'highest':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowest':
                result.sort((a, b) => a.rating - b.rating);
                break;
            case 'helpful':
                result.sort((a, b) => b.helpful - a.helpful);
                break;
        }
        
        return result;
    }, [reviews, sortBy, filterBy]);
    
    const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 3);
    
    const handleHelpful = (reviewId: string) => {
        setHelpfulClicked((prev) => new Set(prev).add(reviewId));
    };
    
    if (reviews.length === 0) {
        return (
            <section className={cn('py-12', className)}>
                <h2 className="font-serif text-2xl text-black mb-4">Customer Reviews</h2>
                <p className="text-cream-500">No reviews yet. Be the first to share your experience.</p>
            </section>
        );
    }
    
    return (
        <section className={cn('py-12', className)}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                {/* Overall Rating */}
                <div>
                    <h2 className="font-serif text-2xl text-black mb-4">Customer Reviews</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <p className="font-serif text-5xl text-black">{stats.average.toFixed(1)}</p>
                            <StarRating rating={Math.round(stats.average)} size="md" />
                            <p className="text-sm text-cream-500 mt-1">
                                Based on {stats.total} review{stats.total !== 1 ? 's' : ''}
                            </p>
                        </div>
                        
                        {/* Rating Distribution */}
                        <div className="flex-1 max-w-xs space-y-1">
                            {[5, 4, 3, 2, 1].map((rating) => {
                                const count = stats.distribution[rating] || 0;
                                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                                
                                return (
                                    <button
                                        key={rating}
                                        onClick={() => setFilterBy(filterBy === rating.toString() ? 'all' : rating.toString() as FilterOption)}
                                        className="flex items-center gap-2 w-full group"
                                    >
                                        <span className="text-xs text-cream-500 w-3">{rating}</span>
                                        <Star className="h-3 w-3 text-gold fill-gold" />
                                        <div className="flex-1 h-2 bg-cream-100 overflow-hidden">
                                            <div
                                                className="h-full bg-gold transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-cream-400 w-8">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                
                {/* Fit Summary */}
                <div className="bg-cream-100 p-4 md:min-w-[200px]">
                    <h3 className="text-sm font-medium text-black mb-3">Size & Fit</h3>
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-cream-500">Runs small</span>
                        <span className="text-xs text-cream-500">True to size</span>
                        <span className="text-xs text-cream-500">Runs large</span>
                    </div>
                    <div className="flex h-2 bg-cream-200 overflow-hidden">
                        {(['small', 'true-to-size', 'large'] as const).map((fit) => {
                            const count = stats.fitSummary[fit] || 0;
                            const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                            
                            return (
                                <div
                                    key={fit}
                                    className={cn(
                                        'h-full transition-all',
                                        fit === 'true-to-size' ? 'bg-cognac-500' : 'bg-cognac-300'
                                    )}
                                    style={{ width: `${percentage}%` }}
                                />
                            );
                        })}
                    </div>
                    <p className="text-xs text-cream-500 mt-2 text-center">
                        {Math.round(((stats.fitSummary['true-to-size'] || 0) / stats.total) * 100)}% say true to size
                    </p>
                </div>
            </div>
            
            {/* Filters & Sort */}
            <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-cream-200">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilterBy('all')}
                        className={cn(
                            "px-3 py-1 text-xs border transition-colors",
                            filterBy === 'all'
                                ? "bg-black text-white border-black"
                                : "bg-white text-cream-600 border-cream-200 hover:border-black"
                        )}
                    >
                        All Reviews
                    </button>
                    <button
                        onClick={() => setFilterBy('photos')}
                        className={cn(
                            "px-3 py-1 text-xs border transition-colors flex items-center gap-1",
                            filterBy === 'photos'
                                ? "bg-black text-white border-black"
                                : "bg-white text-cream-600 border-cream-200 hover:border-black"
                        )}
                    >
                        <Camera className="h-3 w-3" />
                        With Photos
                    </button>
                </div>
                
                {/* Sort Dropdown */}
                <div className="ml-auto relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="appearance-none bg-white border border-cream-200 px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                        <option value="newest">Newest First</option>
                        <option value="highest">Highest Rated</option>
                        <option value="lowest">Lowest Rated</option>
                        <option value="helpful">Most Helpful</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-cream-400 pointer-events-none" />
                </div>
            </div>
            
            {/* Reviews List */}
            <div className="space-y-6">
                {displayedReviews.map((review) => (
                    <article key={review.id} className="border-b border-cream-100 pb-6">
                        {/* Review Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-cream-200 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-cream-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-black">{review.author}</span>
                                        {review.isVerified && (
                                            <span className="flex items-center gap-1 text-xs text-cognac-600 bg-cognac-50 px-2 py-0.5 rounded-full">
                                                <Check className="h-3 w-3" />
                                                Verified Purchase
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <StarRating rating={review.rating} />
                                        <span className="text-xs text-cream-400 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(review.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Size & Fit */}
                            <div className="text-right text-xs text-cream-500">
                                <p>Size: {review.size}</p>
                                <FitIndicator fit={review.fit} />
                            </div>
                        </div>
                        
                        {/* Review Content */}
                        <div className="ml-13">
                            <h3 className="font-medium text-black mb-2">{review.title}</h3>
                            <p className="text-cream-600 text-sm leading-relaxed mb-4">
                                {review.content}
                            </p>
                            
                            {/* Review Images */}
                            {review.images && review.images.length > 0 && (
                                <div className="flex gap-2 mb-4">
                                    {review.images.map((image, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setExpandedImages(image)}
                                            className="relative w-20 h-20 bg-cream-100 overflow-hidden hover:ring-2 hover:ring-gold transition-all"
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.alt}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                            
                            {/* Brand Response */}
                            {review.response && (
                                <div className="bg-cream-50 border-l-2 border-gold p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="h-4 w-4 text-gold" />
                                        <span className="text-sm font-medium text-black">
                                            {review.response.author}
                                        </span>
                                    </div>
                                    <p className="text-sm text-cream-600">{review.response.content}</p>
                                </div>
                            )}
                            
                            {/* Helpful Button */}
                            <button
                                onClick={() => handleHelpful(review.id)}
                                disabled={helpfulClicked.has(review.id)}
                                className={cn(
                                    "flex items-center gap-2 text-xs transition-colors",
                                    helpfulClicked.has(review.id)
                                        ? "text-cognac-600"
                                        : "text-cream-500 hover:text-black"
                                )}
                            >
                                <ThumbsUp className={cn(
                                    "h-4 w-4",
                                    helpfulClicked.has(review.id) && "fill-current"
                                )} />
                                Helpful ({helpfulClicked.has(review.id) ? review.helpful + 1 : review.helpful})
                            </button>
                        </div>
                    </article>
                ))}
            </div>
            
            {/* Show More Button */}
            {filteredReviews.length > 3 && !showAll && (
                <button
                    onClick={() => setShowAll(true)}
                    className="w-full mt-6 py-3 border border-cream-200 text-sm font-medium text-cream-600 hover:border-black hover:text-black transition-colors"
                >
                    Show All {filteredReviews.length} Reviews
                </button>
            )}
            
            {/* Image Lightbox */}
            {expandedImages && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setExpandedImages(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 transition-colors"
                        aria-label="Close"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="relative max-w-3xl max-h-[80vh] w-full aspect-square">
                        <Image
                            src={expandedImages.url}
                            alt={expandedImages.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 80vw"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProductReviews;
