'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const quickLinks = [
    { label: 'Shop All', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Heritage', href: '/heritage' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ];

  const customerService = [
    { label: 'Shipping Information', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Care Instructions', href: '/care' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: 'https://pinterest.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-charcoal-900 text-warmGray-100">
      {/* Mongolian Border Pattern */}
      <div className="w-full h-2 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600" />
      <div className="w-full h-1 bg-warmGray-800">
        <svg
          width="100%"
          height="8"
          viewBox="0 0 1200 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <pattern id="mongolianPattern" x="0" y="0" width="40" height="8" patternUnits="userSpaceOnUse">
            <path d="M0,4 L10,0 L20,4 L30,0 L40,4" stroke="#dfa932" strokeWidth="1" fill="none" />
          </pattern>
          <rect x="0" y="0" width="1200" height="8" fill="url(#mongolianPattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-crimson rounded-crafted flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">D</span>
                </div>
                <div>
                  <span className="font-display text-2xl text-white tracking-wide">Domog</span>
                  <span className="block text-xs text-gold-500 tracking-luxury uppercase">
                    Mongolian Heritage
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-sm text-warmGray-400 leading-relaxed">
              Handcrafted Mongolian boots celebrating 35 years of traditional artisanship. 
              Worn by presidents and champions, each pair is a masterpiece of cultural heritage.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-warmGray-800 text-warmGray-400 hover:bg-gold-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-warmGray-400 hover:text-gold-500 transition-colors duration-300 inline-block relative"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Customer Service</h3>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-warmGray-400 hover:text-gold-500 transition-colors duration-300 inline-block relative"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Stay Connected</h3>
            <p className="text-sm text-warmGray-400 mb-4 leading-relaxed">
              Subscribe to receive exclusive offers, new collection announcements, and stories from our artisans.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  disabled={isSubscribed}
                  className="w-full px-4 py-3 bg-warmGray-800 border border-warmGray-700 text-white placeholder-warmGray-500 rounded-crafted focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300 disabled:opacity-50"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubscribed}
                className="w-full px-6 py-3 bg-gradient-gold text-charcoal-900 font-semibold rounded-crafted shadow-md hover:shadow-gold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
              >
                {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-warmGray-800 space-y-2">
              <div className="flex items-center gap-2 text-sm text-warmGray-400">
                <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@domogboots.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-warmGray-400">
                <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+976 11 123 456</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warmGray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-warmGray-500">
              © {new Date().getFullYear()} Domog Brand. All rights reserved.
            </div>

            {/* Made in Mongolia Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-warmGray-800 rounded-full border border-gold-500/30">
              <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gold-500 tracking-wide">
                Made with Pride in Mongolia
              </span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3 text-warmGray-500 text-xs">
              <span>We accept:</span>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-warmGray-800 rounded">VISA</div>
                <div className="px-2 py-1 bg-warmGray-800 rounded">MC</div>
                <div className="px-2 py-1 bg-warmGray-800 rounded">AMEX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
