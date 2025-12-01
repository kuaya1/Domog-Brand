import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { products, getLocalizedName, getLocalizedDescription } from "@/lib/products";
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

    // Generate Structured Data for Featured Products
    const featuredProducts = products.slice(0, 6);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: featuredProducts.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: getLocalizedName(product, locale as Locale),
                description: getLocalizedDescription(product, locale as Locale),
                image: product.images[0],
                sku: product.id,
                brand: {
                    '@type': 'Brand',
                    name: 'Domog Brand'
                },
                offers: {
                    '@type': 'Offer',
                    url: `https://domogbrand.com/${locale}/products/${product.id}`,
                    priceCurrency: 'USD',
                    price: product.price,
                    availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                    itemCondition: 'https://schema.org/NewCondition'
                }
            }
        }))
    };

    return (
        <main className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
                <div className="relative z-10 w-full">
                    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 py-12 lg:py-0">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0">

                            {/* Mobile: Image First - Scaled down 30% */}
                            <div className="lg:hidden w-full mb-12">
                                <OptimizedImage
                                    src="/images/PNG images/Generated Image November 23, 2025 - 9_31PM.png"
                                    alt="Handcrafted Mongolian traditional boots by Domog - Premium leather heritage footwear"
                                    width={720}
                                    height={840}
                                    className="w-full max-w-xl mx-auto h-auto scale-[1.008] origin-center"
                                    priority
                                />
                            </div>

                            {/* Text Content - 40% on Desktop */}
                            <div className="lg:w-2/5 text-left space-y-8 z-10 lg:pr-12">
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
                                <OptimizedImage
                                    src="/images/PNG images/khans-legacy.png (2).png"
                                    alt="Khan's Legacy - Handcrafted Mongolian ceremonial boot showcasing centuries of traditional craftsmanship by Domog artisans"
                                    fill
                                    className="object-contain filter-heritage-enhance drop-shadow-heritage-gold"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="space-y-8">
                            <div>
                                <p className="text-label-md text-gold-500 mb-6">
                                    {t.heritage_label}
                                </p>
                                <h2 className="text-display-sm md:text-display-md lg:text-display-lg font-serif font-semibold leading-tight mb-8">
                                    {t.heritage_title}
                                </h2>
                                <div className="w-20 h-px bg-gold-600 mb-8" />
                            </div>
                            
                            <div className="space-y-6 text-body-md lg:text-body-lg text-cream-200 font-light">
                                <p>{t.heritage_p1}</p>
                                <p>{t.heritage_p2}</p>
                                <p className="text-cream-50 font-normal">{t.heritage_p3}</p>
                            </div>

                            <Link href={`/${locale}/about`}>
                                <Button variant="dark" size="lg" className="mt-8">
                                    {t.heritage_cta}
                                </Button>
                            </Link>
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
