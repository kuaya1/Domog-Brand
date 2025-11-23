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
      <section className="relative min-h-screen flex items-center justify-center">
        
        {/* Subtle Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img
            src="/images/hero-background.jpg"
            alt="Mongolian Heritage Boots"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32 text-center">
          
          {/* Large, Clean Headline */}
          <h1 className="mb-12 space-y-4">
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-warm-900 tracking-wide leading-tight">
              Legacy of the
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-crimson-800 tracking-wide leading-tight">
              Great Khans
            </span>
          </h1>

          {/* Refined Subheadline */}
          <p className="max-w-2xl mx-auto mb-16 text-lg sm:text-xl text-warm-700 font-light leading-relaxed tracking-wide">
            Handcrafted Mongolian boots worn by presidents and champions.
            <span className="block mt-4 text-gold-800">35 years of heritage.</span>
          </p>

          {/* Single CTA */}
          <div className="flex justify-center">
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection - More Breathing Room */}
      <section className="relative z-10 py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-warm-900 tracking-wide mb-6">
              Featured Collection
            </h2>
            <p className="text-base text-warm-600 font-light tracking-wide max-w-2xl mx-auto">
              Each pair is meticulously handcrafted using traditional Mongolian techniques passed down through generations.
            </p>
          </div>

          {/* Product Grid - Minimal, Spacious */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(product) => {
                  console.log('Added to cart:', product.name);
                }}
              />
            ))}
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
