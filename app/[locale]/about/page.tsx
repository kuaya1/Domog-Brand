import Image from 'next/image';
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
            {/* Brand Manifesto - Hero with Background Image */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Light Overlay */}
                <Image
                    src="/images/88cd1cc8-dec1-4d2f-b1ab-0ba751f7862e.jpg"
                    alt={t.manifesto_title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Light Overlay for Contrast */}
                <div className="absolute inset-0 bg-white/40" />
                
                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 lg:px-8 py-32 text-center relative z-10">
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-cognac mb-8">
                        {t.manifesto_label}
                    </p>
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black font-medium leading-tight mb-12">
                        {t.manifesto_title}
                    </h1>
                    <div className="w-16 h-px bg-gold mx-auto" />
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
                        <div className="order-1 lg:order-2 relative h-[500px] flex items-center justify-center p-12">
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
                        <div className="relative h-[500px] flex items-center justify-center p-12">
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
                    <div className="mt-20 relative h-80 lg:h-96 flex items-center justify-center">
                        {/* Spotlight Effect */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1/2 h-2/3 bg-gold-600/20 blur-3xl rounded-full" />
                        </div>
                        
                        {/* Boot Image */}
                        <div className="relative w-full h-full p-8">
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
