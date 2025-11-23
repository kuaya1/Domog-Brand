"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative h-96 w-full overflow-hidden bg-gray-50">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Quick Action Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <button className="w-full bg-white text-text hover:bg-primary hover:text-white py-3 font-medium shadow-lg transition-colors flex items-center justify-center space-x-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="text-xs text-secondary font-medium uppercase tracking-wider mb-2">
                    {product.category}
                </div>
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-xl font-serif font-bold text-text mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
                    <span className="text-lg font-bold text-primary">
                        ${product.price}
                    </span>
                    <Link
                        href={`/products/${product.id}`}
                        className="text-sm text-gray-500 hover:text-text underline decoration-gray-300 underline-offset-4 transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
