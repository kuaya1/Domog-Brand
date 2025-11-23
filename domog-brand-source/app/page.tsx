'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
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
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src="/images/hero-background.jpg"
            alt="Mongolian Heritage Boots"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32 text-center">
          
          {/* Bold, Dramatic Headline with Character */}
          <h1 className="mb-12">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-serif font-extralight text-warm-600 tracking-widest leading-tight mb-2">
              LEGACY OF THE
            </span>
            <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-black text-warm-900 tracking-tight leading-none mt-4">
              Great <span className="italic font-serif font-light text-crimson-700">Khans</span>
            </span>
          </h1>

          {/* Warm, Personal Subheadline */}
          <p className="max-w-2xl mx-auto mb-8 text-xl sm:text-2xl text-warm-800 font-serif leading-relaxed">
            Handcrafted <span className="italic">Mongolian</span> boots worn by presidents <span className="text-gold-700">&</span> champions.
          </p>
          <p className="max-w-xl mx-auto mb-16 text-sm uppercase tracking-widest text-gold-800 font-light">
            —  35 Years of Heritage  —
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
          
          {/* Section Header with Personality */}
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-widest text-gold-700 mb-4 font-light">
              — Hand-Selected —
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-warm-900 tracking-tight mb-6">
              Featured <span className="font-serif italic font-light text-crimson-700">Collection</span>
            </h2>
            <p className="text-lg text-warm-600 font-serif italic leading-relaxed max-w-2xl mx-auto">
              Each pair meticulously handcrafted using traditional Mongolian techniques,<br className="hidden sm:block" /> passed down through generations.
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

      {/* Heritage Section - With Soul */}
      <section className="relative py-32 px-6 lg:px-8 bg-warm-100">
        <div className="max-w-4xl mx-auto">
          
          {/* Decorative Accent Line */}
          <div className="flex items-center justify-center mb-12">
            <div className="w-16 h-px bg-gold-600"></div>
            <div className="mx-4 w-1 h-1 bg-gold-600 rounded-full"></div>
            <div className="w-16 h-px bg-gold-600"></div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-warm-900 tracking-tight mb-8">
              Heritage <span className="text-gold-700">&</span> <span className="font-serif italic font-light">Craftsmanship</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-warm-700 font-serif italic leading-relaxed mb-8 max-w-3xl mx-auto">
              "For over three decades, we have upheld the traditions of Mongolian boot-making, 
              creating footwear that embodies the spirit of the steppes."
            </p>

            <p className="text-base text-warm-600 font-light leading-loose tracking-wide mb-12 max-w-2xl mx-auto">
              Our boots have graced the feet of <span className="font-medium text-warm-800">world leaders</span>, <span className="font-medium text-warm-800">champions</span>, and those who appreciate 
              the intersection of cultural heritage and refined luxury.
            </p>

            <Link href="/heritage">
              <Button variant="outline" size="md">
                Discover Our Story
              </Button>
            </Link>
          </div>

          {/* Bottom Decorative Accent */}
          <div className="flex items-center justify-center mt-12">
            <div className="w-8 h-px bg-gold-600"></div>
            <div className="mx-3 w-1 h-1 bg-gold-600 rounded-full"></div>
            <div className="w-24 h-px bg-gold-600"></div>
            <div className="mx-3 w-1 h-1 bg-gold-600 rounded-full"></div>
            <div className="w-8 h-px bg-gold-600"></div>
          </div>
        </div>
      </section>

    </div>
  );
}
