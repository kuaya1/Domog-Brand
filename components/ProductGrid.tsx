'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProductGridProps {
    products: Product[];
}

/**
 * OPTIMIZED PRODUCT GRID
 * 
 * Key optimizations:
 * 1. Memoized to prevent unnecessary re-renders when parent state changes
 * 2. Images use proper `sizes` prop for responsive loading
 * 3. First 4 images are priority loaded (above the fold)
 * 4. Proper alt text for accessibility
 */
function ProductGridComponent({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
                <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group block bg-cream border border-gold/10 overflow-hidden hover:border-gold/30 hover:shadow-luxury transition-all duration-500"
                >
                    <div className="relative aspect-[4/5] bg-cream-sand overflow-hidden">
                        <Image
                            src={product.images[0]}
                            alt={`${product.name} - ${product.category} Mongolian boot`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            priority={index < 4}
                            loading={index < 4 ? 'eager' : 'lazy'}
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {product.isNew && (
                            <span className="absolute top-4 right-4 bg-gold text-black font-sans text-xs uppercase tracking-wider px-3 py-1.5">
                                New
                            </span>
                        )}
                        
                        {/* View Details on hover */}
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <span className="inline-flex items-center gap-2 text-cream font-sans text-xs uppercase tracking-widest">
                                <span>View Details</span>
                                <ArrowUpRight size={14} aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="font-sans text-xs uppercase tracking-[0.2em] text-cognac mb-2">
                            {product.category}
                        </p>
                        <h3 className="font-serif text-xl text-black font-medium mb-3 line-clamp-2 group-hover:text-cognac transition-colors duration-300">
                            {product.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                            <span className="font-serif text-2xl text-cognac">${product.price.toLocaleString()}</span>
                            <span className="font-sans text-xs text-stone-muted uppercase tracking-wider">USD</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

// Memoize to prevent re-renders when parent state changes
// Only re-render if the products array actually changes
const ProductGrid = memo(ProductGridComponent, (prevProps, nextProps) => {
    // Custom comparison: only re-render if product IDs changed
    if (prevProps.products.length !== nextProps.products.length) return false;
    return prevProps.products.every((p, i) => p.id === nextProps.products[i].id);
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
