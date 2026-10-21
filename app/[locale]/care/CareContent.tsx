import Link from 'next/link';
import { Droplets, Wind, Moon, RefreshCw, Heart, Shield } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { careContent } from './content';

export default function CareContent({ locale }: { locale: Locale }) {
    const c = careContent[locale];
    const sections = [
        { icon: Droplets, title: c.dailyTitle, paragraphs: c.daily },
        { icon: Moon, title: c.monthlyTitle, paragraphs: c.monthly, products: true },
        { icon: RefreshCw, title: c.storageTitle, paragraphs: c.storage },
        { icon: Wind, title: c.waterTitle, paragraphs: c.water, important: true },
    ];

    return (
        <div className="min-h-screen bg-cream">
            <section className="bg-charcoal-900 pt-36 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,169,97,0.4)_0%,_transparent_50%)]" />
                </div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-6">{c.eyebrow}</span>
                    <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream font-medium tracking-tight mb-6">{c.title}</h1>
                    <p className="text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">{c.intro}</p>
                </div>
            </section>

            {sections.map(({ icon: Icon, title, paragraphs, products, important }) => (
                <section key={title} className="py-16 lg:py-20 border-b border-cream-200">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-gold-700" aria-hidden="true" />
                            </div>
                            <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 font-medium">{title}</h2>
                        </div>
                        <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                            {paragraphs.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>

                        {products && (
                            <div className="mt-10 bg-cream-sand rounded-lg p-6">
                                <h3 className="font-medium text-charcoal-900 mb-4 flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-gold-700" aria-hidden="true" />
                                    {c.productsTitle}
                                </h3>
                                <ul className="space-y-2 text-stone-warm">
                                    {c.products.map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <span className="text-gold-700" aria-hidden="true">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {important && (
                            <div className="mt-10 bg-cognac/10 border border-cognac/20 rounded-lg p-6">
                                <h3 className="font-medium text-cognac mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4" aria-hidden="true" />
                                    {c.importantTitle}
                                </h3>
                                <p className="text-stone-warm text-sm">{c.important}</p>
                            </div>
                        )}
                    </div>
                </section>
            ))}

            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 mb-4">{c.questionsTitle}</h2>
                    <p className="text-stone-warm mb-8">{c.questionsBody}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={`/${locale}/contact?inquiry=care`}
                            className="inline-flex items-center gap-2 bg-charcoal-900 text-cream-50 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
                        >
                            {c.contact}
                        </Link>
                        <Link
                            href={`/${locale}/warranty`}
                            className="inline-flex items-center gap-2 border border-charcoal-900 text-charcoal-900 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-900 hover:text-cream-50 transition-colors"
                        >
                            {c.warranty}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
