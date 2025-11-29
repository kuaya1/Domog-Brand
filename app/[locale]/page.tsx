import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
            {/* Hero Section */}
            <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
                <div className="relative z-10 w-full">
                    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 py-12 lg:py-0">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0">

                            {/* Mobile: Image First - Scaled up 20% */}
                            <div className="lg:hidden w-full mb-12">
                                <Image
                                    src="/images/hero-image.jpg"
                                    alt={t.hero_image_alt}
                                    width={720}
                                    height={840}
                                    className="w-full max-w-xl mx-auto h-auto scale-[1.44] origin-center"
                                    priority
                                />
                            </div>

                            {/* Text Content - 40% on Desktop */}
                            <div className="lg:w-2/5 text-left space-y-8 z-10 lg:pr-12">
                                <div className="space-y-3">
                                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac font-medium">
                                        {t.tagline}
                                    </p>
                                    <h1 className="font-serif text-5xl lg:text-6xl text-black font-medium leading-tight">
                                        {t.hero_title}
                                    </h1>
                                </div>

                                <p className="font-sans text-base text-stone-warm leading-relaxed max-w-lg lg:max-w-none">
                                    {t.hero_description}
                                </p>

                                <Link
                                    href={`/${locale}/shop`}
                                    className="inline-block font-sans text-xs uppercase tracking-widest font-bold border-b-2 border-black pb-2 hover:text-cognac hover:border-cognac transition-all duration-300"
                                >
                                    {t.cta_button}
                                </Link>
                            </div>

                            {/* Desktop: Image on Right - 60% scaled to viewport, scaled up 20% */}
                            <div className="hidden lg:block lg:w-3/5 h-screen flex items-center justify-start">
                                <Image
                                    src="/images/hero-image.jpg"
                                    alt={t.hero_image_alt}
                                    width={960}
                                    height={1080}
                                    className="w-full h-full object-contain scale-[1.2] origin-center"
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
                        {/* Image Side - Transparent PNG with Spotlight */}
                        <div className="relative aspect-[4/5] flex items-center justify-center p-12">
                            {/* Spotlight Effect Behind Boot */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2/3 h-2/3 bg-gold-600/[0.14] blur-3xl rounded-full" />
                            </div>
                            
                            {/* Boot Image */}
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/PNG images/khans-legacy.png"
                                    alt={t.heritage_image_alt}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    style={{ 
                                        filter: 'contrast(1.1) saturate(1.08) drop-shadow(0 25px 50px rgba(201, 169, 97, 0.3))' 
                                    }}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    loading="lazy"
                                />
                            </div>
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
