import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Truck, Globe, RefreshCw, Clock, Shield, Package } from 'lucide-react';
import { locales, isValidLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';
import { pageBreadcrumb } from '@/lib/seo/structured-data';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    return buildMetadata({ locale, path: '/shipping', title: t.meta.shipping.title, description: t.meta.shipping.description });
}

/**
 * Policy text in both languages. Rates, times, thresholds, and eligibility
 * are unchanged from the published page. This pass only labels production
 * time and transit time separately, and removes a promotional quotation
 * ("forty hours to craft, forty years to last").
 */
const content = {
    en: {
        eyebrow: 'Delivery',
        title: 'Shipping & returns',
        intro: 'Production times, shipping rates, and our returns policy.',
        features: [
            { title: 'Free shipping', body: 'On orders over $500 USD' },
            { title: 'Worldwide delivery', body: 'We ship to over 50 countries' },
            { title: 'Insured shipping', body: 'Full coverage on all orders' },
        ],
        productionTitle: 'Production time',
        productionBody: 'Production time is how long we need to prepare your pair before it ships. Shipping time is added after dispatch.',
        production: ['Standard production: 4–6 weeks', 'Bespoke orders: 6–8 weeks', 'Rush orders: contact us for availability'],
        ratesTitle: 'Shipping rates and times',
        columns: { region: 'Region', standard: 'Standard', express: 'Express', transit: 'Transit time after dispatch' },
        free: 'Free',
        days: 'days',
        regions: ['Mongolia', 'Asia Pacific', 'Europe', 'North America', 'Rest of world'],
        freeNote: '* Free shipping on orders over $500 USD to all destinations.',
        expressNote: 'Express shipping shortens transit time only. It does not shorten production time.',
        returnsTitle: 'Returns & exchanges',
        returnsIntro: 'Our returns policy:',
        returns: ['30-day return window for unworn boots', 'Free exchanges for sizing issues', 'Full refund to original payment method'],
        nonReturnableTitle: 'Non-returnable items',
        nonReturnable: ['Custom/bespoke orders', 'Boots showing signs of wear', 'Items without original packaging', 'Sale items (final sale)'],
        questionsTitle: 'Questions about your order?',
        questionsBody: 'Contact us with any shipping or returns question.',
        contact: 'Contact us',
    },
    mn: {
        eyebrow: 'Хүргэлт',
        title: 'Хүргэлт, буцаалт',
        intro: 'Хийх хугацаа, хүргэлтийн үнэ, буцаалтын нөхцөл.',
        features: [
            { title: 'Үнэгүй хүргэлт', body: '$500-аас дээш захиалгад' },
            { title: 'Дэлхий даяар хүргэлт', body: '50 гаруй улсад хүргэнэ' },
            { title: 'Даатгалтай хүргэлт', body: 'Бүх захиалгад бүрэн даатгал' },
        ],
        productionTitle: 'Хийх хугацаа',
        productionBody: 'Хийх хугацаа гэдэг нь гутлыг илгээхээс өмнө бэлтгэхэд шаардагдах хугацаа юм. Хүргэлтийн хугацаа илгээсний дараа нэмэгдэнэ.',
        production: ['Стандарт хийх хугацаа: 4–6 долоо хоног', 'Тусгай захиалга: 6–8 долоо хоног', 'Яаралтай захиалга: боломжийг бидэнтэй холбогдож лавлана уу'],
        ratesTitle: 'Хүргэлтийн үнэ, хугацаа',
        columns: { region: 'Бүс нутаг', standard: 'Энгийн', express: 'Шуурхай', transit: 'Илгээснээс хойшх хүргэлтийн хугацаа' },
        free: 'Үнэгүй',
        days: 'хоног',
        regions: ['Монгол', 'Ази, Номхон далайн бүс', 'Европ', 'Хойд Америк', 'Бусад улс'],
        freeNote: '* $500-аас дээш захиалгад бүх улсад хүргэлт үнэгүй.',
        expressNote: 'Шуурхай хүргэлт зөвхөн хүргэлтийн хугацааг богиносгоно. Хийх хугацаанд нөлөөлөхгүй.',
        returnsTitle: 'Буцаалт, солилт',
        returnsIntro: 'Буцаалтын нөхцөл:',
        returns: [
            'Өмсөөгүй гутлыг 30 хоногийн дотор буцаах боломжтой',
            'Хэмжээ таараагүй бол үнэгүй солино',
            'Анх төлсөн хэлбэрээр төлбөрийг бүрэн буцаана',
        ],
        nonReturnableTitle: 'Буцаах боломжгүй',
        nonReturnable: ['Тусгай захиалга', 'Өмссөн ул мөртэй гутал', 'Анхны савлагаагүй бүтээгдэхүүн', 'Хямдралтай бараа (эцсийн худалдаа)'],
        questionsTitle: 'Захиалгын талаар асуух зүйл байна уу?',
        questionsBody: 'Хүргэлт, буцаалтын талаар асуух зүйлээ бидэнд илгээгээрэй.',
        contact: 'Холбоо барих',
    },
} satisfies Record<Locale, unknown>;

/** Published rates in USD and transit days per region, in the order of content.regions. */
const RATES = [
    { standard: 0, express: 15, days: '2–5' },
    { standard: 35, express: 65, days: '7–14' },
    { standard: 45, express: 85, days: '10–18' },
    { standard: 45, express: 95, days: '10–21' },
    { standard: 55, express: 110, days: '14–28' },
];

const FEATURE_ICONS = [Truck, Globe, Shield];

export default function ShippingPage({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }

    const c = content[locale];
    const breadcrumb = pageBreadcrumb(locale, '/shipping', c.title);

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
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {c.features.map((feature, index) => {
                            const Icon = FEATURE_ICONS[index];
                            return (
                                <div key={feature.title} className="text-center p-8 bg-cream-sand border border-cream-200">
                                    <div className="w-14 h-14 bg-cream flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-7 h-7 text-cognac" aria-hidden="true" />
                                    </div>
                                    <h2 className="font-serif text-lg text-charcoal-900 mb-2">{feature.title}</h2>
                                    <p className="text-stone-warm text-sm">{feature.body}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="space-y-16">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-5 h-5 text-cognac" aria-hidden="true" />
                                <h2 className="font-serif text-2xl text-charcoal-900">{c.productionTitle}</h2>
                            </div>
                            <p className="text-stone-warm leading-relaxed mb-4">{c.productionBody}</p>
                            <ul className="space-y-3 text-stone-warm">
                                {c.production.map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <span className="text-cognac" aria-hidden="true">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Package className="w-5 h-5 text-cognac" aria-hidden="true" />
                                <h2 className="font-serif text-2xl text-charcoal-900">{c.ratesTitle}</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse min-w-[520px]">
                                    <thead>
                                        <tr className="border-b-2 border-charcoal-900 text-left">
                                            <th className="py-4 pr-6 font-medium text-charcoal-900">{c.columns.region}</th>
                                            <th className="py-4 pr-6 font-medium text-charcoal-900">{c.columns.standard}</th>
                                            <th className="py-4 pr-6 font-medium text-charcoal-900">{c.columns.express}</th>
                                            <th className="py-4 font-medium text-charcoal-900">{c.columns.transit}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-stone-warm">
                                        {RATES.map((rate, index) => (
                                            <tr key={c.regions[index]} className="border-b border-cream-200 last:border-b-0">
                                                <td className="py-4 pr-6">{c.regions[index]}</td>
                                                <td className="py-4 pr-6">{rate.standard === 0 ? c.free : `$${rate.standard}`}</td>
                                                <td className="py-4 pr-6">${rate.express}</td>
                                                <td className="py-4 whitespace-nowrap">
                                                    {rate.days} {c.days}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-stone-warm text-sm mt-4">{c.freeNote}</p>
                            <p className="text-stone-warm text-sm mt-2">{c.expressNote}</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <RefreshCw className="w-5 h-5 text-cognac" aria-hidden="true" />
                                    <h2 className="font-serif text-2xl text-charcoal-900">{c.returnsTitle}</h2>
                                </div>
                                <p className="text-stone-warm leading-relaxed mb-4">{c.returnsIntro}</p>
                                <ul className="space-y-3 text-stone-warm">
                                    {c.returns.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="text-cognac" aria-hidden="true">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-burgundy-700/10 p-8 border border-burgundy-700/20">
                                <h3 className="font-medium text-charcoal-900 mb-3">{c.nonReturnableTitle}</h3>
                                <ul className="space-y-2 text-stone-warm text-sm">
                                    {c.nonReturnable.map((item) => (
                                        <li key={item}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-16 border-t border-cream-200 text-center">
                        <h2 className="font-serif text-xl text-charcoal-900 mb-4">{c.questionsTitle}</h2>
                        <p className="text-stone-warm mb-6">{c.questionsBody}</p>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-2 bg-charcoal-900 text-cream-50 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
                        >
                            {c.contact}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
