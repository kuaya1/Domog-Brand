import Image from 'next/image';
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { Button } from "@/components/ui";
import { locales, isValidLocale } from "@/lib/i18n/config";
import { getNamespace } from "@/lib/i18n/translations";
import { notFound } from "next/navigation";

// Generate static params for both locales
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export default function AboutPage({ params: { locale } }: PageProps) {
    // Validate locale
    if (!isValidLocale(locale)) {
        notFound();
    }

    // Get translations
    const t = getNamespace(locale, 'about');

    return (
        <div className="bg-cream">
            {/* DARK HERITAGE HERO SECTION - Matching Main Page Heritage Section */}
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
                            backgroundRepeat: 'repeat'
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
                            backgroundRepeat: 'repeat'
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
                                    <span className="relative z-10">{t.manifesto_label}</span>
                                    <span className="absolute inset-0 blur-md bg-gold-500/20 -z-10" aria-hidden="true" />
                                </p>
                                
                                {/* Cinematic headline with text shadow */}
                                <h1 className="text-display-sm md:text-display-md lg:text-display-lg font-serif font-semibold leading-[1.1] tracking-tight text-cream-50"
                                    style={{ 
                                        textShadow: '0 2px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(201, 169, 97, 0.15)',
                                        letterSpacing: '-0.02em'
                                    }}>
                                    {t.manifesto_title}
                                </h1>
                                
                                {/* Elegant divider with subtle glow */}
                                <div className="relative w-24 h-[2px] bg-gradient-to-r from-gold-500/80 to-gold-500/20">
                                    <div className="absolute inset-0 blur-sm bg-gradient-to-r from-gold-500/40 to-transparent" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Right side - Empty space for image background to show through */}
                        <div className="hidden lg:block lg:w-3/5" />
                    </div>
                    </div>
                </div>
            </section>

            {/* The Tension */}
            <section className="py-24 lg:py-32 bg-cream">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <div className="prose prose-lg prose-stone mx-auto">
                        <p className="text-xl lg:text-2xl text-stone-warm leading-relaxed font-serif italic">
                            {t.tension_quote}
                        </p>
                    </div>
                </div>
            </section>

            {/* Nomadic Strength */}
            <section className="py-24 lg:py-32 bg-cream-sand">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1">
                            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-6">
                                {t.nomadic_label}
                            </p>
                            <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                                <p>{t.nomadic_p1}</p>
                                <p>{t.nomadic_p2}</p>
                                <p className="text-black font-medium">{t.nomadic_p3}</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative h-[650px] flex items-center justify-center p-8">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/PNG images/steppe-rider (1).png"
                                    alt={t.nomadic_image_alt}
                                    fill
                                    className="object-contain drop-shadow-xl"
                                    style={{ 
                                        filter: 'contrast(1.05) saturate(1.08) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))' 
                                    }}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Italian Refinement */}
            <section className="py-24 lg:py-32 bg-cream">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="relative h-[650px] flex items-center justify-center p-8">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/PNG images/Generated Image November 27, 2025 - 10_19AM-EDIT.png"
                                    alt={t.italian_image_alt}
                                    fill
                                    className="object-contain drop-shadow-xl"
                                    style={{ 
                                        filter: 'contrast(1.05) saturate(1.08) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))' 
                                    }}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-6">
                                {t.italian_label}
                            </p>
                            <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                                <p>{t.italian_p1}</p>
                                <p>{t.italian_p2}</p>
                                <p className="text-black font-medium">{t.italian_p3}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Master's Touch - Central Feature */}
            <section className="py-32 lg:py-40 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
                </div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-6">
                            {t.master_label}
                        </p>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream font-medium leading-tight">
                            {t.master_title}
                        </h2>
                    </div>
                    
                    <div className="space-y-8 text-cream/70 text-lg lg:text-xl leading-relaxed text-center max-w-2xl mx-auto">
                        <p>{t.master_p1}</p>
                        <p>{t.master_p2}</p>
                        <p className="text-cream font-serif italic text-2xl lg:text-3xl py-8">
                            &ldquo;{t.master_quote}&rdquo;
                        </p>
                        <p>{t.master_p3}</p>
                    </div>

                    {/* The Featured Boot */}
                    <div className="mt-20 relative h-[468px] lg:h-[510px] flex items-center justify-center">
                        {/* Spotlight Effect */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1/2 h-2/3 bg-gold-600/[0.14] blur-3xl rounded-full" />
                        </div>
                        
                        {/* Boot Image */}
                        <div className="relative w-full h-full p-6">
                            <Image
                                src="/images/PNG images/altai-mountain (1).png"
                                alt={t.master_image_alt}
                                fill
                                className="object-contain drop-shadow-2xl"
                                style={{ 
                                    filter: 'contrast(1.1) saturate(1.08) drop-shadow(0 25px 50px rgba(201, 169, 97, 0.3))' 
                                }}
                                sizes="100vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* The Promise */}
            <section className="py-24 lg:py-32 bg-cream-sand">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-8">
                        {t.promise_label}
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl text-black font-medium leading-tight mb-12">
                        {t.promise_title}
                    </h2>
                    <div className="space-y-8 text-stone-warm text-lg leading-relaxed">
                        <p>{t.promise_p1}</p>
                        <p>{t.promise_p2}</p>
                        <p className="text-black font-medium text-xl">{t.promise_p3}</p>
                    </div>
                    
                    <div className="mt-16 pt-16 border-t border-cream-200">
                        <p className="font-serif text-2xl text-black italic">
                            Domog
                        </p>
                        <p className="text-stone-warm text-sm mt-2 tracking-wide">
                            Est. 1990 · Ulaanbaatar
                        </p>
                    </div>
                </div>
            </section>

            {/* The Invitation */}
            <section className="py-24 lg:py-32 bg-cream">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-8">
                        {t.invitation_label}
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl text-black font-medium leading-tight mb-12">
                        {t.invitation_title}
                    </h2>
                    <div className="space-y-8 text-stone-warm text-lg leading-relaxed">
                        <p>{t.invitation_p1}</p>
                        <p>{t.invitation_p2}</p>
                        <p className="text-black font-medium text-xl italic">{t.invitation_p3}</p>
                    </div>
                    
                    <p className="mt-16 text-stone-warm text-sm tracking-wide">
                        {t.signature}
                    </p>
                </div>
            </section>
        </div>
    );
}
