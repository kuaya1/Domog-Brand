import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';
import { pageBreadcrumb } from '@/lib/seo/structured-data';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    return buildMetadata({ locale, path: '/about', title: t.meta.story.title, description: t.meta.story.description });
}

/**
 * Our story. Deliberately short: it states only the owner-confirmed fact
 * (a family business since 1990). Names, roles, milestones and quotations
 * are added once the family supplies them (docs/content/OPEN-QUESTIONS.md).
 */
export default function AboutPage({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }

    const messages = getMessages(locale);
    const t = messages.story;
    const paths = [
        { title: t.collectionTitle, body: t.collectionBody, action: t.collectionAction, href: `/${locale}/shop` },
        { title: t.contactTitle, body: t.contactBody, action: t.contactAction, href: `/${locale}/contact` },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pageBreadcrumb(locale, '/about', messages.nav.story)) }}
            />

            <div className="bg-cream">
                <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 bg-charcoal-900 text-cream-50 overflow-hidden">
                    <div className="absolute inset-0 opacity-10" aria-hidden="true">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,169,97,0.45)_0%,_transparent_55%)]" />
                    </div>
                    <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center space-y-8">
                        <p className="text-label-md text-gold-500 tracking-[0.2em] uppercase">{t.eyebrow}</p>
                        <h1 className="text-display-sm md:text-display-md lg:text-display-lg font-serif font-semibold leading-[1.1] tracking-tight text-balance text-cream-50">
                            {t.title}
                        </h1>
                        <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-gold-500/20 via-gold-500/80 to-gold-500/20" aria-hidden="true" />
                        <p className="text-body-lg lg:text-xl leading-relaxed text-cream-100/90">{t.body}</p>
                    </div>
                </section>

                <section className="py-20 lg:py-28">
                    <div className="max-w-container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative h-[360px] sm:h-[460px]">
                            <Image
                                src="/images/PNG images/steppe-rider (1).png"
                                alt={messages.common.brandAlt}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        <div className="space-y-12">
                            {paths.map((path) => (
                                <div key={path.href}>
                                    <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 mb-3">{path.title}</h2>
                                    <p className="text-body-md text-stone-warm mb-5">{path.body}</p>
                                    <Link
                                        href={path.href}
                                        className="inline-flex items-center gap-2 text-cognac hover:text-cognac-dark underline underline-offset-4"
                                    >
                                        {path.action}
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                </div>
                            ))}
                            <div>
                                <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 mb-3">{t.careTitle}</h2>
                                <p className="text-body-md text-stone-warm mb-5">{t.careBody}</p>
                                <div className="flex flex-wrap gap-x-8 gap-y-3">
                                    <Link
                                        href={`/${locale}/care`}
                                        className="inline-flex items-center gap-2 text-cognac hover:text-cognac-dark underline underline-offset-4"
                                    >
                                        {t.careAction}
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                    <Link
                                        href={`/${locale}/warranty`}
                                        className="inline-flex items-center gap-2 text-cognac hover:text-cognac-dark underline underline-offset-4"
                                    >
                                        {t.warrantyAction}
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
