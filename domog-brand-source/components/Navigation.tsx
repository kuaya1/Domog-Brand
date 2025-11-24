'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationProps {
  cartItemCount?: number;
}

const Navigation: React.FC<NavigationProps> = ({ cartItemCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuItems = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Heritage', href: '/heritage' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          isScrolled
            ? 'bg-cream/98 backdrop-blur-md shadow-elegant border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="group">
                  <span className="block text-3xl font-serif font-semibold tracking-tight text-black transition-colors duration-400 group-hover:text-gold">
                    DOMOG
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-wider text-cognac">
                    Mongolian Heritage
                  </span>
                </Link>
              </div>

              <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wide text-gray-warm">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative py-2 transition-colors duration-400 hover:text-gold"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-400 group-hover:w-full" />
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-6 text-black">
                <button
                  className="hidden sm:flex items-center justify-center text-gray-warm transition-colors duration-400 hover:text-gold"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                <Link
                  href="/heritage"
                  className="hidden md:inline-flex items-center text-sm uppercase tracking-wide text-gray-warm transition-colors duration-400 hover:text-gold"
                >
                  Heritage
                </Link>

                <Link
                  href="/reserve"
                  className="inline-flex items-center gap-2 border border-gold px-6 py-2.5 text-sm uppercase tracking-wide text-gold transition-all duration-400 hover:bg-gold hover:text-cream"
                >
                  Reserve Visit
                </Link>

                <Link
                  href="/cart"
                  className="relative text-gray-warm transition-colors duration-400 hover:text-gold"
                  aria-label="Shopping cart"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-burgundy text-xs text-cream">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <button
                  className="md:hidden text-gray-warm transition-colors duration-400 hover:text-gold"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-600 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-80 bg-cream shadow-luxury z-50 transition-transform duration-600 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col px-8 py-10">
          <div className="mb-10">
            <span className="text-2xl font-serif font-semibold text-black">DOMOG</span>
            <p className="mt-3 text-sm text-gray-warm leading-relaxed">
              35 years of refined Mongolian craftsmanship. Heritage meets timeless elegance.
            </p>
          </div>
          <div className="space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-base text-gray-warm transition-colors duration-400 hover:text-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-8 border-t border-gold/20 space-y-5">
            <Link
              href="/reserve"
              className="inline-flex items-center gap-2 border border-gold px-5 py-2.5 text-sm uppercase tracking-wide text-gold"
            >
              Reserve Visit
            </Link>
            <p className="text-xs uppercase tracking-wider text-cognac">
              Est. 1989 · Ulaanbaatar
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
