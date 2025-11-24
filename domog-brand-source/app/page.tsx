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
    <main className="relative bg-rice text-ink">
      <section className="relative min-h-screen overflow-hidden px-6 pt-28 pb-16 lg:px-10">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(247,244,239,0.95), rgba(245,242,237,0.75)), url('/images/hero-background.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.12}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rice via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[auto_1fr_auto]">
            <div className="hidden lg:flex flex-col justify-between py-10">
              <span className="vertical-text text-ink/30">Domog Atelier</span>
              <span className="ink-divider h-24" />
              <p className="text-xs uppercase tracking-[0.45em] text-ink/50">Ulaanbaatar · Tokyo</p>
            </div>

            <div className="space-y-14">
              <div className="flex items-center gap-6 text-[0.65rem] uppercase tracking-[0.35em]">
                <span className="capsule-label">Est. 1989</span>
                <span className="h-px flex-1 bg-ink/10" />
                <span className="text-ink/50">Nomadic luxury atelier</span>
              </div>

              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.45em] text-ink/40">Quiet power in motion</p>
                <h1 className="mt-6 text-hero font-serif text-ink-deep leading-[0.95]">
                  The Wabi-sabi Chronicle of Domog
                </h1>
                <p className="mt-8 max-w-2xl text-base lg:text-lg leading-8 text-ink/70">
                  Sculpted leather silhouettes born on Mongolian steppes, refined through the restraint of Japanese
                  minimalism. Each pair embraces imperfection, asymmetry, and the warmth of human craftsmanship.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/reserve"
                  className="inline-flex items-center gap-3 rounded-full border border-jade/60 px-6 py-3 text-[0.7rem] uppercase tracking-[0.35em] text-jade transition hover:bg-jade hover:text-rice"
                >
                  <span className="h-px w-6 bg-jade/60" />
                  Reserve Atelier Visit
                </Link>
                <Link
                  href="/heritage"
                  className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.35em] text-ink/70 hover:text-ink"
                >
                  Read Heritage Journal
                  <span className="h-px w-8 bg-ink/30" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-end gap-8 text-right">
              <p className="text-[0.65rem] uppercase tracking-[0.45em] text-ink/45">Season 04 / Reverence</p>
              <div className="w-32 h-48 bg-silk shadow-card rounded-subtle" />
              <p className="text-sm leading-relaxed text-ink/60 max-w-[12rem]">
                Hand-stitched soles, sumi ink edge finishing, bronze-patina hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[320px,1fr]">
          <div className="space-y-10">
            <div>
              <span className="capsule-label">Edition 35</span>
              <h2 className="mt-6 text-3xl lg:text-4xl font-serif text-ink-deep leading-tight">
                Featured boots for windswept evenings
              </h2>
              <p className="mt-4 text-sm uppercase tracking-[0.35em] text-ink/50">Curated asymmetry</p>
            </div>
            <p className="text-base leading-8 text-ink/70">
              A choreography of volume and restraint. Highlight silhouettes span columns, while supporting pieces rest
              in contemplative space—mirroring the balance between Mongolian wilderness and Japanese courtyards.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.35em] text-ink"
            >
              View Entire Collection
              <span className="h-px w-10 bg-ink/30" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`${
                  index === 0
                    ? 'sm:col-span-2'
                    : index === 3
                    ? 'sm:row-span-2'
                    : ''
                }`}
              >
                <ProductCard
                  product={product}
                  onAddToCart={(item) => {
                    console.log('Added to cart:', item.name);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="split-background px-6 py-24 lg:px-10">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="text-[0.65rem] uppercase tracking-[0.45em] text-ink/60">Craft Notes</span>
            <h3 className="text-3xl lg:text-4xl font-serif text-ink-deep leading-snug">
              Heritage artisans interpret wabi-sabi through saddle-stitched leather and bronze rivets.
            </h3>
            <p className="text-base leading-8 text-ink/70">
              Our ateliers sit between felt-lined yurts and concrete studios. We embrace sun-faded dyes, hand-planed
              wooden lasts, and jade pigment rubdowns that create singular patinas.
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm uppercase tracking-[0.3em] text-ink/60">
              <div>
                <p>Natural Clay</p>
                <span className="block mt-2 h-px w-full bg-ink/15" />
              </div>
              <div>
                <p>Sumi Ink Edge</p>
                <span className="block mt-2 h-px w-full bg-ink/15" />
              </div>
              <div>
                <p>Yak Leather</p>
                <span className="block mt-2 h-px w-full bg-ink/15" />
              </div>
              <div>
                <p>Bronze Patina</p>
                <span className="block mt-2 h-px w-full bg-ink/15" />
              </div>
            </div>
          </div>

          <div className="relative rounded-subtle border border-ink/10 bg-pure p-10 shadow-sumi">
            <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.4em] text-ink/40">
              <span>Process</span>
              <span className="h-px flex-1 bg-ink/10" />
              <span>Edition 04</span>
            </div>
            <p className="mt-8 text-lg leading-8 text-ink/80">
              “We sand edges with sumi ink-dipped brushes so every pair feels like a sumi-e sweep—never identical, always
              intentional.”
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.4em] text-ink/50">Master Artisan · Bayarmaa</p>
            <Link
              href="/heritage"
              className="mt-10 inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-jade"
            >
              Discover atelier process
              <span className="h-px w-8 bg-jade/40" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1fr_auto]">
          <div className="space-y-6">
            <span className="text-[0.65rem] uppercase tracking-[0.45em] text-ink/50">Journal fragments</span>
            <h4 className="text-3xl font-serif text-ink-deep leading-tight">
              Mongolian steppes meet Japanese courtyards in three contemplations.
            </h4>
            <div className="grid gap-8 md:grid-cols-3">
              {["Raw Horizon", "Silent Weight", "Bronze Tempest"].map((title) => (
                <div key={title} className="border-t border-ink/15 pt-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-ink/45">{title}</p>
                  <p className="mt-4 text-base leading-7 text-ink/70">
                    Limited stories on materials, landscapes, and the calm tension between movement and stillness.
                  </p>
                  <Link
                    href="/journal"
                    className="mt-4 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-ink"
                  >
                    Read Entry
                    <span className="h-px w-6 bg-ink/25" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between border border-ink/10 rounded-subtle px-8 py-10 text-sm uppercase tracking-[0.35em] text-ink/50">
            <p>Appointments</p>
            <div className="my-6 h-px w-full bg-ink/10" />
            <p>Tokyo · Ulaanbaatar · Digital Atelier</p>
            <Link
              href="/reserve"
              className="mt-8 inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-jade"
            >
              Schedule
              <span className="h-px w-8 bg-jade/40" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
