import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import ProductCard from '@/components/ProductCard';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProductGridErrorFallback } from '@/components/ProductGridErrorFallback';
import { Button } from '@/components/ui';
import { getFeaturedProducts } from '@/lib/products';
import { locales, isValidLocale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    return buildMetadata({
        locale,
        path: '',
        title: t.meta.home.title,
        description: t.meta.home.description,
        absoluteTitle: true,
    });
}

const HERO_IMAGE = '/images/PNG images/Generated Image November 23, 2025 - 9_31PM.png';

export default function LocaleHome({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }

    const t = getMessages(locale).home;
    const steps = [
        { number: '01', title: t.choose1Title, body: t.choose1Body, href: `/${locale}/shop` },
        { number: '02', title: t.choose2Title, body: t.choose2Body, href: `/${locale}/size-guide` },
        { number: '03', title: t.choose3Title, body: t.choose3Body, href: `/${locale}/contact` },
    ];

    return (
        <div className="min-h-screen">
            {/* H01 — Introduction */}
            <section className="relative min-h-screen bg-cream-50 flex items-center overflow-hidden">
                <div className="relative z-10 w-full">
                    <div className="mx-auto w-full max-w-container px-5 sm:px-6 lg:px-12 py-12 lg:py-0">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0">
                            <div className="lg:hidden w-full mb-12 mt-[64px]">
                                <OptimizedImage
                                    src={HERO_IMAGE}
                                    alt={t.heroImageAlt}
                                    width={720}
                                    height={840}
                                    className="w-full max-w-xl mx-auto h-auto scale-[0.9] origin-center"
                                    priority
                                />
                            </div>

                            <div className="lg:w-1/2 text-left space-y-8 z-10 lg:pr-12 -mt-[18px] lg:mt-0 lg:pt-20">
                                <div className="space-y-3">
                                    <p className="text-label-md uppercase text-cognac">{t.heroEyebrow}</p>
                                    <h1 className="text-display-sm sm:text-display-md 2xl:text-display-lg font-serif font-medium text-charcoal-900 text-balance">
                                        {t.heroTitle}
                                    </h1>
                                </div>

                                <p className="text-body-md text-stone-warm max-w-lg lg:max-w-none">{t.heroBody}</p>

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                    <Link href={`/${locale}/shop`}>
                                        <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                                            {t.heroPrimary}
                                        </Button>
                                    </Link>
                                    <Link href={`/${locale}/about`}>
                                        <Button variant="link" size="md">
                                            {t.heroSecondary}
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden lg:block lg:w-1/2 h-screen flex items-center justify-start">
                                <OptimizedImage
                                    src={HERO_IMAGE}
                                    alt={t.heroImageAlt}
                                    width={960}
                                    height={1080}
                                    className="w-full h-full object-contain scale-[0.84] origin-center"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* H02 — Collection */}
            <section className="section-padding px-5 sm:px-6 lg:px-8 bg-cream-50">
                <div className="max-w-container mx-auto">
                    <div className="text-center mb-12 sm:mb-20 max-w-2xl mx-auto">
                        <h2 className="text-display-sm md:text-display-md font-serif font-semibold text-charcoal-900 mb-6">
                            {t.collectionTitle}
                        </h2>
                        <p className="text-body-md text-stone-warm">{t.collectionBody}</p>
                        <div className="w-16 sm:w-24 h-px bg-gold-600 mx-auto mt-8" aria-hidden="true" />
                    </div>

                    <ErrorBoundary fallback={<ProductGridErrorFallback />}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-x-8 sm:gap-y-16 lg:gap-x-12 lg:gap-y-20">
                            {getFeaturedProducts(6).map((product, index) => (
                                <ProductCard key={product.id} product={product} priority={index < 3} />
                            ))}
                        </div>
                    </ErrorBoundary>

                    <div className="text-center mt-12 sm:mt-20">
                        <Link href={`/${locale}/shop`}>
                            <Button variant="outline" size="lg">
                                {t.collectionAction}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* H03 — Family */}
            <section className="relative py-28 lg:py-36 bg-charcoal-900 text-cream-50 overflow-hidden">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,169,97,0.45)_0%,_transparent_55%)]" />
                </div>
                <div className="relative mx-auto w-full max-w-3xl px-6 lg:px-8 text-center space-y-8">
                    <h2 className="text-display-sm md:text-display-md font-serif font-semibold leading-[1.1] tracking-tight text-cream-50">
                        {t.familyTitle}
                    </h2>
                    <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-gold-500/20 via-gold-500/80 to-gold-500/20" aria-hidden="true" />
                    <p className="text-body-md lg:text-body-lg leading-relaxed text-cream-100/90">{t.familyBody}</p>
                    <div className="pt-2">
                        <Link href={`/${locale}/about`}>
                            <Button
                                variant="dark"
                                size="lg"
                                className="bg-cream-50/10 hover:bg-cream-50/20 border-2 border-cream-50/80 hover:border-gold-500"
                            >
                                {t.familyAction}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* H04 — Choosing your pair */}
            <section className="section-padding-lg bg-cream-50">
                <div className="max-w-container mx-auto px-6 lg:px-8">
                    <h2 className="text-center mb-16 lg:mb-20 text-display-sm lg:text-display-md font-serif font-medium text-charcoal-900">
                        {t.chooseTitle}
                    </h2>
                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        {steps.map((step) => (
                            <li key={step.number} className="text-center group">
                                <Link href={step.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-4">
                                    <span className="block mb-6 font-serif text-display-sm lg:text-display-md text-gold-600/30 group-hover:text-gold-600/50 transition-default" aria-hidden="true">
                                        {step.number}
                                    </span>
                                    <h3 className="text-heading-xl font-serif text-charcoal-900 font-medium mb-4 group-hover:text-cognac transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-body-md text-stone-warm">{step.body}</p>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* H05 — Care and contact */}
            <section className="py-20 lg:py-28 bg-cream-sand border-t border-cream-200">
                <div className="max-w-container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    <div>
                        <h2 className="font-serif text-3xl text-charcoal-900 mb-4">{t.careTitle}</h2>
                        <p className="text-body-md text-stone-warm mb-6">{t.careBody}</p>
                        <Link href={`/${locale}/care`} className="inline-flex items-center gap-2 text-cognac hover:text-cognac-dark underline underline-offset-4">
                            {t.careAction}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                    <div>
                        <h2 className="font-serif text-3xl text-charcoal-900 mb-4">{t.contactTitle}</h2>
                        <p className="text-body-md text-stone-warm mb-6">{t.contactBody}</p>
                        <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 text-cognac hover:text-cognac-dark underline underline-offset-4">
                            {t.contactAction}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
