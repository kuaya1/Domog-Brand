'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.isNew && (
                            <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                                NEW ARRIVAL
                            </span>
                        )}
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-amber-700 font-medium mb-1">
                            {product.category}
                        </p>
                        <h3 className="font-serif text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-800 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-gray-900 font-bold">${product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
