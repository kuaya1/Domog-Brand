import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale, type Locale } from '@/lib/i18n/config';
import { getMessages, formatDate } from '@/lib/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';
import LegalPage from '@/components/LegalPage';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    return buildMetadata({ locale, path: '/privacy', title: t.meta.privacy.title, description: t.meta.privacy.description });
}

/** Date the policy text below was last changed (date-only, formatted in UTC). */
const LAST_UPDATED = '2025-12-27';

/** Policy text unchanged from the published page; only localized dates and address were added. */
const content = {
    en: {
        eyebrow: 'Legal',
        title: 'Privacy policy',
        updated: 'Last updated:',
        sections: [
            {
                title: '1. Information we collect',
                body: 'At Domog Brand, we collect information you provide directly when you place an order, contact our atelier, or subscribe to our newsletter. This includes your name, email address, shipping address, phone number, and payment information.',
            },
            {
                title: '2. How we use your information',
                body: 'We use your information to:',
                list: [
                    'Process and fulfill your orders',
                    'Communicate about your order',
                    'Send updates about new collections (if subscribed)',
                    'Improve our craftsmanship and services',
                    'Comply with legal obligations',
                ],
            },
            {
                title: '3. Information sharing',
                body: 'We do not sell your personal information. We share data only with trusted partners necessary to fulfill your order: shipping carriers, payment processors, and our workshop team. All partners are bound by confidentiality agreements.',
            },
            {
                title: '4. Data security',
                body: 'We implement industry-standard security measures to protect your information. All transactions are encrypted using SSL technology. We retain your data only as long as necessary to provide our services and comply with legal requirements.',
            },
            {
                title: '5. Your rights',
                body: 'You have the right to:',
                list: [
                    'Access your personal data',
                    'Request correction of inaccurate data',
                    'Request deletion of your data',
                    'Unsubscribe from marketing communications',
                ],
            },
            {
                title: '6. Cookies',
                body: 'We use essential cookies to ensure our website functions properly. We also use analytics cookies to understand how visitors interact with our site, helping us improve your experience.',
            },
            { title: '7. Contact us', body: 'For privacy-related inquiries, please contact us at:' },
        ],
        org: 'Domog Brand',
    },
    mn: {
        eyebrow: 'Хууль эрх зүй',
        title: 'Нууцлалын бодлого',
        updated: 'Сүүлд шинэчилсэн:',
        sections: [
            {
                title: '1. Бидний цуглуулдаг мэдээлэл',
                body: 'Домог Брэнд нь таныг захиалга өгөх, манай урлантай холбогдох, эсвэл мэдээллийн товхимолд бүртгүүлэхэд шууд өгсөн мэдээллийг цуглуулдаг. Үүнд таны нэр, имэйл хаяг, хүргэлтийн хаяг, утасны дугаар, төлбөрийн мэдээлэл багтана.',
            },
            {
                title: '2. Таны мэдээллийг хэрхэн ашигладаг',
                body: 'Бид таны мэдээллийг дараах зорилгоор ашигладаг:',
                list: [
                    'Таны захиалгыг боловсруулж, биелүүлэх',
                    'Таны захиалгын талаар холбогдох',
                    'Шинэ цуглуулгын талаар мэдээлэл илгээх (бүртгүүлсэн бол)',
                    'Манай хийц, үйлчилгээг сайжруулах',
                    'Хуулийн шаардлагыг биелүүлэх',
                ],
            },
            {
                title: '3. Мэдээлэл хуваалцах',
                body: 'Бид таны хувийн мэдээллийг зардаггүй. Зөвхөн таны захиалгыг биелүүлэхэд шаардлагатай итгэмжлэгдсэн түншүүдтэй хуваалцдаг: тээврийн компаниуд, төлбөрийн системүүд, манай урлангийн баг. Бүх түншүүд нууцлалын гэрээгээр хязгаарлагддаг.',
            },
            {
                title: '4. Өгөгдлийн аюулгүй байдал',
                body: 'Бид таны мэдээллийг хамгаалахын тулд салбарын стандарт аюулгүй байдлын арга хэмжээг хэрэгжүүлдэг. Бүх гүйлгээ SSL технологи ашиглан шифрлэгддэг. Бид таны өгөгдлийг зөвхөн үйлчилгээ үзүүлэх, хуулийн шаардлагыг биелүүлэхэд шаардлагатай хугацаанд хадгалдаг.',
            },
            {
                title: '5. Таны эрхүүд',
                body: 'Танд дараах эрхүүд бий:',
                list: [
                    'Хувийн мэдээлэлдээ хандах',
                    'Буруу мэдээллийг засахыг хүсэх',
                    'Мэдээллээ устгахыг хүсэх',
                    'Маркетингийн мэдээллээс татгалзах',
                ],
            },
            {
                title: '6. Күүки',
                body: 'Манай вэбсайт зөв ажиллахын тулд зайлшгүй күүки ашигладаг. Мөн зочид вэбсайттай хэрхэн харилцдагийг ойлгохын тулд аналитик күүки ашиглаж, таны туршлагыг сайжруулахад тусалдаг.',
            },
            { title: '7. Холбоо барих', body: 'Нууцлалтай холбоотой асуултаа дараах хаягаар илгээнэ үү:' },
        ],
        org: 'Домог Брэнд',
    },
} satisfies Record<Locale, unknown>;

export default function PrivacyPage({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }

    const c = content[locale];
    const t = getMessages(locale);

    return (
        <LegalPage
            locale={locale}
            path="/privacy"
            eyebrow={c.eyebrow}
            title={c.title}
            updated={`${c.updated} ${formatDate(LAST_UPDATED, locale)}`}
            sections={c.sections}
            org={c.org}
            address={[t.footer.addressLine1, t.footer.addressLine2]}
            backLabel={t.common.backHome}
        />
    );
}
