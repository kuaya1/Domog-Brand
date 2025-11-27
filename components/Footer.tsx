'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-cream">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-serif text-3xl font-semibold tracking-tight text-cream">
                                DOMOG
                            </span>
                        </Link>
                        <p className="font-sans text-cream/60 text-sm leading-relaxed mb-4 max-w-xs">
                            Handcrafted in Ulaanbaatar since 1990. 
                            Where the patience of the steppe meets 
                            the precision of the atelier.
                        </p>
                        <p className="font-serif text-gold/80 text-sm italic mb-6 max-w-xs">
                            &ldquo;Some things cannot be rushed.&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialLink href="https://instagram.com" label="Instagram">
                                <Instagram size={20} strokeWidth={1.5} />
                            </SocialLink>
                            <SocialLink href="https://www.facebook.com/mongolundesniieetengutal/" label="Facebook">
                                <Facebook size={20} strokeWidth={1.5} />
                            </SocialLink>
                            <SocialLink href="mailto:info@domogbrand.com" label="Email">
                                <Mail size={20} strokeWidth={1.5} />
                            </SocialLink>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">
                            Shop
                        </h4>
                        <ul className="space-y-4">
                            <FooterLink href="/shop">All Collection</FooterLink>
                            <FooterLink href="/shop?category=Ceremonial">Ceremonial</FooterLink>
                            <FooterLink href="/shop?category=Festival">Festival</FooterLink>
                            <FooterLink href="/shop?category=Traditional">Traditional</FooterLink>
                            <FooterLink href="/shop?category=Daily+Wear">Daily Wear</FooterLink>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">
                            Support
                        </h4>
                        <ul className="space-y-4">
                            <FooterLink href="/size-guide">Size Guide</FooterLink>
                            <FooterLink href="/care">Care Instructions</FooterLink>
                            <FooterLink href="/shipping">Shipping & Returns</FooterLink>
                            <FooterLink href="/warranty">Warranty</FooterLink>
                            <FooterLink href="/contact">Contact Us</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">
                            Atelier
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-cream/60 text-sm">
                                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                <span>
                                    Khan-Uul District, 15th Khoroo
                                    <br />
                                    Ulaanbaatar, Mongolia
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-cream/60 text-sm">
                                <Phone size={18} className="text-gold flex-shrink-0" strokeWidth={1.5} />
                                <span>+976 9911-XXXX</span>
                            </li>
                            <li className="flex items-center gap-3 text-cream/60 text-sm">
                                <Mail size={18} className="text-gold flex-shrink-0" strokeWidth={1.5} />
                                <span>info@domogbrand.com</span>
                            </li>
                        </ul>

                        <div className="mt-8 pt-6 border-t border-cream/10">
                            <p className="font-sans text-xs text-cream/40 uppercase tracking-wider mb-2">
                                Hours
                            </p>
                            <p className="font-sans text-sm text-cream/60">
                                Mon - Fri: 09:00 - 18:00
                                <br />
                                Sat: 10:00 - 15:00
                            </p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-16 pt-12 border-t border-cream/10">
                    <div className="max-w-xl">
                        <h4 className="font-serif text-2xl text-cream mb-3">
                            Join the Quiet Circle
                        </h4>
                        <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                            Reserved for those who appreciate craft over convenience. 
                            Early access to new releases, stories from the workshop, 
                            and the occasional piece we make just once. No noise. No spam.
                        </p>
                        <form className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-transparent border border-cream/20 px-4 py-3 text-cream text-sm placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gold text-black text-xs uppercase tracking-widest font-medium hover:bg-gold-light transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="font-sans text-cream/30 text-xs mt-3">
                            We send perhaps four letters per year. We understand your inbox is precious.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-cream/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="font-sans text-xs text-cream/40">
                            © {currentYear} Domog Brand. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link 
                                href="/privacy" 
                                className="font-sans text-xs text-cream/40 hover:text-gold transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link 
                                href="/terms" 
                                className="font-sans text-xs text-cream/40 hover:text-gold transition-colors duration-300"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ 
    href, 
    label, 
    children 
}: { 
    href: string; 
    label: string; 
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 flex items-center justify-center border border-cream/20 text-cream/60 hover:border-gold hover:text-gold transition-all duration-300"
        >
            {children}
        </a>
    );
}

function FooterLink({ 
    href, 
    children 
}: { 
    href: string; 
    children: React.ReactNode;
}) {
    return (
        <li>
            <Link
                href={href}
                className="font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-300"
            >
                {children}
            </Link>
        </li>
    );
}
