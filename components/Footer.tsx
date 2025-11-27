'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { type FooterDictionary } from '@/lib/dictionaries';
import { type Locale } from '@/lib/i18n/config';
import { useLocalizedPath } from '@/lib/i18n/navigation';

interface FooterProps {
    dictionary: FooterDictionary;
    locale: Locale;
}

export default function Footer({ dictionary: t, locale }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const localizedPath = useLocalizedPath();

    return (
        <footer className="bg-black text-cream">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href={localizedPath('/')} className="inline-block mb-6">
                            <span className="font-serif text-3xl font-semibold tracking-tight text-cream">
                                DOMOG
                            </span>
                        </Link>
                        <p className="font-sans text-cream/60 text-sm leading-relaxed mb-4 max-w-xs">
                            {t.brand_description}
                        </p>
                        <p className="font-serif text-gold/80 text-sm italic mb-6 max-w-xs">
                            &ldquo;{t.brand_quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialLink href="https://instagram.com/domogbrand" label="Instagram">
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
                            {t.shop_title}
                        </h4>
                        <ul className="space-y-4">
                            <FooterLink href={localizedPath('/shop')}>{t.all_collection}</FooterLink>
                            <FooterLink href={localizedPath('/shop?category=Ceremonial')}>{t.ceremonial}</FooterLink>
                            <FooterLink href={localizedPath('/shop?category=Festival')}>{t.festival}</FooterLink>
                            <FooterLink href={localizedPath('/shop?category=Traditional')}>{t.traditional}</FooterLink>
                            <FooterLink href={localizedPath('/shop?category=Daily+Wear')}>{t.daily_wear}</FooterLink>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">
                            {t.support_title}
                        </h4>
                        <ul className="space-y-4">
                            <FooterLink href={localizedPath('/size-guide')}>{t.size_guide}</FooterLink>
                            <FooterLink href={localizedPath('/care')}>{t.care_instructions}</FooterLink>
                            <FooterLink href={localizedPath('/shipping')}>{t.shipping_returns}</FooterLink>
                            <FooterLink href={localizedPath('/warranty')}>{t.warranty}</FooterLink>
                            <FooterLink href={localizedPath('/contact')}>{t.contact_us}</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">
                            {t.atelier_title}
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-cream/60 text-sm">
                                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                <span>
                                    {t.address_line1}
                                    <br />
                                    {t.address_line2}
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
                                {t.hours_label}
                            </p>
                            <p className="font-sans text-sm text-cream/60">
                                {t.hours_weekday}
                                <br />
                                {t.hours_saturday}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-16 pt-12 border-t border-cream/10">
                    <div className="max-w-xl">
                        <h4 className="font-serif text-2xl text-cream mb-3">
                            {t.newsletter_title}
                        </h4>
                        <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                            {t.newsletter_description}
                        </p>
                        <form className="flex gap-3">
                            <input
                                type="email"
                                placeholder={t.email_placeholder}
                                className="flex-1 bg-transparent border border-cream/20 px-4 py-3 text-cream text-sm placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gold text-black text-xs uppercase tracking-widest font-medium hover:bg-gold-light transition-colors"
                            >
                                {t.subscribe}
                            </button>
                        </form>
                        <p className="font-sans text-cream/30 text-xs mt-3">
                            {t.newsletter_note}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-cream/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="font-sans text-xs text-cream/40">
                            © {currentYear} {t.copyright}
                        </p>
                        <div className="flex items-center gap-6">
                            <Link 
                                href={localizedPath('/privacy')} 
                                className="font-sans text-xs text-cream/40 hover:text-gold transition-colors duration-300"
                            >
                                {t.privacy_policy}
                            </Link>
                            <Link 
                                href={localizedPath('/terms')} 
                                className="font-sans text-xs text-cream/40 hover:text-gold transition-colors duration-300"
                            >
                                {t.terms_of_service}
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
