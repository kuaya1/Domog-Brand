'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/products';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <Link
            href={`/products/${product.id}`}
            className="group block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <article className="bg-cream border border-gold/10 transition-all duration-500 hover:border-gold/30 hover:shadow-luxury overflow-hidden">
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-cream-sand overflow-hidden">
                    {imageError ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-cream-sand">
                            <span className="font-sans text-sm text-stone-muted">Image unavailable</span>
                        </div>
                    ) : (
                        <Image
                            src={product.images[0]}
                            alt={`${product.name} - ${product.category} Mongolian boot by Domog`}
                            fill
                            priority={priority}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={`object-cover object-center transition-all duration-700 ${
                                isHovered ? 'scale-105' : 'scale-100'
                            }`}
                            onError={() => setImageError(true)}
                        />
                    )}

                    {/* Overlay on hover */}
                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`} />

                    {/* Category Badge */}
                    <div className={`absolute top-6 left-6 transition-all duration-500 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}>
                        <span className="inline-block px-4 py-2 bg-black/80 backdrop-blur-sm text-gold font-sans text-xs uppercase tracking-widest">
                            {product.category}
                        </span>
                    </div>

                    {/* New Badge */}
                    {product.isNew && (
                        <div className="absolute top-6 right-6">
                            <span className="inline-block px-3 py-1.5 bg-gold text-black font-sans text-xs uppercase tracking-wider">
                                New
                            </span>
                        </div>
                    )}

                    {/* View Details - appears on hover */}
                    <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                        <span className="inline-flex items-center gap-2 text-cream font-sans text-sm uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                            <span>View Details</span>
                            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                    {/* Product Name */}
                    <h3 className="font-serif text-xl lg:text-2xl text-black font-medium mb-3 group-hover:text-cognac transition-colors duration-300">
                        {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl lg:text-3xl text-cognac">
                            ${product.price.toLocaleString()}
                        </span>
                        <span className="font-sans text-xs text-stone-muted uppercase tracking-wider">
                            USD
                        </span>
                    </div>

                    {/* Stock Status */}
                    {product.inStock === false && (
                        <p className="mt-3 font-sans text-xs text-burgundy uppercase tracking-wider">
                            Currently Unavailable
                        </p>
                    )}
                </div>
            </article>
        </Link>
    );
}
