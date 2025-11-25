'use client';

import { useState, useEffect } from 'react';
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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-cream/95 backdrop-blur-md shadow-elegant' 
                    : 'bg-cream/80 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo */}
                    <Link href="/" className="relative z-10 group">
                        <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-black group-hover:text-cognac transition-colors duration-300">
                            DOMOG
                        </span>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center justify-center flex-1 px-12">
                        <div className="flex items-center space-x-12">
                            <NavLink href="/shop">Shop</NavLink>
                            <NavLink href="/about">Heritage</NavLink>
                            <NavLink href="/contact">Atelier</NavLink>
                        </div>
                    </div>

                    {/* Right Side - Icons */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <button 
                            className="p-2 text-stone-warm hover:text-cognac transition-colors duration-300"
                            aria-label="Search"
                        >
                            <Search size={20} strokeWidth={1.5} />
                        </button>
                        <Link 
                            href="/cart" 
                            className="relative p-2 text-stone-warm hover:text-cognac transition-colors duration-300"
                            aria-label={`Shopping cart with ${itemCount} items`}
                        >
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            {isHydrated && itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-medium flex items-center justify-center rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden items-center space-x-4">
                        <Link 
                            href="/cart" 
                            className="relative p-2 text-black"
                            aria-label={`Shopping cart with ${itemCount} items`}
                        >
                            <ShoppingBag size={22} strokeWidth={1.5} />
                            {isHydrated && itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-medium flex items-center justify-center rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-black"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`lg:hidden fixed inset-0 top-20 bg-cream z-40 transition-all duration-500 ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
                    <MobileNavLink href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</MobileNavLink>
                    <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>Heritage</MobileNavLink>
                    <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>Atelier</MobileNavLink>
                    
                    <div className="pt-8 border-t border-gold/20 w-full max-w-xs">
                        <Link 
                            href="/shop"
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full text-center py-4 bg-gold text-black font-sans text-sm uppercase tracking-widest hover:bg-gold-light transition-colors"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative font-sans text-sm uppercase tracking-widest text-stone-warm hover:text-black transition-colors duration-300 gold-underline"
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
            className="font-serif text-3xl text-black hover:text-cognac transition-colors duration-300"
        >
            {children}
        </Link>
    );
}
