'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-warm-50">
      
      {/* Minimal Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-warm-100">
        
        {/* Subtle Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(/images/hero-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Content - LEFT ALIGNED */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-32">
          
          {/* EST. 1989 Badge */}
          <div className="mb-8">
            <span className="text-xs tracking-[0.2em] uppercase text-warm-600 font-light">Est. 1989</span>
          </div>
          
          {/* BOLD Dramatic Headline */}
          <h1 className="mb-12 max-w-3xl">
            <span className="block text-4xl lg:text-5xl font-serif font-light text-warm-800 tracking-wide leading-tight mb-2">
              Legacy of the
            </span>
            <span className="block text-7xl sm:text-8xl lg:text-9xl font-serif font-black text-crimson-800 tracking-wide leading-none">
              Great Khans
            </span>
          </h1>

          {/* Refined Subheadline */}
          <p className="max-w-xl mb-16 text-lg text-warm-700 font-light leading-relaxed tracking-wide">
            Handcrafted Mongolian boots worn by presidents and champions.
            <span className="block mt-4 text-gold-800 font-medium">35 years of heritage.</span>
          </p>

          {/* Elegant CTA with Gold Border */}
          <div>
            <Link href="/shop">
              <button className="group relative px-12 py-4 text-sm uppercase tracking-[0.2em] font-light border border-gold-700 text-warm-900 bg-transparent transition-all duration-500 overflow-hidden hover:text-warm-50">
                <span className="absolute inset-0 bg-gold-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">Explore Collection</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection - More Breathing Room */}
      <section className="relative z-10 py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header - Dramatic Weight Contrast */}
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-warm-900 tracking-wide mb-6">
              <span className="font-light">Featured</span>{' '}
              <span className="font-bold">Collection</span>
            </h2>
            <p className="text-base text-warm-600 font-light leading-relaxed tracking-wide max-w-2xl mx-auto">
              Each pair is meticulously handcrafted using traditional Mongolian techniques passed down through generations.
            </p>
          </div>

          {/* Product Grid - Distinctive Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-auto">
            {/* Card 1 - Featured Large (spans 2 columns) */}
            <div className="md:col-span-2">
              <ProductCard
                product={products[0]}
                onAddToCart={(product) => {
                  console.log('Added to cart:', product.name);
                }}
              />
            </div>
            
            {/* Cards 2-3 - Normal */}
            <ProductCard
              product={products[1]}
              onAddToCart={(product) => {
                console.log('Added to cart:', product.name);
              }}
            />
            <ProductCard
              product={products[2]}
              onAddToCart={(product) => {
                console.log('Added to cart:', product.name);
              }}
            />
            
            {/* Card 4 - Tall Format (spans 2 rows on desktop) */}
            <div className="lg:row-span-2">
              <ProductCard
                product={products[3]}
                onAddToCart={(product) => {
                  console.log('Added to cart:', product.name);
                }}
              />
            </div>
            
            {/* Cards 5-6 - Normal */}
            <ProductCard
              product={products[4]}
              onAddToCart={(product) => {
                console.log('Added to cart:', product.name);
              }}
            />
            <ProductCard
              product={products[5]}
              onAddToCart={(product) => {
                console.log('Added to cart:', product.name);
              }}
            />
          </div>

          {/* View All Link */}
          <div className="text-center mt-20">
            <Link href="/shop">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Section - Simplified */}
      <section className="relative py-32 px-6 lg:px-8 bg-warm-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-warm-900 tracking-wide mb-8">
            Heritage & Craftsmanship
          </h2>
          
          <p className="text-lg text-warm-700 font-light leading-relaxed tracking-wide mb-8">
            For over three decades, we have upheld the traditions of Mongolian boot-making, 
            creating footwear that embodies the spirit of the steppes and the elegance of timeless design.
          </p>

          <p className="text-base text-warm-600 font-light leading-relaxed tracking-wide mb-12">
            Our boots have graced the feet of world leaders, champions, and those who appreciate 
            the intersection of cultural heritage and refined luxury.
          </p>

          <Link href="/heritage">
            <Button variant="outline" size="md">
              Our Story
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
