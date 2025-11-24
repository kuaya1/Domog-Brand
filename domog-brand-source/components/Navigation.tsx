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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-rice/95 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="relative py-5">
            <div className="flex flex-col gap-5 md:grid md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="flex items-center gap-6">
                <span className="hidden lg:flex vertical-text text-ink/30 tracking-[0.45em]">
                  Atelier
                </span>
                <Link href="/" className="group">
                  <span className="block text-sm tracking-[0.55em] uppercase text-ink-deep">
                    DOMOG
                  </span>
                  <span className="mt-1 block text-[0.65rem] tracking-[0.35em] uppercase text-jade">
                    Nomadic Atelier
                  </span>
                  <span className="mt-3 block h-px w-14 bg-gradient-to-r from-transparent via-jade to-transparent transform origin-left scale-x-0 transition duration-500 group-hover:scale-x-100" />
                </Link>
              </div>

              <div className="hidden md:flex items-center justify-center gap-10 text-[0.72rem] uppercase tracking-[0.35em] text-ink/70">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative py-2"
                  >
                    <span className="transition-colors duration-300 group-hover:text-ink">
                      {item.label}
                    </span>
                    <span className="absolute left-1/2 bottom-0 w-px h-5 bg-ink/20 origin-bottom transform scale-y-0 transition duration-500 group-hover:scale-y-100" />
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 text-ink">
                <button
                  className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-jade hover:text-jade"
                  aria-label="Search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                <Link
                  href="/journal"
                  className="hidden md:inline-flex items-center uppercase tracking-[0.32em] text-[0.65rem] text-ink border border-ink/20 rounded-full px-4 py-2 transition hover:border-jade hover:text-jade"
                >
                  Journal
                </Link>

                <Link
                  href="/reserve"
                  className="inline-flex items-center gap-2 rounded-full border border-jade/60 px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-jade transition hover:bg-jade hover:text-rice"
                >
                  <span className="h-px w-4 bg-jade/60" />
                  Reserve
                </Link>

                <Link
                  href="/cart"
                  className="relative text-ink transition hover:text-crimson"
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
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-crimson text-[0.6rem] text-rice">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <button
                  className="md:hidden text-ink transition hover:text-jade"
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
            <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 transition-opacity duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-72 bg-rice shadow-sumi z-50 transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col px-8 py-8">
          <div className="mb-8">
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-ink/60">Domog</span>
            <p className="mt-2 text-sm text-ink/70 leading-relaxed">
              Quiet luxury inspired by Mongolian steppes and Japanese clarity.
            </p>
          </div>
          <div className="space-y-5">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm uppercase tracking-[0.35em] text-ink/80 transition hover:text-ink"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-8 border-t border-ink/10 space-y-4">
            <Link
              href="/reserve"
              className="inline-flex items-center gap-2 rounded-full border border-jade/60 px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-jade"
            >
              <span className="h-px w-4 bg-jade/60" />
              Reserve
            </Link>
            <p className="text-xs uppercase tracking-[0.4em] text-ink/40">
              Est. 1989
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
