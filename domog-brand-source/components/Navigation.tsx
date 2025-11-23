'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationProps {
  cartItemCount?: number;
}

const Navigation: React.FC<NavigationProps> = ({ cartItemCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Heritage', href: '/heritage' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Minimal Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-warm-50/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - More Presence */}
            <Link
              href="/"
              className="flex items-center space-x-3 group"
            >
              <span className="font-display text-2xl font-light tracking-[0.2em] text-warm-900 transition-opacity duration-300 group-hover:opacity-60">
                DOMOG
              </span>
              <span className="text-xs italic tracking-wider text-warm-600 hidden sm:block">
                Mongolian Heritage
              </span>
            </Link>

            {/* Desktop Menu - Gold Underline Slide */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-sm uppercase tracking-[0.15em] font-light text-warm-800 transition-colors duration-300"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-700 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              {/* Search Icon */}
              <button
                className="text-warm-800 transition-opacity duration-300 hover:opacity-60"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Cart Icon with Gold Dot */}
              <Link
                href="/cart"
                className="relative text-warm-800 transition-opacity duration-300 hover:opacity-60"
                aria-label="Shopping cart"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <>
                    <span className="absolute -top-2 -right-2 bg-crimson-800 text-warm-50 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-gold-700 rounded-full animate-pulse" />
                  </>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-warm-800 transition-opacity duration-300 hover:opacity-60"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-warm-900/40 backdrop-blur-sm z-40 transition-opacity duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-64 bg-warm-50 shadow-2xl z-40 transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 space-y-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-base uppercase tracking-wider font-light text-warm-800 transition-opacity duration-300 hover:opacity-60"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
