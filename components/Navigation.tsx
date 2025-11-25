'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const cart = useCartStore((state) => state.cart);
    const itemCount = cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    useEffect(() => {
        setIsHydrated(true);
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        // Passive listener for better scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on escape key and lock body scroll
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <header>
            <nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled 
                        ? 'bg-cream/95 backdrop-blur-md shadow-elegant' 
                        : 'bg-cream/80 backdrop-blur-sm'
                }`}
                aria-label="Main navigation"
            >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="relative z-10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                        aria-label="Domog Brand - Home"
                    >
                        <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-black group-hover:text-cognac transition-colors duration-300">
                            DOMOG
                        </span>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center justify-center flex-1 px-12">
                        <ul className="flex items-center space-x-12" role="menubar">
                            <li role="none"><NavLink href="/shop">Shop</NavLink></li>
                            <li role="none"><NavLink href="/about">Heritage</NavLink></li>
                            <li role="none"><NavLink href="/contact">Atelier</NavLink></li>
                        </ul>
                    </div>

                    {/* Right Side - Icons */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <button 
                            className="p-2 text-stone-warm hover:text-cognac transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                            aria-label="Search products"
                        >
                            <Search size={20} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                        <Link 
                            href="/cart" 
                            className="relative p-2 text-stone-warm hover:text-cognac transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                            aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
                        >
                            <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
                            {isHydrated && itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-medium flex items-center justify-center rounded-full" aria-hidden="true">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden items-center space-x-4">
                        <Link 
                            href="/cart" 
                            className="relative p-2 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                            aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
                        >
                            <ShoppingBag size={22} strokeWidth={1.5} aria-hidden="true" />
                            {isHydrated && itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-medium flex items-center justify-center rounded-full" aria-hidden="true">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? (
                                <X size={24} strokeWidth={1.5} aria-hidden="true" />
                            ) : (
                                <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                id="mobile-menu"
                className={`lg:hidden fixed inset-0 top-20 bg-cream z-40 transition-all duration-500 ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
                aria-hidden={!isMenuOpen}
            >
                <nav 
                    className="flex flex-col items-center justify-center h-full space-y-8 px-6"
                    aria-label="Mobile navigation"
                >
                    <MobileNavLink href="/shop" onClick={closeMenu}>Shop</MobileNavLink>
                    <MobileNavLink href="/about" onClick={closeMenu}>Heritage</MobileNavLink>
                    <MobileNavLink href="/contact" onClick={closeMenu}>Atelier</MobileNavLink>
                    
                    <div className="pt-8 border-t border-gold/20 w-full max-w-xs">
                        <Link 
                            href="/shop"
                            onClick={closeMenu}
                            className="block w-full text-center py-4 bg-gold text-black font-sans text-sm uppercase tracking-widest hover:bg-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold"
                        >
                            Shop Now
                        </Link>
                    </div>
                </nav>
            </div>
            </nav>
        </header>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative font-sans text-sm uppercase tracking-widest text-stone-warm hover:text-black transition-colors duration-300 gold-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            role="menuitem"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="font-serif text-3xl text-black hover:text-cognac transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
            {children}
        </Link>
    );
}
