'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/shop' },
      { label: 'Collections', href: '/collections' },
      { label: 'Heritage', href: '/heritage' },
    ],
    support: [
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
    ],
  };

  return (
    <footer className="relative mt-24 border-t-2 border-gold/20 bg-black-rich text-cream">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">
          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-3">Domog</p>
              <h3 className="text-4xl font-serif font-semibold tracking-tight">Heritage Boots</h3>
              <p className="mt-6 text-base leading-relaxed text-cream/80">
                Luxury Mongolian footwear crafted with three decades of mastery, worn by presidents and celebrated worldwide.
              </p>
            </div>
            <div className="space-y-4 text-sm uppercase tracking-wider text-cream/60">
              <p>Ulaanbaatar · Mongolia</p>
              <span className="block h-px w-24 bg-gold/30" />
              <p>Established 1989</p>
            </div>
            <div className="flex gap-6 text-sm uppercase tracking-wide text-cream/70">
              <Link href="https://instagram.com" target="_blank" className="transition-colors hover:text-gold">Instagram</Link>
              <Link href="https://pinterest.com" target="_blank" className="transition-colors hover:text-gold">Pinterest</Link>
              <Link href="/heritage" className="transition-colors hover:text-gold">Heritage</Link>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <p className="text-sm uppercase tracking-wider text-gold">
                  {title}
                </p>
                <ul className="space-y-4 text-base text-cream/80">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link className="transition-colors hover:text-gold" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-gold/20 pt-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
            <div className="space-y-6 max-w-2xl">
              <p className="text-sm uppercase tracking-wider text-gold">Exclusive Updates</p>
              <p className="text-lg text-cream/80 leading-relaxed">
                Be the first to discover new collections, limited editions, and the artistry behind each handcrafted pair.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 border-2 border-gold/30 bg-transparent px-6 py-4 text-base placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="border-2 border-gold px-8 py-4 text-sm uppercase tracking-wide text-gold transition-all duration-400 hover:bg-gold hover:text-black"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-between text-sm uppercase tracking-wider text-cream/60">
              <p>Crafted with Pride</p>
              <p className="mt-4">Mongolian Heritage</p>
              <p className="mt-2">Timeless Luxury</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-gold/20 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col gap-4 text-sm uppercase tracking-wider text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Domog Heritage Boots</p>
          <p>Luxury Craftsmanship Since 1989</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
