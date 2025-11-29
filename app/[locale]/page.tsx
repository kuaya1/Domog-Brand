import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
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
            {/* DRAMATIC HERO SECTION - Split Layout with Massive Boots */}
            <section className="relative min-h-screen bg-cream-50 overflow-hidden">
                <div className="h-full min-h-screen flex flex-col lg:flex-row">
                    
                    {/* LEFT: Text Content - 50% on desktop */}
                    <div className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20 lg:py-0 order-2 lg:order-1 bg-cream-50">
                        {/* Small Eyebrow Label */}
                        <p className="text-[10px] lg:text-xs uppercase tracking-[0.35em] text-gold-700 mb-6 font-semibold">
                            {t.tagline}
                        </p>
                        
                        {/* Main Headline - Refined Scale */}
                        <h1 className="mb-8">
                            <span className="block text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-charcoal-900 leading-[0.85] tracking-tight">
                                Legacy
                            </span>
                            <span className="block text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-charcoal-900 leading-[0.85] tracking-tight">
                                Carved
                            </span>
                            <span className="block text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-gold-700 leading-[0.9] tracking-tight mt-2">
                                by Hand
                            </span>
                        </h1>
                        
                        {/* Description */}
                        <p className="text-sm md:text-base text-stone-warm leading-[1.8] max-w-xl mb-10 font-light">
                            {t.hero_description}
                        </p>
                        
                        {/* Premium CTA - Refined Size */}
                        <Link 
                            href={`/${locale}/shop`}
                            className="
                                inline-flex items-center justify-center
                                w-fit
                                px-10 py-5
                                bg-charcoal-900 text-cream-50
                                text-xs uppercase tracking-[0.25em] font-bold
                                hover:bg-black hover:scale-105
                                transition-all duration-500 ease-out
                                shadow-2xl hover:shadow-3xl
                            "
                        >
                            {t.cta_button}
                            <ArrowRight className="w-5 h-5 ml-4" strokeWidth={2} />
                        </Link>
                    </div>
                    
                    {/* RIGHT: Hero Boot Image - 50% on desktop */}
                    <div className="lg:w-1/2 relative min-h-[60vh] lg:min-h-screen order-1 lg:order-2 bg-cream-50">
                        {/* Soft gradient transition from text to image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cream-50 via-transparent to-transparent z-10" />
                        
                        {/* The Hero Boot Image - Natural Size */}
                        <Image 
                            src="/images/hero-image.jpg"
                            alt={t.hero_image_alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain object-center"
                            style={{ 
                                filter: 'contrast(1.1) saturate(1.15) brightness(1.02)',
                            }}
                            priority
                        />
                    </div>
                    
                </div>
                
                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
                    <ChevronDown className="w-6 h-6 text-charcoal-900/40" strokeWidth={1.5} />
                </div>
            </section>

            {/* Featured Collection - Cream Background */}
            <section className="py-32 lg:py-40 px-6 lg:px-8 bg-cream-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-xs uppercase tracking-[0.3em] text-gold-700 mb-4 font-medium">
                            {t.collection_label}
                        </p>
                        <h2 className="text-5xl md:text-6xl font-serif font-semibold text-charcoal-900 mb-8 leading-tight">
                            {t.collection_title}
                        </h2>
                        <div className="w-24 h-px bg-gold-600 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-20">
                        {products.slice(0, 6).map((product, index) => (
                            <ProductCard key={product.id} product={product} locale={locale} priority={index < 3} />
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <Link href={`/${locale}/shop`}>
                            <button className="
                                px-12 py-4
                                border-2 border-charcoal-900
                                text-sm uppercase tracking-[0.2em] font-medium
                                text-charcoal-900
                                hover:bg-charcoal-900 hover:text-cream-50
                                transition-all duration-400
                            ">
                                {t.view_all_products}
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* DARK HERITAGE SECTION - Visual Rhythm Contrast */}
            <section className="py-32 lg:py-40 bg-charcoal-900 text-cream-50">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Image Side */}
                        <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                            <Image
                                src="/images/heritage-craftsman.jpg"
                                alt={t.heritage_image_alt}
                                fill
                                className="object-cover object-center"
                                style={{ 
                                    filter: 'contrast(1.15) saturate(1.05) sepia(0.1)' 
                                }}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                            />
                            {/* Rich overlay for depth */}
                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Content Side */}
                        <div className="space-y-8">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-6 font-medium">
                                    {t.heritage_label}
                                </p>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight mb-8">
                                    {t.heritage_title}
                                </h2>
                                <div className="w-20 h-px bg-gold-600 mb-8" />
                            </div>
                            
                            <div className="space-y-6 text-base lg:text-lg leading-relaxed text-cream-200 font-light">
                                <p>{t.heritage_p1}</p>
                                <p>{t.heritage_p2}</p>
                                <p className="text-cream-50 font-normal">{t.heritage_p3}</p>
                            </div>

                            <Link href={`/${locale}/about`}>
                                <button className="
                                    mt-8 px-10 py-4
                                    border-2 border-cream-50
                                    text-sm uppercase tracking-[0.2em] font-medium
                                    text-cream-50
                                    hover:bg-cream-50 hover:text-charcoal-900
                                    transition-all duration-400
                                ">
                                    {t.heritage_cta}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Craftsmanship Pillars - Light Background */}
            <section className="py-32 lg:py-40 bg-warm-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-6">
                            {t.promise_label}
                        </span>
                        <h2 className="font-serif text-4xl lg:text-5xl text-black font-medium tracking-tight">
                            {t.promise_title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        <div className="text-center group">
                            <div className="mb-6">
                                <span className="font-serif text-5xl lg:text-6xl text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                                    01
                                </span>
                            </div>
                            <h3 className="font-serif text-2xl text-black font-medium mb-4">
                                {t.pillar_1_title}
                            </h3>
                            <p className="font-sans text-stone-warm leading-relaxed">
                                {t.pillar_1_desc}
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mb-6">
                                <span className="font-serif text-5xl lg:text-6xl text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                                    02
                                </span>
                            </div>
                            <h3 className="font-serif text-2xl text-black font-medium mb-4">
                                {t.pillar_2_title}
                            </h3>
                            <p className="font-sans text-stone-warm leading-relaxed">
                                {t.pillar_2_desc}
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mb-6">
                                <span className="font-serif text-5xl lg:text-6xl text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                                    03
                                </span>
                            </div>
                            <h3 className="font-serif text-2xl text-black font-medium mb-4">
                                {t.pillar_3_title}
                            </h3>
                            <p className="font-sans text-stone-warm leading-relaxed">
                                {t.pillar_3_desc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
