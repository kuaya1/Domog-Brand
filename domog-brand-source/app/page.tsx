'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProducts = products.slice(0, 6);

  return (
    <main className="relative bg-cream">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 0.6)), url('/images/hero-background.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          />
        </div>

        <div className="relative z-10 flex min-h-screen items-center">
          <div className="max-w-7xl mx-auto px-6 py-24 lg:px-12">
            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-widest text-gold mb-8">
                Est. 1989 — Mongolian Heritage
              </p>

              <h1 className="text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-cream leading-none mb-8">
                Legacy of the Great Khans
              </h1>

              <p className="text-xl lg:text-2xl text-cream/90 leading-relaxed max-w-2xl mb-12">
                Handcrafted Mongolian boots worn by presidents and champions. 35 years of refined artistry meets timeless elegance.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 bg-gold px-8 py-4 text-sm uppercase tracking-wide text-black transition-all duration-400 hover:bg-gold-light"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/heritage"
                  className="inline-flex items-center gap-3 border border-cream/40 px-8 py-4 text-sm uppercase tracking-wide text-cream transition-all duration-400 hover:border-gold hover:text-gold"
                >
                  Our Heritage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-12 bg-cream-sand">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-cognac mb-4">
              Featured Collection
            </p>
            <h2 className="text-5xl lg:text-6xl font-serif font-semibold text-black mb-6">
              Handcrafted Excellence
            </h2>
            <p className="text-lg text-gray-warm max-w-2xl mx-auto leading-relaxed">
              Each pair embodies 35 years of refined Mongolian craftsmanship, merging ancestral techniques with contemporary elegance.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(item) => {
                  console.log('Added to cart:', item.name);
                }}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 border border-cognac px-8 py-4 text-sm uppercase tracking-wide text-cognac transition-all duration-400 hover:border-gold hover:text-gold"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-12 bg-cream">
        <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-widest text-cognac">
              Heritage & Craftsmanship
            </p>
            <h3 className="text-4xl lg:text-5xl font-serif font-semibold text-black leading-tight">
              Where Ancient Techniques Meet Timeless Design
            </h3>
            <p className="text-lg text-gray-warm leading-relaxed">
              For over three decades, we have upheld the traditions of Mongolian boot-making. Each pair is meticulously handcrafted using time-honored methods passed down through generations, creating footwear that embodies both cultural heritage and refined luxury.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-sm uppercase tracking-wider text-cognac mb-2">Premium Leather</p>
                <p className="text-sm text-gray-warm">Hand-selected hides</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-cognac mb-2">Gold Accents</p>
                <p className="text-sm text-gray-warm">24k gold thread</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-cognac mb-2">Master Artisans</p>
                <p className="text-sm text-gray-warm">35+ years experience</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-cognac mb-2">Limited Edition</p>
                <p className="text-sm text-gray-warm">Numbered pairs</p>
              </div>
            </div>
          </div>

          <div className="relative luxury-border p-10 lg:p-12 bg-cream-sand">
            <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-cognac mb-8">
              <span>Master Artisan</span>
              <span className="h-px flex-1 bg-gold/30" />
              <span>Collection 35</span>
            </div>
            <blockquote className="text-2xl font-serif text-black leading-relaxed mb-8">
              "Each pair tells a story of heritage and pride. We create not just boots, but wearable art that connects generations."
            </blockquote>
            <p className="text-sm uppercase tracking-wider text-cognac mb-8">Bayarmaa · Lead Craftsman</p>
            <Link
              href="/heritage"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-wide text-gold transition-colors duration-400 hover:text-cognac"
            >
              Discover Our Story
              <span className="h-px w-10 bg-gold/40" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-12 bg-black-rich">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-gold mb-4">
              Heritage Stories
            </p>
            <h4 className="text-4xl lg:text-5xl font-serif font-semibold text-cream mb-6">
              Tales from the Steppes
            </h4>
            <p className="text-lg text-cream/80 max-w-2xl mx-auto">
              Discover the rich history and cultural significance behind each meticulously crafted pair.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: 'Royal Legacy', desc: 'Boots worn by Mongolian presidents and dignitaries for over three decades.' },
              { title: 'Master Craftsmanship', desc: 'Techniques preserved and perfected through generations of artisans.' },
              { title: 'Cultural Pride', desc: 'Each pair celebrates the enduring spirit of Mongolian heritage.' }
            ].map((item) => (
              <div key={item.title} className="luxury-border p-8 bg-black transition-all duration-400 hover:border-gold">
                <h5 className="text-xl font-serif font-semibold text-cream mb-4">{item.title}</h5>
                <p className="text-base text-cream/70 leading-relaxed mb-6">
                  {item.desc}
                </p>
                <Link
                  href="/heritage"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wide text-gold transition-colors duration-400 hover:text-gold-light"
                >
                  Read More
                  <span className="h-px w-8 bg-gold/40" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
