'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import Button from './ui/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  isFeatured?: boolean;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isFeatured = false,
  index = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
  };

  // Alternate card styles for asymmetry
  const isEven = index % 2 === 0;
  const cardStyle = isFeatured ? 'featured' : isEven ? 'standard' : 'alternate';

  return (
    <div
      className={`group relative cursor-pointer ${isFeatured ? 'lg:col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Distinctive Card Container */}
      <div className={`relative overflow-hidden transition-all duration-500 ${
        isFeatured 
          ? 'bg-terracotta-50 shadow-lg' 
          : 'bg-ivory-50 border border-warm-200'
      }`}>
        
        {/* Gold accent line on left edge (not border) */}
        <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gold-600 z-10 transition-all duration-500 ${
          isHovered ? 'opacity-100 w-1' : 'opacity-40'
        }`}></div>
        
        {/* Gold triangle corner accent */}
        <div 
          className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-gold-500/20 border-l-[40px] border-l-transparent"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
        ></div>
        
        {/* Category tag - positioned top-right */}
        <div className="absolute top-4 right-4 z-20">
          <span className="text-[10px] uppercase tracking-widest font-light text-warm-700 bg-ivory-50/80 backdrop-blur-sm px-3 py-1">
            {product.category}
          </span>
        </div>
        
        {/* Product Image with overlapping text */}
        <div className={`relative w-full overflow-hidden bg-warm-100 ${
          isFeatured ? 'aspect-[16/9]' : 'aspect-[3/4]'
        }`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes={isFeatured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            style={{ transform: `translateY(${isHovered ? '-2px' : '0'})` }}
          />
          
          {/* Dark gradient overlay at bottom for text overlap */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-900/90 via-warm-900/50 to-transparent"></div>
          
          {/* Product name OVERLAPS image */}
          <div className="absolute bottom-4 left-6 right-6 z-10">
            <h3 className="text-ivory-50 leading-tight">
              <span className={`block font-display font-semibold tracking-tight ${
                isFeatured ? 'text-3xl' : 'text-xl'
              }`}>
                {product.name.split(' ')[0]}
              </span>
              {product.name.split(' ').length > 1 && (
                <span className={`block font-serif italic font-light ${
                  isFeatured ? 'text-2xl' : 'text-lg'
                } text-ivory-100`}>
                  {product.name.split(' ').slice(1).join(' ')}
                </span>
              )}
            </h3>
          </div>
        </div>

        {/* Product Info - Distinctive Typography */}
        <div className="p-8 space-y-4 relative">
          
          {/* Price - LARGE serif numerals like hand-lettering */}
          <div className="flex items-end gap-3">
            <span className={`font-serif font-light tracking-tight ${
              isFeatured ? 'text-6xl' : 'text-5xl'
            } text-crimson-700 leading-none`}>
              ${product.price.toLocaleString()}
            </span>
            <span className="text-xs font-light tracking-widest text-warm-500 mb-2">
              USD
            </span>
          </div>

          {/* Description with personality & em-dashes */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-base text-warm-700 leading-loose font-light">
              {product.description.substring(0, 100)}—crafted with traditional techniques passed through generations.
            </p>
          </div>

          {/* Add to Cart - Text link style */}
          <div className={`transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={handleAddToCart}
              className="text-sm uppercase tracking-widest text-warm-900 border-b border-warm-900 hover:border-gold-600 hover:text-gold-700 transition-colors duration-300 pb-1"
            >
              Add to Collection
            </button>
          </div>
        </div>

        {/* Warm-toned shadow on hover */}
        <div className={`absolute inset-0 pointer-events-none transition-shadow duration-500 ${
          isHovered ? 'shadow-[0_8px_30px_rgba(212,117,108,0.15)]' : 'shadow-none'
        }`} />
      </div>
    </div>
  );
};

export default ProductCard;
