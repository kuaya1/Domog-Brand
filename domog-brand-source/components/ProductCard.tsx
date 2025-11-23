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
      {/* Crafted Card Container */}
      <div className="relative bg-warm-50 overflow-hidden transition-all duration-500 border border-warm-200">
        
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-600 opacity-30"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-600 opacity-30"></div>
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-600 transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-600 transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-0'}`}></div>
        
        {/* Subtle Top Accent - Only visible on hover */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-gold-700 z-10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Product Image */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-warm-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-103' : 'scale-100'
            }`}
          />
          
          {/* Category Badge - Fade in on hover */}
          <div className={`absolute top-4 left-4 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <span className="px-3 py-1 text-xs uppercase tracking-wider bg-warm-900/80 text-warm-50 backdrop-blur-sm">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info with Character */}
        <div className="p-6 space-y-3">
          {/* Product Name - Mix fonts for personality */}
          <h3 className="text-lg text-warm-900 tracking-wide">
            <span className="font-display font-medium">{product.name.split(' ')[0]}</span>
            {product.name.split(' ').length > 1 && (
              <span className="font-serif italic font-light"> {product.name.split(' ').slice(1).join(' ')}</span>
            )}
          </h3>

          {/* Price with Crafted Detail */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-crimson-800 tracking-wide">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-xs uppercase tracking-widest text-warm-500">
                USD
              </span>
            </div>
            {/* Small decorative accent */}
            <div className="w-px h-4 bg-gold-400"></div>
            <span className="text-xs italic text-gold-700 font-serif">Handcrafted</span>
          </div>

          {/* Description - Only show on hover */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-sm text-warm-700 leading-relaxed line-clamp-3">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Button - Fade in on hover */}
          <div className={`transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <Button
              variant="outline"
              size="md"
              onClick={handleAddToCart}
              className="w-full"
            >
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Hover Shadow */}
        <div className={`absolute inset-0 pointer-events-none transition-shadow duration-500 ${
          isHovered ? 'shadow-lg' : 'shadow-none'
        }`} />
      </div>
    </div>
  );
};

export default ProductCard;
