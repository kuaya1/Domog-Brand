'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import Button from './ui/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView?.(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleWishlist?.(product.id);
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="relative bg-gradient-parchment rounded-lg overflow-hidden border border-warmGray-200 shadow-md hover:shadow-xl transition-all duration-400 ease-smooth hover:-translate-y-1">
        
        {/* Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold z-10" />

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-300 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <svg
            className={`w-5 h-5 transition-colors duration-300 ${
              isInWishlist ? 'fill-crimson-600 text-crimson-600' : 'fill-none text-charcoal-600'
            }`}
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-warmGray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-400 ease-smooth ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-charcoal-900/10 transition-opacity duration-400 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-gold-500 text-charcoal-900 rounded-subtle shadow-sm">
              {product.category}
            </span>
          </div>

          {/* Quick View Button - Slides up on hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-400 ease-smooth ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            <div className="bg-white/90 backdrop-blur-md p-3">
              <button
                onClick={handleQuickView}
                className="w-full py-2 text-sm font-medium text-charcoal-800 hover:text-crimson-600 transition-colors duration-300 tracking-wide"
              >
                Quick View
              </button>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-3">
          {/* Product Name */}
          <h3 className="font-serif text-xl text-charcoal-900 leading-snug tracking-tight line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-charcoal-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>

          {/* Price & Stock */}
          <div className="flex items-baseline justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-crimson-600 tracking-tight">
                ${product.price}
              </span>
              <span className="text-sm text-gold-600 font-medium tracking-wide">USD</span>
            </div>
            {product.inStock && (
              <span className="text-xs text-green-600 font-medium tracking-wide">In Stock</span>
            )}
          </div>

          {/* Sizes Preview */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="pt-2">
              <p className="text-xs text-charcoal-500 mb-2 tracking-wide">Available Sizes:</p>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.slice(0, 4).map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 text-xs font-medium text-charcoal-700 bg-warmGray-100 border border-warmGray-300 rounded-subtle"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 4 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-charcoal-500">
                    +{product.sizes.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Add to Cart Button - Transforms on hover */}
          <div className="pt-4">
            <Button
              variant={isHovered ? 'primary' : 'outline'}
              size="md"
              fullWidth
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="transition-all duration-400"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>

        {/* Subtle Gradient Border Effect */}
        <div className="absolute inset-0 rounded-lg pointer-events-none">
          <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-br from-gold-200/30 via-transparent to-crimson-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
