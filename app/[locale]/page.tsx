import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProductGridErrorFallback } from "@/components/ProductGridErrorFallback";
import { Button } from "@/components/ui";
import { locales, isValidLocale, type Locale } from "@/lib/i18n/config";
import { getNamespace } from "@/lib/i18n/translations";
import { notFound } from "next/navigation";

// Generate static params for both locales
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export default function LocaleHome({ params: { locale } }: PageProps) {
    // Validate locale
    if (!isValidLocale(locale)) {
        notFound();
    }

    // Get translations from JSON files
    const t = getNamespace(locale, 'home');

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
                <div className="relative z-10 w-full">
                    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 py-12 lg:py-0">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0">

                            {/* Mobile: Image First - Scaled down 40% (30% + 10%) and moved down 1.7 inches total (0.7in + 1in) */}
                            <div className="lg:hidden w-full mb-12 mt-[64px]">
                                <OptimizedImage
                                    src="/images/PNG images/Generated Image November 23, 2025 - 9_31PM.png"
                                    alt="Handcrafted Mongolian traditional boots by Domog - Premium leather heritage footwear"
                                    width={720}
                                    height={840}
                                    className="w-full max-w-xl mx-auto h-auto scale-[0.9] origin-center"
                                    priority
                                />
                            </div>

                            {/* Text Content - 40% on Desktop, moved up 0.7in on mobile */}
                            <div className="lg:w-2/5 text-left space-y-8 z-10 lg:pr-12 -mt-[18px] lg:mt-0">
                                <div className="space-y-3">
                                    <p className="text-label-md text-cognac-accessible">
                                        {t.tagline}
                                    </p>
                                    <h1 className="text-display-md lg:text-display-lg font-serif font-medium text-black">
                                        {t.hero_title}
                                    </h1>
                                </div>

                                <p className="text-body-md text-stone-warm max-w-lg lg:max-w-none">
                                    {t.hero_description}
                                </p>

                                <Link href={`/${locale}/shop`}>
                                    <Button variant="link" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                                        {t.cta_button}
                                    </Button>
                                </Link>
                            </div>

                            {/* Desktop: Image on Right - 60% scaled to viewport, scaled down 30% */}
                            <div className="hidden lg:block lg:w-3/5 h-screen flex items-center justify-start">
                                <OptimizedImage
                                    src="/images/PNG images/Generated Image November 23, 2025 - 9_31PM.png"
                                    alt="Handcrafted Mongolian traditional boots by Domog - Premium leather heritage footwear"
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

            {/* Featured Collection - Cream Background */}
            <section className="py-32 lg:py-40 px-6 lg:px-8 bg-cream-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-label-md text-gold-text-accessible mb-4">
                            {t.collection_label}
                        </p>
                        <h2 className="text-display-sm md:text-display-md font-serif font-semibold text-charcoal-900 mb-8">
                            {t.collection_title}
                        </h2>
                        <div className="w-24 h-px bg-gold-600 mx-auto" />
                    </div>

                    <ErrorBoundary fallback={<ProductGridErrorFallback />}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-20">
                            {products.slice(0, 6).map((product, index) => (
                                <ProductCard key={product.id} product={product} locale={locale} priority={index < 3} />
                            ))}
                        </div>
                    </ErrorBoundary>

                    <div className="text-center mt-20">
                        <Link href={`/${locale}/shop`}>
                            <Button variant="outline" size="lg">
                                {t.view_all_products}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* DARK HERITAGE SECTION - Visual Rhythm Contrast */}
            <section className="relative py-32 lg:py-40 text-cream-50 overflow-hidden">
                {/* Mobile: Background Image with Overlay */}
                <div className="lg:hidden absolute inset-0">
                    <OptimizedImage
                        src="/images/Generated Image December 06, 2025 - 11_25AM.jpeg"
                        alt="Heritage craftsmanship background"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    {/* Cinematic overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black/65" />
                    {/* Christopher Nolan-inspired film grain: IMAX 70mm aesthetic */}
                    <div 
                        className="absolute inset-0 opacity-[0.25] mix-blend-soft-light pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nolanGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' seed='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 1 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nolanGrain)'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat',
                            animation: 'grain-shift 8s steps(10) infinite'
                        }}
                    />
                </div>
                
                {/* Desktop: Background Image with Cinematic Treatment */}
                <div className="hidden lg:block absolute inset-0">
                    <OptimizedImage
                        src="/images/Generated Image December 06, 2025 - 11_41AM (1).jpeg"
                        alt="Heritage craftsmanship workshop atmosphere"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    {/* Cinematic vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
                    {/* Film grain for desktop */}
                    <div 
                        className="absolute inset-0 opacity-[0.2] mix-blend-soft-light pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nolanGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' seed='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 1 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nolanGrain)'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat',
                            animation: 'grain-shift 8s steps(10) infinite'
                        }}
                    />
                </div>
                
                <div className="relative w-full">
                    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0 min-h-[80vh]">
                            {/* Content Side - Cinematic Typography - Matching Hero Layout: 40% width */}
                            <div className="lg:w-2/5 space-y-10 lg:space-y-12 lg:pr-12">
                            <div className="space-y-6">
                                {/* Overline with glow */}
                                <p className="text-label-md text-gold-500 tracking-[0.2em] uppercase mb-8 relative inline-block">
                                    <span className="relative z-10">{t.heritage_label}</span>
                                    <span className="absolute inset-0 blur-md bg-gold-500/20 -z-10" aria-hidden="true" />
                                </p>
                                
                                {/* Cinematic headline with text shadow */}
                                <h2 className="text-display-sm md:text-display-md lg:text-display-lg font-serif font-semibold leading-[1.1] tracking-tight text-cream-50"
                                    style={{ 
                                        textShadow: '0 2px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(201, 169, 97, 0.15)',
                                        letterSpacing: '-0.02em'
                                    }}>
                                    {t.heritage_title}
                                </h2>
                                
                                {/* Elegant divider with subtle glow */}
                                <div className="relative w-24 h-[2px] bg-gradient-to-r from-gold-500/80 to-gold-500/20">
                                    <div className="absolute inset-0 blur-sm bg-gradient-to-r from-gold-500/40 to-transparent" />
                                </div>
                            </div>
                            
                            {/* Body text with enhanced readability */}
                            <div className="space-y-6 text-body-md lg:text-body-lg leading-relaxed">
                                <p className="text-cream-100/95 font-light" style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)' }}>
                                    {t.heritage_p1}
                                </p>
                                <p className="text-cream-100/90 font-light" style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)' }}>
                                    {t.heritage_p2}
                                </p>
                                <p className="text-cream-50 font-medium text-lg" style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)' }}>
                                    {t.heritage_p3}
                                </p>
                            </div>

                            {/* Premium CTA button with enhanced contrast */}
                            <div className="pt-4">
                                <Link href={`/${locale}/about`}>
                                    <Button 
                                        variant="dark" 
                                        size="lg" 
                                        className="shadow-2xl shadow-black/50 hover:shadow-gold-500/20 transition-shadow duration-500 backdrop-blur-sm bg-cream-50/10 hover:bg-cream-50/20 border-2 border-cream-50/80 hover:border-gold-500"
                                    >
                                        {t.heritage_cta}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        
                        {/* Right side - Empty space for image background to show through */}
                        <div className="hidden lg:block lg:w-3/5" />
                    </div>
                    </div>
                </div>
            </section>

            {/* Craftsmanship Pillars - Light Background */}
            <section className="py-32 lg:py-40 bg-warm-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="inline-block text-label-md text-cognac-accessible mb-6">
                            {t.promise_label}
                        </span>
                        <h2 className="text-display-sm lg:text-display-md font-serif font-medium text-black">
                            {t.promise_title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        <div className="text-center group">
                            <div className="mb-6">
                                <span className="font-serif text-display-sm lg:text-display-md text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                                    01
                                </span>
                            </div>
                            <h3 className="text-heading-xl font-serif text-black font-medium mb-4">
                                {t.pillar_1_title}
                            </h3>
                            <p className="text-body-md text-stone-warm">
                                {t.pillar_1_desc}
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mb-6">
                                <span className="font-serif text-display-sm lg:text-display-md text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                                    02
                                </span>
                            </div>
                            <h3 className="text-heading-xl font-serif text-black font-medium mb-4">
                                {t.pillar_2_title}
                            </h3>
                            <p className="text-body-md text-stone-warm">
                                {t.pillar_2_desc}
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mb-6">
                                <span className="font-serif text-display-sm lg:text-display-md text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                                    03
                                </span>
                            </div>
                            <h3 className="text-heading-xl font-serif text-black font-medium mb-4">
                                {t.pillar_3_title}
                            </h3>
                            <p className="text-body-md text-stone-warm">
                                {t.pillar_3_desc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
