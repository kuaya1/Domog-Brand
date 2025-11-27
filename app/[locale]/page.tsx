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
                                    alt="The Master Craftsman hand-lasting a boot"
                                    width={720}
                                    height={840}
                                    className="w-full max-w-xl mx-auto h-auto scale-[1.2] origin-center"
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

                            {/* Desktop: Image on Right - 60% scaled to viewport */}
                            <div className="hidden lg:block lg:w-3/5 h-screen flex items-center justify-start">
                                <Image
                                    src="/images/hero-image.jpg"
                                    alt="The Master Craftsman hand-lasting a boot"
                                    width={800}
                                    height={900}
                                    className="w-full h-full object-contain"
                                    priority
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Collection */}
            <section className="py-24 px-4 bg-cream-sand">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-cognac font-medium uppercase tracking-[0.2em] text-sm">
                            {t.collection_label}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-black mt-3 mb-6">
                            {t.collection_title}
                        </h2>
                        <div className="w-24 h-px bg-gold mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.slice(0, 6).map((product) => (
                            <div key={product.id} className="transform scale-75 md:scale-100 origin-top">
                                <ProductCard product={product} locale={locale} />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <Link
                            href={`/${locale}/shop`}
                            className="inline-flex items-center space-x-2 text-black hover:text-cognac font-medium border-b-2 border-gold pb-1 transition-colors text-lg"
                        >
                            <span>{t.view_all_products}</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Heritage Section */}
            <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Image */}
                        <div className="relative aspect-[4/5] overflow-hidden shadow-lg">
                            <Image
                                src="/images/heritage-craftsman.jpg"
                                alt="Master craftsman at work in the Domog atelier"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                            />
                        </div>

                        {/* Content */}
                        <div className="lg:pl-8">
                            <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-6">
                                {t.heritage_label}
                            </span>
                            <h2 className="font-serif text-4xl lg:text-5xl text-black font-medium tracking-tight mb-8">
                                {t.heritage_title}
                            </h2>
                            
                            <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                                <p>{t.heritage_p1}</p>
                                <p>{t.heritage_p2}</p>
                                <p className="text-black font-medium">{t.heritage_p3}</p>
                            </div>

                            <div className="mt-10">
                                <Link
                                    href={`/${locale}/about`}
                                    className="btn-secondary"
                                >
                                    {t.heritage_cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Craftsmanship Pillars */}
            <section className="py-32 lg:py-40 bg-cream">
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
