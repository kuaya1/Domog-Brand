'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { useLocalizedPath } from '@/lib/i18n/navigation';
import { useMessages } from '@/lib/i18n/use-messages';
import { getUsedCategories, getCategoryLabel } from '@/lib/products';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_E164, SOCIAL_LINKS } from '@/lib/contact';

export default function Footer() {
    const { locale, t } = useMessages();
    const localizedPath = useLocalizedPath();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="section-dark">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
                    <div>
                        <Link href={localizedPath('/')} className="inline-block mb-6" aria-label={t.nav.homeLink}>
                            <span className="font-serif text-3xl font-semibold tracking-tight text-cream">DOMOG</span>
                        </Link>
                        <p className="font-sans text-cream-200 text-sm leading-relaxed mb-6 max-w-xs">{t.footer.descriptor}</p>
                        <div className="flex items-center gap-4">
                            <SocialLink href={SOCIAL_LINKS.instagram} label={t.footer.instagram}>
                                <Instagram size={20} strokeWidth={1.5} aria-hidden="true" />
                            </SocialLink>
                            <SocialLink href={SOCIAL_LINKS.facebook} label={t.footer.facebook}>
                                <Facebook size={20} strokeWidth={1.5} aria-hidden="true" />
                            </SocialLink>
                            <SocialLink href={`mailto:${CONTACT_EMAIL}`} label={t.footer.email}>
                                <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                            </SocialLink>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">{t.footer.collection}</h2>
                        <ul className="space-y-4">
                            <FooterLink href={localizedPath('/shop')}>{t.footer.allStyles}</FooterLink>
                            {getUsedCategories().map((category) => (
                                <FooterLink key={category} href={localizedPath(`/shop?category=${category}`)}>
                                    {getCategoryLabel(category, locale)}
                                </FooterLink>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">{t.footer.help}</h2>
                        <ul className="space-y-4">
                            <FooterLink href={localizedPath('/size-guide')}>{t.footer.sizeGuide}</FooterLink>
                            <FooterLink href={localizedPath('/care')}>{t.footer.care}</FooterLink>
                            <FooterLink href={localizedPath('/shipping')}>{t.footer.shipping}</FooterLink>
                            <FooterLink href={localizedPath('/warranty')}>{t.footer.warranty}</FooterLink>
                            <FooterLink href={localizedPath('/contact')}>{t.footer.contact}</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">{t.footer.addressContact}</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-cream-200 text-sm">
                                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                                <span>
                                    {t.footer.addressLine1}
                                    <br />
                                    {t.footer.addressLine2}
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-cream-200 text-sm">
                                <Phone size={18} className="text-gold flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                                <a href={`tel:${CONTACT_PHONE_E164}`} className="hover:text-gold transition-colors whitespace-nowrap">
                                    {CONTACT_PHONE}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-cream-200 text-sm">
                                <Mail size={18} className="text-gold flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold transition-colors break-all">
                                    {CONTACT_EMAIL}
                                </a>
                            </li>
                        </ul>

                        <div className="mt-8 pt-6 border-t border-cream/10">
                            <p className="font-sans text-xs text-cream-200/70 uppercase tracking-wider mb-2">{t.footer.hours}</p>
                            <p className="font-sans text-sm text-cream-200">
                                {t.footer.hoursWeekday}
                                <br />
                                {t.footer.hoursSaturday}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-cream/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="font-sans text-xs text-cream-200/70">
                            {/* Pages are generated at build time; the browser shows the current year. */}
                            © <span suppressHydrationWarning>{currentYear}</span> {t.footer.rights}
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href={localizedPath('/privacy')}
                                className="font-sans text-xs text-cream-200/70 hover:text-gold transition-colors duration-300"
                            >
                                {t.footer.privacy}
                            </Link>
                            <Link
                                href={localizedPath('/terms')}
                                className="font-sans text-xs text-cream-200/70 hover:text-gold transition-colors duration-300"
                            >
                                {t.footer.terms}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center border border-cream/20 text-cream-200 hover:border-gold hover:text-gold active:bg-gold/10 transition-all duration-300"
        >
            {children}
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="font-sans text-sm text-cream-200 hover:text-gold active:text-gold-light transition-colors duration-300 block py-1.5 -my-1.5"
            >
                {children}
            </Link>
        </li>
    );
}
