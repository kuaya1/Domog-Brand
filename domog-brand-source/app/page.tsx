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
      <section className="relative min-h-screen overflow-hidden bg-cream">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('/Gemini_Generated_Image_san0prsan0prsan0.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center text-center">
          <div className="max-w-5xl mx-auto px-6 py-32">
            <p className="text-xs uppercase tracking-[0.2em] text-black mb-8">
              NEW MECHANICAL WATCH
            </p>

            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-sans font-normal text-black leading-tight mb-12">
              Blue Sector
            </h1>

            <p className="text-base lg:text-lg text-black max-w-xl mx-auto leading-relaxed mb-12">
              From now on, blue is the new Grey.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-3 border border-black px-10 py-3 text-xs uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-black hover:text-cream"
            >
              DISCOVER
              <span className="text-lg">›</span>
            </Link>
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

      <section className="px-6 py-24 lg:py-32 lg:px-12 bg-cream">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src="/images/artisans-working.jpg"
              alt="Master artisans crafting Mongolian boots"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8 lg:pl-12">
            <p className="text-xs uppercase tracking-[0.2em] text-black">
              OUR STORY
            </p>
            
            <h3 className="text-4xl lg:text-5xl font-sans font-normal text-black leading-tight">
              A PASSION FULL OF ADVENTURES
            </h3>
            
            <div className="space-y-6 text-base leading-relaxed text-black">
              <p>
                <span className="font-semibold">Domog Brand</span> brings together <span className="font-semibold">generations, cultures</span> and <span className="font-semibold">emotions</span> around a shared passion for bootmaking. Rooted in Mongolian craftsmanship and inspired by a timeless sense of design, the brand bridges eras, with an extreme <span className="font-semibold">care for details</span>. Founded by two friends from different worlds, it embodies the harmony between tradition and creativity. Each timepiece is designed to evoke <span className="font-semibold">emotion</span>, connect <span className="font-semibold">stories</span> and <span className="font-semibold">people</span> together. Discover our story, our values and the people behind the brand.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/heritage"
                className="inline-flex items-center gap-3 border border-black px-8 py-3 text-xs uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-black hover:text-cream"
              >
                DISCOVER
                <span className="text-lg">›</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:py-32 lg:px-12 bg-cream-sand">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8 lg:pr-12">
            <p className="text-xs uppercase tracking-[0.2em] text-black">
              SHOWROOM AND ONLINE MEETING
            </p>
            
            <h3 className="text-4xl lg:text-5xl font-sans font-normal text-black leading-tight">
              BOOK YOUR FURLAN MARRI EXPERIENCE
            </h3>
            
            <div className="space-y-6 text-base leading-relaxed text-black">
              <p>
                Interested in discovering the Furlan Marri collection in more detail? Explore it in person or online. Book a showroom visit or schedule a virtual meeting today.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-3 border border-black px-8 py-3 text-xs uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-black hover:text-cream"
              >
                BOOK AN APPOINTMENT
                <span className="text-lg">›</span>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden lg:order-first">
            <img
              src="/images/showroom-workspace.jpg"
              alt="Domog Brand showroom and design workspace"
              className="absolute inset-0 w-full h-full object-cover"
            />
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
