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
      {/* Minimal Card Container */}
      <div className="relative bg-[#FDFCF8] overflow-hidden transition-all duration-500">
        
        {/* Vertical Gold Accent Line - LEFT EDGE */}
        <div 
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 bg-gold-700 transition-all duration-500 z-20 ${
            isHovered ? 'h-full' : 'h-[60%]'
          }`}
        />
        
        {/* Product Image */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-warm-100 cursor-crosshair">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          
          {/* Category Badge - Fade in on hover */}
          <div className={`absolute top-4 left-4 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <span className="px-3 py-1 text-xs uppercase tracking-wider bg-warm-900/80 text-warm-50 backdrop-blur-sm">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4">
          {/* Product Name - More Letter Spacing */}
          <h3 className="font-serif text-base font-light text-warm-900 tracking-widest uppercase">
            {product.name}
          </h3>

          {/* Price - Dramatic Size, Superscript USD */}
          <div className="flex items-start gap-1">
            <span className="text-sm font-thin text-crimson-800 mt-1">$</span>
            <span className="text-4xl font-light text-crimson-800 tracking-tight">
              {product.price.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-warm-600 mt-2">
              USD
            </span>
          </div>

          {/* Description - Larger, More Luxurious Spacing */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isHovered ? 'max-h-28 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-base text-warm-700 leading-loose line-clamp-3">
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

        {/* Enhanced Hover Shadow - 4px lift */}
        <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isHovered ? 'shadow-xl translate-y-[-4px]' : 'shadow-none translate-y-0'
        }`} />
      </div>
    </div>
  );
};

export default ProductCard;
