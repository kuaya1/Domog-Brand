import Link from 'next/link';
import { type Locale } from '@/lib/i18n/config';
import { pageBreadcrumb } from '@/lib/seo/structured-data';
import { CONTACT_EMAIL } from '@/lib/contact';

export interface LegalSection {
    title: string;
    body: string;
    list?: string[];
}

interface LegalPageProps {
    locale: Locale;
    path: string;
    eyebrow: string;
    title: string;
    updated: string;
    sections: LegalSection[];
    org: string;
    address: string[];
    backLabel: string;
}

/** Shared layout for the privacy and terms pages. */
export default function LegalPage({ locale, path, eyebrow, title, updated, sections, org, address, backLabel }: LegalPageProps) {
    return (
        <div className="min-h-screen bg-cream">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageBreadcrumb(locale, path, title)) }} />

            <section className="bg-charcoal-900 pt-32 pb-16 lg:pt-36 lg:pb-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4">{eyebrow}</span>
                    <h1 className="font-serif text-3xl lg:text-4xl text-cream font-medium">{title}</h1>
                    <p className="text-cream/60 text-sm mt-4">{updated}</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    {sections.map((section, index) => (
                        <div key={section.title}>
                            <h2 className={`font-serif text-2xl text-charcoal-900 mb-4 ${index > 0 ? 'mt-10' : ''}`}>{section.title}</h2>
                            <p className="text-stone-warm leading-relaxed mb-4">{section.body}</p>
                            {section.list && (
                                <ul className="list-disc pl-5 text-stone-warm space-y-2 mb-6">
                                    {section.list.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    <address className="not-italic bg-cream-sand p-6 border-l-2 border-gold/30 mt-2">
                        <p className="text-charcoal-900 font-medium">{org}</p>
                        {address.map((line) => (
                            <p key={line} className="text-stone-warm">
                                {line}
                            </p>
                        ))}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-cognac mt-2 inline-block break-all">
                            {CONTACT_EMAIL}
                        </a>
                    </address>

                    <div className="mt-12 pt-8 border-t border-cream-200">
                        <Link href={`/${locale}`} className="text-cognac hover:text-cognac/80 transition-colors text-sm uppercase tracking-wider">
                            ← {backLabel}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
