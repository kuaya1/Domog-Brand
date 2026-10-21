'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { type Product, getLocalizedName, getCategoryLabel } from '@/lib/products';
import { useMessages } from '@/lib/i18n/use-messages';
import { format, formatPrice } from '@/lib/i18n/messages';

interface ProductGridProps {
    products: Product[];
}

/** Collection grid. Re-renders only when the list of product IDs changes. */
function ProductGridComponent({ products }: ProductGridProps) {
    const { locale, t } = useMessages();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => {
                const name = getLocalizedName(product, locale);
                return (
                    <Link
                        key={product.id}
                        href={`/${locale}/products/${product.id}`}
                        className="group block bg-cream border border-gold/10 overflow-hidden hover:border-gold/30 hover:shadow-luxury transition-all duration-500"
                    >
                        <div className="relative aspect-[4/5] bg-cream-sand overflow-hidden">
                            <Image
                                src={product.images[0]}
                                alt={format(t.product.imageAlt, { model: name, number: 1 })}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                priority={index < 4}
                                loading={index < 4 ? 'eager' : 'lazy'}
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                            {product.isNew && (
                                <span className="absolute top-4 right-4 bg-gold text-charcoal-900 font-sans text-xs uppercase tracking-wider px-3 py-1.5">
                                    {t.product.new}
                                </span>
                            )}

                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500" aria-hidden="true">
                                <span className="inline-flex items-center gap-2 text-cream font-sans text-xs uppercase tracking-widest">
                                    <span>{t.product.view}</span>
                                    <ArrowUpRight size={14} />
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-cognac mb-2">
                                {getCategoryLabel(product.category, locale)}
                            </p>
                            <h3 className="font-serif text-xl text-charcoal-900 font-medium mb-3 line-clamp-2 group-hover:text-cognac transition-colors duration-300">
                                {name}
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="font-serif text-2xl text-cognac">{formatPrice(product.price)}</span>
                                <span className="font-sans text-xs text-stone-muted uppercase tracking-wider">USD</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

const ProductGrid = memo(ProductGridComponent, (prev, next) => {
    if (prev.products.length !== next.products.length) return false;
    return prev.products.every((p, i) => p.id === next.products[i].id);
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
