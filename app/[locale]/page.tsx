import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { locales, isValidLocale, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

// Generate static params for both locales
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

// Translations
const translations: Record<Locale, {
    tagline: string;
    hero_title: string;
    hero_description: string;
    cta_button: string;
    collection_label: string;
    collection_title: string;
    view_all: string;
}> = {
    en: {
        tagline: "Est. 1990 — The Master's Touch",
        hero_title: "Legacy Carved by Hand",
        hero_description: "Founded by a family of artisans in 1990. Every pair is meticulously hand-lasted by our master craftsman, preserving the sacred traditions of the Steppe in every stitch.",
        cta_button: "VIEW THE CRAFTSMANSHIP",
        collection_label: "Excellence in Every Stitch",
        collection_title: "Featured Masterpieces",
        view_all: "View All Products",
    },
    mn: {
        tagline: "1990 онд үүсгэн байгуулагдсан — Мастерын хүрэл",
        hero_title: "Гараар сийлсэн өв уламжлал",
        hero_description: "1990 онд урчуудын гэр бүлээс үүсгэн байгуулагдсан. Гутал бүр бидний мастер урчуудын гараар нямбай хийгдэж, Монголын өвийн уламжлалыг оёдол бүрт хадгалж байна.",
        cta_button: "УРЧУУДЫН УРЛАГИЙГ ҮЗЭХ",
        collection_label: "Оёдол бүрт шилдэг чанар",
        collection_title: "Онцлох бүтээлүүд",
        view_all: "Бүх бүтээгдэхүүнийг үзэх",
    },
};

interface PageProps {
    params: { locale: string };
}

export default function LocaleHome({ params: { locale } }: PageProps) {
    // Validate locale
    if (!isValidLocale(locale)) {
        notFound();
    }

    const t = translations[locale];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
                <div className="relative z-10 w-full">
                    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 py-12 lg:py-0">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0">
              
                            {/* Mobile: Image First */}
                            <div className="lg:hidden w-full mb-12">
                                <Image
                                    src="/images/hero-image.jpg"
                                    alt="The Master Craftsman hand-lasting a boot"
                                    width={600}
                                    height={700}
                                    className="w-full max-w-lg mx-auto h-auto"
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
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <Link
                            href={`/${locale}/shop`}
                            className="inline-flex items-center space-x-2 text-black hover:text-cognac font-medium border-b-2 border-gold pb-1 transition-colors text-lg"
                        >
                            <span>{t.view_all}</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
