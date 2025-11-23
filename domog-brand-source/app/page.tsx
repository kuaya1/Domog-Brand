'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ProductCard";
import SectionDivider from "@/components/ui/SectionDivider";
import { products } from "@/lib/data";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollIndicator(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-parchment">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src="/images/hero-background.jpg"
            alt="Mongolian Heritage Boots"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-900/40 via-transparent to-gold-900/30 animate-gradient-shift z-0" />
        
        {/* Floating Ornamental Patterns */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-gold-500/20 rounded-full animate-float" 
               style={{ animationDelay: '0s', animationDuration: '4s' }} />
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-crimson-500/20 rounded-lg rotate-45 animate-float" 
               style={{ animationDelay: '1s', animationDuration: '5s' }} />
          <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-gold-500/15 rounded-full animate-float" 
               style={{ animationDelay: '2s', animationDuration: '6s' }} />
          <div className="absolute top-1/3 right-1/4 w-28 h-28 border-2 border-crimson-500/15 rounded-lg rotate-12 animate-float" 
               style={{ animationDelay: '1.5s', animationDuration: '5.5s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          
          {/* Headline - Staggered Animation */}
          <h1 className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-charcoal-900 tracking-tight leading-tight drop-shadow-lg">
              Legacy of the
            </span>
            <span className="block text-6xl sm:text-7xl lg:text-8xl font-display font-black text-transparent bg-gradient-gold bg-clip-text mt-2 drop-shadow-2xl">
              Great Khans
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-3xl mx-auto mb-4 text-xl sm:text-2xl lg:text-3xl font-serif text-charcoal-800 leading-relaxed drop-shadow-md animate-fade-in-up" 
             style={{ animationDelay: '0.4s' }}>
            Handcrafted Mongolian boots worn by presidents and champions
          </p>
          
          <p className="max-w-2xl mx-auto mb-12 text-base sm:text-lg text-charcoal-700 leading-relaxed drop-shadow-sm animate-fade-in-up" 
             style={{ animationDelay: '0.6s' }}>
            <span className="font-semibold text-gold-700">35 years</span> of traditional craftsmanship meets modern luxury. 
            Each pair tells a story of heritage, prestige, and unmatched artistry.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-up" 
               style={{ animationDelay: '0.8s' }}>
            
            {/* Primary Button with Shimmer */}
            <Link href="/shop">
              <Button 
                variant="primary" 
                size="lg"
                className="group relative overflow-hidden shadow-lg hover:shadow-crimson transition-all duration-400 hover:scale-105"
                rightIcon={
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Explore Collection
                {/* Gold Shimmer Effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
              </Button>
            </Link>

            {/* Secondary Button with Glass Morphism */}
            <Link href="/heritage">
              <button className="group relative px-8 py-4 text-lg font-medium text-charcoal-900 bg-white/40 backdrop-blur-md border-2 border-white/60 rounded-crafted shadow-md hover:shadow-lg hover:bg-white/60 hover:border-gold-400/80 hover:scale-105 transition-all duration-400">
                <span className="flex items-center gap-2">
                  Our Heritage
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-charcoal-700 animate-fade-in-up" 
               style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">35 Years of Excellence</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">100% Handcrafted</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span className="font-medium">Worn by World Leaders</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500 ${
            showScrollIndicator ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-sm text-gold-700 font-medium tracking-wide">Scroll to Explore</span>
            <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <SectionDivider variant="ornament" color="gold" />

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center text-charcoal-900 mb-4 animate-fade-in-up">
            Featured Collection
          </h2>
          <p className="text-center text-charcoal-600 mb-12 max-w-2xl mx-auto animate-fade-in-up">
            Discover our most prestigious boots, each a masterpiece of traditional Mongolian craftsmanship
          </p>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={(product) => {
                    console.log('Add to cart:', product.name);
                    // Add to cart logic here
                  }}
                  onQuickView={(product) => {
                    console.log('Quick view:', product.name);
                    // Quick view modal logic here
                  }}
                  onToggleWishlist={(productId) => {
                    console.log('Toggle wishlist:', productId);
                    // Wishlist toggle logic here
                  }}
                />
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="mt-16 text-center">
            <Link href="/shop">
              <Button variant="outline" size="lg">
                View All Products
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold text-charcoal-900">
                35 Years of <span className="text-gold-600">Heritage</span>
              </h2>
              <p className="text-lg text-charcoal-700 leading-relaxed">
                Since 1990, Domog has been crafting the finest Mongolian boots using traditional techniques 
                passed down through generations. Our master artisans dedicate their lives to preserving this 
                ancient craft while embracing modern design sensibilities.
              </p>
              <p className="text-lg text-charcoal-700 leading-relaxed">
                Each pair of boots takes over 40 hours to complete, with every stitch placed by hand. 
                We source only the finest leathers and materials, ensuring that every boot we create 
                is worthy of the legacy we uphold.
              </p>
              <Link href="/heritage">
                <Button variant="secondary" size="lg">
                  Learn Our Story
                </Button>
              </Link>
            </div>
            <div className="relative h-96 lg:h-full min-h-[400px]">
              <Image
                src="/images/heritage-craft.jpg"
                alt="Master craftsman at work"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final Decorative Divider */}
      <SectionDivider variant="wave" color="mixed" />
    </div>
  );
}
