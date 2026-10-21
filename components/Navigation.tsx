'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, ArrowRight } from 'lucide-react';
import { useCartItemCount } from '@/lib/stores/cart-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { useLocalizedPath } from '@/lib/i18n/navigation';
import { useMessages } from '@/lib/i18n/use-messages';
import { plural } from '@/lib/i18n/messages';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
    const { locale, t } = useMessages();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // The bag count comes from localStorage; render it only after hydration.
    const [isHydrated, setIsHydrated] = useState(false);
    const scrollTicking = useRef(false);
    const storedCount = useCartItemCount();
    const itemCount = isHydrated ? storedCount : 0;
    const setSearchOpen = useUIStore((state) => state.setSearchOpen);
    const localizedPath = useLocalizedPath();
    const bagLabel = plural(locale, itemCount, t.nav.bagCount);

    useEffect(() => {
        setIsHydrated(true);
        const handleScroll = () => {
            if (scrollTicking.current) return;
            scrollTicking.current = true;
            requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 50);
                scrollTicking.current = false;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
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

    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    const links = [
        { href: localizedPath('/shop'), label: t.nav.collection },
        { href: localizedPath('/about'), label: t.nav.story },
        { href: localizedPath('/contact'), label: t.nav.contact },
    ];

    return (
        <header>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-default bg-cream-50/95 backdrop-blur-md ${
                    isScrolled ? 'border-b border-cream-300' : ''
                }`}
                aria-label={t.nav.mainLabel}
            >
                <div className="max-w-container mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((open) => !open)}
                                className="-ml-2 w-12 h-12 flex items-center justify-center text-charcoal-800 hover:text-burgundy-700 active:bg-cream-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                                aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                            >
                                <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
                            </button>
                        </div>

                        <Link
                            href={localizedPath('/')}
                            className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 z-10 flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2"
                            aria-label={t.nav.homeLink}
                        >
                            <span className="text-2xl font-serif font-semibold tracking-tight text-charcoal-900 group-hover:text-burgundy-700 transition-colors duration-300">
                                DOMOG
                            </span>
                            <span className="text-label-md uppercase text-cognac hidden sm:block">{t.nav.since}</span>
                        </Link>

                        <div className="hidden lg:flex items-center justify-center flex-1 px-8 xl:px-12">
                            <ul className="flex items-center gap-8 xl:gap-10">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <NavLink href={link.href}>{link.label}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="hidden lg:flex items-center gap-6">
                            <LanguageSwitcher />
                            <button
                                type="button"
                                onClick={() => setSearchOpen(true)}
                                className="text-charcoal-800 hover:text-burgundy-700 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
                                aria-label={t.nav.search}
                            >
                                <Search size={20} strokeWidth={1.5} aria-hidden="true" />
                            </button>
                            <BagLink href={localizedPath('/cart')} label={bagLabel} count={itemCount} />
                        </div>

                        <div className="flex lg:hidden">
                            <BagLink href={localizedPath('/cart')} label={bagLabel} count={itemCount} mobile />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Outside the bar on purpose: the bar's backdrop-filter would make it the
                containing block for this fixed panel and clip it to the bar's 80px height. */}
            <div
                id="mobile-menu"
                className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
                aria-hidden={!isMenuOpen}
            >
                <div
                    className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-500 ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={closeMenu}
                    aria-hidden="true"
                />

                <div
                    className={`absolute top-0 left-0 min-h-screen h-full w-[85%] max-w-sm bg-cream-50/95 backdrop-blur-2xl backdrop-saturate-150 shadow-xl border-r border-cream-300 transform transition-all duration-medium ease-symmetric ${
                        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between px-6 h-16 border-b border-cream-300">
                        <Link
                            href={localizedPath('/')}
                            onClick={closeMenu}
                            className="font-serif text-xl font-semibold tracking-tight text-charcoal-900"
                            aria-label={t.nav.homeLink}
                        >
                            DOMOG
                        </Link>
                        <button
                            type="button"
                            onClick={closeMenu}
                            className="w-10 h-10 flex items-center justify-center rounded bg-cream-200 text-charcoal-900 hover:bg-cream-300 transition-default"
                            aria-label={t.nav.closeMenu}
                        >
                            <X size={20} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                    </div>

                    <nav className="px-6 py-8" aria-label={t.nav.mobileLabel}>
                        <ul className="space-y-1">
                            {links.map((link, index) => (
                                <MobileNavItem key={link.href} href={link.href} onClick={closeMenu} delay={index} isOpen={isMenuOpen}>
                                    {link.label}
                                </MobileNavItem>
                            ))}
                            <MobileNavItem
                                href={localizedPath('/cart')}
                                onClick={closeMenu}
                                delay={links.length}
                                isOpen={isMenuOpen}
                                badge={itemCount > 0 ? itemCount : undefined}
                            >
                                {t.nav.bag}
                            </MobileNavItem>
                        </ul>

                        <div
                            className={`mt-6 transform transition-all duration-500 ${
                                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                            style={{ transitionDelay: isMenuOpen ? '250ms' : '0ms' }}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    closeMenu();
                                    setSearchOpen(true);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded bg-cream-200 text-stone-warm hover:bg-cream-300 hover:text-charcoal-900 transition-default"
                            >
                                <Search size={18} strokeWidth={1.5} aria-hidden="true" />
                                <span className="font-sans text-sm">{t.nav.searchPlaceholder}</span>
                            </button>
                        </div>

                        <div
                            className={`mt-4 transform transition-all duration-500 ${
                                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                            style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
                        >
                            <Link
                                href={localizedPath('/shop')}
                                onClick={closeMenu}
                                className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-charcoal-900 text-cream-50 rounded hover:bg-cognac transition-default"
                            >
                                <span className="font-sans text-sm uppercase tracking-widest text-center">{t.nav.explore}</span>
                                <ArrowRight size={16} className="flex-shrink-0 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </Link>
                        </div>
                    </nav>

                    <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-cream-300">
                        <div className="flex items-center justify-between">
                            <span className="font-sans text-xs uppercase tracking-widest text-stone-muted">{t.nav.language}</span>
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

function BagLink({ href, label, count, mobile = false }: { href: string; label: string; count: number; mobile?: boolean }) {
    return (
        <Link
            href={href}
            className={
                mobile
                    ? '-mr-2 w-12 h-12 flex items-center justify-center relative text-charcoal-800 hover:text-burgundy-700 active:bg-cream-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600'
                    : 'relative text-charcoal-800 hover:text-burgundy-700 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600'
            }
            aria-label={label}
        >
            <ShoppingBag size={mobile ? 22 : 20} strokeWidth={1.5} aria-hidden="true" />
            {count > 0 && (
                <span
                    className={`absolute ${mobile ? 'top-1 right-1' : '-top-1.5 -right-1.5'} w-5 h-5 bg-burgundy-700 text-cream-50 text-[10px] font-semibold flex items-center justify-center rounded-full`}
                    aria-hidden="true"
                >
                    {count}
                </span>
            )}
        </Link>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative font-medium text-sm text-stone-warm hover:text-charcoal-900 transition-default group whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2"
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-charcoal-900 group-hover:w-full transition-all duration-default" />
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
            className={`transform transition-all duration-medium ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
            style={{ transitionDelay: isOpen ? `${delay * 75}ms` : '0ms' }}
        >
            <Link
                href={href}
                onClick={onClick}
                className="group flex items-center justify-between gap-3 min-h-[52px] py-4 px-4 -mx-4 rounded hover:bg-cream-200 active:bg-cream-300 transition-default"
            >
                <span className="font-sans text-lg font-medium text-charcoal-900 group-hover:text-cognac transition-default">
                    {children}
                </span>
                <span className="flex items-center gap-3">
                    {badge !== undefined && (
                        <span className="w-6 h-6 bg-gold-600 text-charcoal-900 text-sm font-medium flex items-center justify-center rounded-full">
                            {badge}
                        </span>
                    )}
                    <ArrowRight size={18} className="text-stone-warm group-hover:text-cognac group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </span>
            </Link>
        </li>
    );
}
