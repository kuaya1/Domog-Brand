'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/stores/ui-store';
import { useLocalizedPath } from '@/lib/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { type NavigationDictionary } from '@/lib/dictionaries';

// ============================================================================
// Default Dictionary (fallback)
// ============================================================================

const defaultDict: NavigationDictionary = {
    shop: "Shop",
    heritage: "Heritage",
    atelier: "Atelier",
    cart: "Cart",
    search_placeholder: "Search products...",
    shop_now: "Shop Now",
    shop_collection: "Shop Collection",
    our_heritage: "Our Heritage",
    visit_atelier: "Visit Atelier",
    shopping_bag: "Shopping Bag",
    language: "Language",
    tagline: "Handcrafted in Mongolia since 1990",
};

interface NavigationProps {
    dictionary?: NavigationDictionary;
}

export default function Navigation({ dictionary }: NavigationProps) {
    const t = dictionary || defaultDict;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const cart = useCartStore((state) => state.cart);
    const itemCount = cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
    const setSearchOpen = useUIStore(state => state.setSearchOpen);
    const localizedPath = useLocalizedPath();

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-cream/90 backdrop-blur-xl shadow-sm border-b border-black/5' 
                        : 'bg-cream/70 backdrop-blur-md'
                }`}
                aria-label="Main navigation"
            >
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Mobile: Menu Button (Left) */}
                    <div className="flex lg:hidden">
                        <button
                            onClick={toggleMenu}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-black hover:bg-black/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Logo - Centered on mobile, left on desktop */}
                    <Link 
                        href={localizedPath('/')} 
                        className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 z-10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                        aria-label="Domog Brand - Home"
                    >
                        <span className="font-serif text-xl lg:text-2xl font-semibold tracking-tight text-black group-hover:text-cognac transition-colors duration-300">
                            DOMOG
                        </span>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center justify-center flex-1 px-12">
                        <ul className="flex items-center space-x-12" role="menubar">
                            <li role="none"><NavLink href={localizedPath('/shop')}>{t.shop}</NavLink></li>
                            <li role="none"><NavLink href={localizedPath('/about')}>{t.heritage}</NavLink></li>
                            <li role="none"><NavLink href={localizedPath('/contact')}>{t.atelier}</NavLink></li>
                        </ul>
                    </div>

                    {/* Right Side - Icons */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <LanguageSwitcher />
                        <button 
                            onClick={() => setSearchOpen(true)}
                            className="p-2 text-stone-warm hover:text-cognac transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                            aria-label="Search products"
                        >
                            <Search size={20} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                        <Link 
                            href={localizedPath('/cart')} 
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

                    {/* Mobile Cart Button (Right) */}
                    <div className="flex lg:hidden">
                        <Link 
                            href={localizedPath('/cart')} 
                            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-black hover:bg-black/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                            aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
                        >
                            <ShoppingBag size={18} strokeWidth={1.5} aria-hidden="true" />
                            {isHydrated && itemCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-black text-[10px] font-semibold flex items-center justify-center rounded-full" aria-hidden="true">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Premium Glassmorphism Drawer */}
            <div 
                id="mobile-menu"
                className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
                aria-hidden={!isMenuOpen}
            >
                {/* Backdrop with stronger blur */}
                <div 
                    className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-500 ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={closeMenu}
                    aria-hidden="true"
                />

                {/* Drawer Panel - Frosted Glass */}
                <div 
                    className={`absolute top-0 left-0 min-h-screen h-full w-[85%] max-w-sm bg-white/90 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_35px_120px_rgba(0,0,0,0.35)] border-r border-white/30 transform transition-transform duration-500 ease-out ${
                        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    {/* Minimal Header */}
                    <div className="flex items-center justify-between px-6 h-16 border-b border-gold/5">
                        <Link 
                            href={localizedPath('/')}
                            onClick={closeMenu}
                            className="font-serif text-xl font-semibold tracking-tight text-black"
                        >
                            DOMOG
                        </Link>
                        <button
                            onClick={closeMenu}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-black hover:bg-black/10 transition-colors"
                            aria-label="Close menu"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Navigation Links - Clean & Minimal */}
                    <nav className="px-6 py-8" aria-label="Mobile navigation">
                        <ul className="space-y-1">
                            <MobileNavItem 
                                href={localizedPath('/shop')} 
                                onClick={closeMenu}
                                delay={0}
                                isOpen={isMenuOpen}
                            >
                                {t.shop_collection}
                            </MobileNavItem>
                            <MobileNavItem 
                                href={localizedPath('/about')} 
                                onClick={closeMenu}
                                delay={1}
                                isOpen={isMenuOpen}
                            >
                                {t.our_heritage}
                            </MobileNavItem>
                            <MobileNavItem 
                                href={localizedPath('/contact')} 
                                onClick={closeMenu}
                                delay={2}
                                isOpen={isMenuOpen}
                            >
                                {t.visit_atelier}
                            </MobileNavItem>
                            <MobileNavItem 
                                href={localizedPath('/cart')} 
                                onClick={closeMenu}
                                delay={3}
                                isOpen={isMenuOpen}
                                badge={isHydrated && itemCount > 0 ? itemCount : undefined}
                            >
                                {t.shopping_bag}
                            </MobileNavItem>
                        </ul>

                        {/* Search Button - Minimal */}
                        <div className={`mt-6 transform transition-all duration-500 ${
                            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`} style={{ transitionDelay: isMenuOpen ? '250ms' : '0ms' }}>
                            <button
                                onClick={() => {
                                    closeMenu();
                                    setSearchOpen(true);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-black/5 text-stone-warm hover:bg-black/10 hover:text-black transition-colors"
                            >
                                <Search size={18} strokeWidth={1.5} />
                                <span className="font-sans text-sm">{t.search_placeholder}</span>
                            </button>
                        </div>

                        {/* CTA Button - Modern */}
                        <div className={`mt-4 transform transition-all duration-500 ${
                            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`} style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}>
                            <Link 
                                href={localizedPath('/shop')}
                                onClick={closeMenu}
                                className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-black text-cream rounded-lg hover:bg-cognac transition-all duration-300"
                            >
                                <span className="font-sans text-sm uppercase tracking-widest">{t.shop_now}</span>
                                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </nav>

                    {/* Footer - Minimal */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-black/5">
                        {/* Language Switcher */}
                        <div className="flex items-center justify-between">
                            <span className="font-sans text-xs uppercase tracking-widest text-stone-muted">{t.language}</span>
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
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

interface MobileNavItemProps {
    href: string;
    children: React.ReactNode;
    onClick: () => void;
    delay: number;
    isOpen: boolean;
    badge?: number;
}

function MobileNavItem({ href, children, onClick, delay, isOpen, badge }: MobileNavItemProps) {
    return (
        <li 
            className={`transform transition-all duration-500 ${
                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? `${delay * 75}ms` : '0ms' }}
        >
            <Link
                href={href}
                onClick={onClick}
                className="group flex items-center justify-between py-3.5 px-4 -mx-4 rounded-lg hover:bg-black/5 transition-colors duration-200"
            >
                <span className="font-sans text-base font-medium text-black group-hover:text-cognac transition-colors">
                    {children}
                </span>
                <div className="flex items-center gap-2">
                    {badge && (
                        <span className="w-5 h-5 bg-gold text-black text-xs font-medium flex items-center justify-center rounded-full">
                            {badge}
                        </span>
                    )}
                    <ArrowRight size={14} className="text-stone-muted group-hover:text-cognac group-hover:translate-x-0.5 transition-all" />
                </div>
            </Link>
        </li>
    );
}
