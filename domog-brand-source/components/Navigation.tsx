'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationProps {
  cartItemCount?: number;
}

const Navigation: React.FC<NavigationProps> = ({ cartItemCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  // Handle scroll for backdrop blur and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger cart badge bounce animation when count changes
  useEffect(() => {
    if (cartItemCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  // Prevent body scroll when mobile menu is open
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

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-smooth ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
            >
              {/* Logo Icon */}
              <div className="w-10 h-10 bg-gradient-crimson rounded-crafted flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              {/* Logo Text */}
              <div className="hidden sm:block">
                <span className="font-display text-2xl text-charcoal-900 tracking-wide">
                  Domog
                </span>
                <span className="block text-xs text-gold-600 tracking-luxury uppercase">
                  Mongolian Heritage
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative py-2 text-base font-medium text-charcoal-700 hover:text-crimson-600 transition-colors duration-300 group"
                >
                  <span className="tracking-wide">{item.label}</span>
                  {/* Gold underline animation */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-400 ease-smooth" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              
              {/* Search */}
              <div className="hidden md:flex items-center">
                {isSearchOpen ? (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <input
                      type="text"
                      placeholder="Search products..."
                      autoFocus
                      className="w-48 px-4 py-2 text-sm border border-warmGray-300 rounded-crafted focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-300"
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 text-charcoal-600 hover:text-crimson-600 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-charcoal-600 hover:text-crimson-600 transition-colors duration-300 hover:scale-110"
                    aria-label="Search"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-charcoal-600 hover:text-crimson-600 transition-colors duration-300 hover:scale-110"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 w-5 h-5 bg-crimson-600 text-white text-xs font-bold rounded-full flex items-center justify-center ${
                      cartBounce ? 'animate-bounce-soft' : ''
                    }`}
                  >
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-charcoal-600 hover:text-crimson-600 transition-colors duration-300"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-400 ease-smooth ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-charcoal-900/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-charcoal-900 shadow-2xl transition-transform duration-400 ease-smooth ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-warmGray-700">
              <span className="font-display text-2xl text-white tracking-wide">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-warmGray-400 hover:text-gold-500 transition-colors duration-300"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-8 px-6">
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 px-4 text-xl font-medium text-white hover:text-gold-500 hover:bg-warmGray-800 rounded-md transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Search */}
              <div className="mt-8 pt-8 border-t border-warmGray-700">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 text-base bg-warmGray-800 text-white border border-warmGray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Footer - Social Links */}
            <div className="p-6 border-t border-warmGray-700">
              <p className="text-sm text-warmGray-400 mb-4 tracking-wide">Follow Us</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-warmGray-800 text-warmGray-400 hover:bg-gold-600 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <span className="text-sm">
                      {social.icon.charAt(0).toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
