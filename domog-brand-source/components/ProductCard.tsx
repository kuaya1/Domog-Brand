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
      <div className="relative overflow-hidden rounded-subtle border border-ink/10 bg-pure transition-all duration-500">
        <span
          className={`absolute left-4 top-6 h-24 w-px bg-gradient-to-b from-transparent via-ink/30 to-transparent transition-all duration-500 ${
            isHovered ? 'scale-y-100' : 'scale-y-75'
          }`}
        />

        <div className="relative w-full aspect-[3/4] overflow-hidden bg-silk">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className={`absolute top-5 right-5 transition duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
            <span className="px-3 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-rice bg-ink/80">
              {product.category}
            </span>
          </div>
        </div>

        <div className="space-y-5 px-6 py-7">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-ink/50">
            <span>Domog</span>
            <span className="h-px w-16 bg-ink/10" />
            <span>{product.category}</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-serif text-ink-deep leading-tight">
              {product.name}
            </h3>
            <div className="flex items-end gap-1 text-crimson">
              <span className="text-sm uppercase tracking-[0.35em]">USD</span>
              <span className="text-4xl font-light">{product.price.toLocaleString()}</span>
            </div>
          </div>

          <div
            className={`text-sm leading-7 text-ink/70 transition-all duration-500 ${
              isHovered ? 'max-h-44 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {product.description}
          </div>

          <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.35em] text-ink/40">
            <span>Limited</span>
            <span className="h-px w-10 bg-ink/10" />
            <span>Handmade</span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-3 rounded-full border border-jade/50 px-5 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-jade transition hover:bg-jade hover:text-rice"
            >
              <span className="h-px w-5 bg-jade/40" />
              Add to Cart
            </button>
            <span className="text-xs uppercase tracking-[0.35em] text-ink/40">Est. 1989</span>
          </div>
        </div>

        <div
          className={`absolute inset-0 pointer-events-none transition duration-500 ${
            isHovered ? 'shadow-card translate-y-[-6px]' : 'shadow-none translate-y-0'
          }`}
        />
      </div>
    </div>
  );
};

export default ProductCard;
