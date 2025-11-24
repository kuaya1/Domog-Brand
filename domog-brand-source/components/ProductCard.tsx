'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import Button from './ui/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
  };

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden luxury-border bg-cream transition-all duration-500 hover:border-gold">
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-black-rich">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className={`absolute top-6 right-6 transition duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
            <span className="px-4 py-2 text-xs uppercase tracking-wider text-cream bg-black/80 backdrop-blur-sm">
              {product.category}
            </span>
          </div>
          <div className="absolute top-6 left-6">
            <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider text-gold bg-black/60 backdrop-blur-sm">
              Est. 1989
            </span>
          </div>
        </div>

        <div className="space-y-6 px-8 py-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-serif font-semibold text-black leading-tight">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-semibold text-cognac">${product.price.toLocaleString()}</span>
              <span className="text-sm uppercase tracking-wider text-gray-warm">USD</span>
            </div>
          </div>

          <div
            className={`text-sm leading-relaxed text-gray-warm transition-all duration-500 ${
              isHovered ? 'max-h-44 opacity-100' : 'max-h-20 opacity-70'
            }`}
          >
            {product.description}
          </div>

          <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-cognac">
            <span>Limited Edition</span>
            <span className="h-px flex-1 bg-gold/30" />
            <span>Handcrafted</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full border-2 border-gold px-6 py-4 text-sm uppercase tracking-wide text-gold transition-all duration-400 hover:bg-gold hover:text-black"
          >
            Add to Collection
          </button>
        </div>

        <div
          className={`absolute inset-0 pointer-events-none transition duration-500 ${
            isHovered ? 'shadow-luxury' : 'shadow-none'
          }`}
        />
      </div>
    </div>
  );
};

export default ProductCard;
