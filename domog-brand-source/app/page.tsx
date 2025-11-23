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
    <div className="relative min-h-screen bg-ivory-50">
      
      {/* SIGNATURE HERO - Split Screen Layout */}
      <section className="relative min-h-screen flex items-stretch overflow-hidden bg-warm-100">
        
        {/* LEFT: Image Side */}
        <div className="relative w-full lg:w-1/2 min-h-screen">
          <div 
            className="absolute inset-0"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <Image
              src="/images/hero-background.jpg"
              alt="Mongolian Heritage Boots"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-warm-100/30"></div>
          </div>
          
          {/* Animated gold line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-600 animate-slide-in-left"></div>
        </div>

        {/* RIGHT: Text Side */}
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-32">
          
          {/* Traditional Mongolian pattern watermark */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDAgTDEyMCA1MCBMODAgNTAgWiBNMTAwIDIwMCBMMTIwIDE1MCBMODAgMTUwIFoiIGZpbGw9IiNBODhCNjkiLz48L3N2Zz4=')] bg-repeat"></div>
          
          <div className="relative z-10">
            {/* EST. Date - Artful positioning */}
            <p className="text-xs font-serif text-warm-500 tracking-widest mb-8">
              EST. 1989
            </p>
            
            {/* HUGE Typography */}
            <h1 className="mb-12">
              <span className="block text-2xl sm:text-3xl font-light tracking-[0.3em] text-warm-600 mb-4">
                LEGACY OF THE
              </span>
              <span className="block text-7xl sm:text-8xl lg:text-9xl font-display font-black text-warm-900 tracking-tighter leading-none">
                GREAT
              </span>
              <span className="block text-7xl sm:text-8xl lg:text-9xl font-serif italic font-light text-crimson-700 tracking-tight leading-none mt-2">
                Khans
              </span>
            </h1>

            {/* Body copy - 18px, sophisticated */}
            <p className="text-base text-warm-700 leading-loose max-w-xl mb-4">
              Handcrafted <span className="italic font-serif">Mongolian</span> boots worn by presidents, champions, and those who understand that true luxury lies in heritage—not trends.
            </p>
            
            <p className="text-sm text-warm-600 leading-relaxed max-w-xl mb-12 font-light">
              Thirty-five years of traditional craftsmanship. Every stitch a testament to the steppes. Every pair a legacy.
            </p>

            {/* Large underlined text link CTA */}
            <Link 
              href="/shop"
              className="inline-block group"
            >
              <span className="text-xl font-light text-warm-900 tracking-wide relative">
                Explore Collection
                <span className="absolute bottom-0 left-0 w-full h-px bg-gold-600 transform origin-left transition-transform duration-500 group-hover:scale-x-110"></span>
                <span className="inline-block ml-2 transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
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

          {/* Asymmetric Product Grid - Intentional Irregularity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16">
            {products.slice(0, 6).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isFeatured={index === 2} // Every 3rd card is featured
                index={index}
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

      {/* Heritage Section - Full-bleed asymmetric */}
      <section className="relative py-48 bg-terracotta-50 leather-texture overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT: Full-bleed image */}
            <div className="relative h-[600px] lg:-ml-32">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-terracotta-50/50"></div>
              <Image
                src="/images/hero-background.jpg"
                alt="Heritage Craftsmanship"
                fill
                className="object-cover"
              />
              {/* Overlapping decorative element */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-64 h-1 bg-gold-600"></div>
            </div>

            {/* RIGHT: Text with overlap */}
            <div className="relative px-6 lg:px-12 lg:-ml-16 z-10">
              {/* Background card for text */}
              <div className="bg-ivory-50 p-12 shadow-[0_8px_30px_rgba(212,117,108,0.2)]">
                
                <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-6 font-light">
                  — Since 1989 —
                </p>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-warm-900 tracking-tight mb-8 leading-tight">
                  Heritage <span className="text-gold-700">&</span><br />
                  <span className="font-serif italic font-light text-terracotta-600">Craftsmanship</span>
                </h2>
                
                <p className="text-base text-warm-700 leading-loose mb-6">
                  For over three decades, we have upheld the traditions of Mongolian boot-making—creating footwear that embodies the spirit of the steppes, the resilience of nomadic heritage, and the elegance of timeless design.
                </p>

                <p className="text-base text-warm-600 font-light leading-loose mb-8">
                  Our boots have graced the feet of <span className="font-medium text-warm-800">world leaders</span>, <span className="font-medium text-warm-800">national champions</span>, and those who understand that true luxury lies not in logos—but in legacy.
                </p>

                <Link 
                  href="/heritage"
                  className="inline-block group"
                >
                  <span className="text-base font-light text-warm-900 tracking-wide relative border-b border-warm-900 pb-1 hover:border-sky-600 hover:text-sky-700 transition-colors duration-300">
                    Discover Our Story
                    <span className="inline-block ml-2 transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
