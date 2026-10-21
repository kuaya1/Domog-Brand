import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Wrench, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { locales, isValidLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';
import { pageBreadcrumb } from '@/lib/seo/structured-data';
import { CONTACT_EMAIL } from '@/lib/contact';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    return buildMetadata({ locale, path: '/warranty', title: t.meta.warranty.title, description: t.meta.warranty.description });
}

/**
 * Warranty terms in both languages. Coverage, exclusions, prices, turnaround,
 * and the claim process are unchanged from the published page. Removed: an
 * unattributed "Master Craftsman" quotation and the "built to last a
 * lifetime" tagline. Mongolian wording errors were corrected (buckle,
 * hyphenated suffixes). The "Our story" page previously promised free sole
 * replacement, which these terms exclude; see docs/content/OPEN-QUESTIONS.md.
 */
const content = {
    en: {
        eyebrow: 'Our promise',
        title: 'Lifetime Craftsmanship Warranty',
        intro: 'What our warranty covers, what it does not, and how to make a claim.',
        coveredTitle: 'What our warranty covers',
        covered: [
            'Structural defects in craftsmanship',
            'Stitching failures under normal use',
            'Sole separation from the upper',
            'Hardware defects (buckles, eyelets)',
            'Leather delamination or peeling',
            'Zipper malfunctions (where applicable)',
        ],
        notCoveredTitle: 'Not covered by the warranty',
        notCovered: [
            'Normal wear and tear (scuffs, creasing, patina development)',
            'Damage from improper care or storage',
            'Water damage (beyond normal exposure)',
            'Modifications or repairs by non-authorized parties',
            'Sole wear from regular use (resoling available)',
        ],
        serviceTitle: 'Resoling & refurbishment service',
        serviceIntro: 'Resoling and refurbishment are paid services:',
        service: ['Resoling: $85–120 depending on style', 'Full refurbishment: $150–200', 'Turnaround time: 2–3 weeks'],
        claimTitle: 'How to make a warranty claim',
        claim: [
            { title: 'Contact us', body: `Email ${CONTACT_EMAIL} with photos of the issue and your order number.` },
            { title: 'Assessment', body: 'Our team will review your claim within 48 hours and advise on next steps.' },
            { title: 'Send your boots', body: 'If approved, ship your boots to our workshop. We provide a prepaid label for warranty repairs.' },
            { title: 'Repair or replace', body: 'We will repair or, if not possible, replace your boots and return them to you.' },
        ],
        helpTitle: 'Need help with a warranty claim?',
        helpBody: 'Contact us with any question about your Domog boots.',
        help: 'Contact us',
    },
    mn: {
        eyebrow: 'Бидний амлалт',
        title: 'Насан туршийн хийцийн баталгаа',
        intro: 'Баталгаанд юу хамрагдах, юу хамрагдахгүй, хүсэлтээ хэрхэн гаргах тухай.',
        coveredTitle: 'Баталгаанд хамрагдах зүйлс',
        covered: [
            'Хийцийн бүтцийн гэмтэл',
            'Хэвийн хэрэглээнд гарсан оёдлын гэмтэл',
            'Ул гутлын дээд хэсгээс салах',
            'Төмөр эд ангийн гэмтэл (горхи, сүвний төмөр)',
            'Арьс давхаргаараа салах, хуурах',
            'Цахилгаан товчны гэмтэл (байгаа бол)',
        ],
        notCoveredTitle: 'Баталгаанд хамрагдахгүй зүйлс',
        notCovered: [
            'Хэвийн элэгдэл (зураас, үрчлээ, өнгө хувирах)',
            'Буруу арчилгаа, хадгалалтаас үүдсэн гэмтэл',
            'Усны гэмтэл (хэвийн хэрэглээнээс давсан)',
            'Зөвшөөрөлгүй этгээдийн өөрчлөлт, засвар',
            'Хэрэглээнээс болсон улны элэгдэл (ул солих үйлчилгээ бий)',
        ],
        serviceTitle: 'Ул солих, сэргээх үйлчилгээ',
        serviceIntro: 'Ул солих, сэргээх нь төлбөртэй үйлчилгээ юм:',
        service: ['Ул солих: загвараас хамааран $85–120', 'Бүрэн сэргээлт: $150–200', 'Хугацаа: 2–3 долоо хоног'],
        claimTitle: 'Баталгааны хүсэлт гаргах',
        claim: [
            { title: 'Бидэнтэй холбогдох', body: `Гэмтлийн зураг, захиалгын дугаараа ${CONTACT_EMAIL} хаягаар илгээнэ үү.` },
            { title: 'Үнэлгээ', body: 'Манай баг таны хүсэлтийг 48 цагийн дотор хянаж, дараагийн алхмыг зөвлөнө.' },
            { title: 'Гутлаа илгээх', body: 'Зөвшөөрөгдсөн бол гутлаа манай урланд илгээнэ үү. Баталгаат засварт урьдчилан төлсөн хүргэлтийн шошго өгнө.' },
            { title: 'Засах эсвэл солих', body: 'Бид гутлыг тань засна, засах боломжгүй бол солиод буцааж илгээнэ.' },
        ],
        helpTitle: 'Баталгааны талаар тусламж хэрэгтэй юу?',
        helpBody: '«Домог»-ийн гутлынхаа талаар асуух зүйл байвал бидэнтэй холбогдоорой.',
        help: 'Холбоо барих',
    },
} satisfies Record<Locale, unknown>;

export default function WarrantyPage({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }

    const c = content[locale];
    const breadcrumb = pageBreadcrumb(locale, '/warranty', getMessages(locale).meta.warranty.title);

    return (
        <div className="min-h-screen bg-cream">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

            <section className="bg-charcoal-900 pt-32 pb-16 lg:pt-36 lg:pb-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4">{c.eyebrow}</span>
                    <h1 className="font-serif text-3xl lg:text-4xl text-cream font-medium">{c.title}</h1>
                    <p className="text-cream/70 text-base mt-4 max-w-2xl mx-auto">{c.intro}</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-8 flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-cognac" aria-hidden="true" />
                            {c.coveredTitle}
                        </h2>
                        <ul className="grid md:grid-cols-2 gap-6">
                            {c.covered.map((item) => (
                                <li key={item} className="flex items-start gap-3 p-4 bg-cream-sand">
                                    <Shield className="w-5 h-5 text-cognac flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span className="text-stone-warm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-8 flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-burgundy-700" aria-hidden="true" />
                            {c.notCoveredTitle}
                        </h2>
                        <div className="bg-burgundy-700/5 border border-burgundy-700/20 p-8">
                            <ul className="space-y-3 text-stone-warm">
                                {c.notCovered.map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <span className="text-burgundy-700" aria-hidden="true">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mb-16 bg-cream-sand p-8 lg:p-12">
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <div className="w-14 h-14 bg-cream flex items-center justify-center flex-shrink-0">
                                <Wrench className="w-7 h-7 text-cognac" aria-hidden="true" />
                            </div>
                            <div>
                                <h2 className="font-serif text-xl text-charcoal-900 mb-3">{c.serviceTitle}</h2>
                                <p className="text-stone-warm leading-relaxed mb-4">{c.serviceIntro}</p>
                                <ul className="space-y-2 text-stone-warm text-sm">
                                    {c.service.map((item) => (
                                        <li key={item}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-8 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-cognac" aria-hidden="true" />
                            {c.claimTitle}
                        </h2>
                        <ol className="space-y-6">
                            {c.claim.map((step, index) => (
                                <li key={step.title} className="flex gap-6">
                                    <span className="w-10 h-10 bg-charcoal-900 text-cream-50 flex items-center justify-center flex-shrink-0 font-medium">
                                        {index + 1}
                                    </span>
                                    <div className="min-w-0">
                                        <h3 className="font-medium text-charcoal-900 mb-1">{step.title}</h3>
                                        <p className="text-stone-warm break-words">{step.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="text-center pt-8 border-t border-cream-200">
                        <h2 className="font-serif text-xl text-charcoal-900 mb-4">{c.helpTitle}</h2>
                        <p className="text-stone-warm mb-6">{c.helpBody}</p>
                        <Link
                            href={`/${locale}/contact?inquiry=care`}
                            className="inline-flex items-center gap-2 bg-charcoal-900 text-cream-50 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
                        >
                            {c.help}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
