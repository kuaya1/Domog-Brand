'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <main className="relative">
      <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span className="w-full h-px bg-gray-200" />
        </div>

        <div className="relative z-10 w-full">
          <div className="mx-auto w-[90%] max-w-screen-2xl px-6 lg:px-12">
            <div className="grid gap-14 xl:gap-24 lg:grid-cols-3 items-center">
              <div className="text-center lg:text-right space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-[#111111] leading-tight tracking-tight">
                  Copper Mongol
                  <br />
                  Boots
                </h1>
                <p className="text-base lg:text-lg text-[#2a2a2a] max-w-sm lg:ml-auto">
                  Hand-lasted in Ulaanbaatar for heads of state, Naadam champions, and those who revere the bond
                  between nomadic strength and Italian-level refinement.
                </p>
              </div>

              <div className="flex justify-center">
                <Image
                  src="/assets/copper-boots-isolated.png"
                  alt="Copper Mongol Boots"
                  width={520}
                  height={640}
                  priority
                  className="w-[480px] sm:w-[600px] lg:w-[900px] xl:w-[1040px] h-auto"
                />
              </div>

              <div className="text-center lg:text-left space-y-6">
                <div className="text-sm uppercase tracking-[0.35em] text-[#6b4b2f]">
                  Presidents • Wrestlers • Patrons
                </div>
                <p className="text-base text-[#2a2a2a] max-w-xs">
                  Numbered releases crafted with copper-dyed calfskin, felt insulation, and 24k-thread insignias.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.45em] text-[#111111] hover:text-black transition-colors duration-300"
                >
                  DISCOVER
                  <span className="text-2xl">›</span>
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
