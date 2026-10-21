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
    return buildMetadata({ locale, path: '/terms', title: t.meta.terms.title, description: t.meta.terms.description });
}

/** Date the terms below were last changed (date-only, formatted in UTC). */
const LAST_UPDATED = '2025-12-27';

/**
 * Terms unchanged from the published page; only localized dates and address
 * were added. Section 3 describes card and bank-transfer payment, which the
 * website does not currently take (orders are arranged by contact); see
 * docs/content/OPEN-QUESTIONS.md.
 */
const content = {
    en: {
        eyebrow: 'Legal',
        title: 'Terms of service',
        updated: 'Last updated:',
        sections: [
            {
                title: '1. Agreement to terms',
                body: "By accessing or using Domog Brand's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
            },
            {
                title: '2. Products and orders',
                body: 'All Domog boots are handcrafted to order. By placing an order:',
                list: [
                    'You acknowledge production time of 4–8 weeks',
                    'Custom orders cannot be cancelled once production begins',
                    'Prices are in USD unless otherwise stated',
                    'Colors may vary slightly due to natural leather characteristics',
                ],
            },
            {
                title: '3. Pricing and payment',
                body: 'All prices are displayed in USD. Payment is required in full at the time of order. We accept major credit cards and bank transfers. Prices are subject to change without notice, but confirmed orders will be honored at the quoted price.',
            },
            {
                title: '4. Intellectual property',
                body: 'All content on this website, including designs, images, text, and the Domog Brand name and logo, are the intellectual property of Domog Brand. You may not reproduce, distribute, or use our content without written permission.',
            },
            {
                title: '5. Limitation of liability',
                body: 'Domog Brand shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.',
            },
            {
                title: '6. Governing law',
                body: 'These terms are governed by the laws of Mongolia. Any disputes shall be resolved in the courts of Ulaanbaatar, Mongolia.',
            },
            {
                title: '7. Changes to terms',
                body: 'We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of our services constitutes acceptance of the modified terms.',
            },
            { title: '8. Contact', body: 'For questions about these terms, please contact us:' },
        ],
        org: 'Domog Brand',
    },
    mn: {
        eyebrow: 'Хууль эрх зүй',
        title: 'Үйлчилгээний нөхцөл',
        updated: 'Сүүлд шинэчилсэн:',
        sections: [
            {
                title: '1. Нөхцөлийг зөвшөөрөх',
                body: 'Домог Брэндийн вэбсайт, үйлчилгээг ашигласнаар та эдгээр Үйлчилгээний нөхцөлийг дагаж мөрдөхийг зөвшөөрч байна. Хэрэв та эдгээр нөхцөлийг зөвшөөрөхгүй бол манай үйлчилгээг бүү ашиглана уу.',
            },
            {
                title: '2. Бүтээгдэхүүн ба захиалга',
                body: 'Бүх Домог гутал захиалгаар гараар хийгддэг. Захиалга өгснөөр:',
                list: [
                    'Та 4–8 долоо хоногийн хийх хугацааг хүлээн зөвшөөрч байна',
                    'Тусгай захиалгыг хийж эхэлсний дараа цуцлах боломжгүй',
                    'Үнэ нь өөрөөр заагаагүй бол ам.доллараар (USD) тооцогдоно',
                    'Байгалийн арьсны онцлогоос шалтгаалан өнгө бага зэрэг өөр байж болно',
                ],
            },
            {
                title: '3. Үнэ ба төлбөр',
                body: 'Бүх үнийг ам.доллараар (USD) харуулсан. Захиалга өгөхдөө төлбөрийг бүрэн төлөх шаардлагатай. Бид гол нэрийн кредит карт болон банкны шилжүүлгийг хүлээн авдаг. Үнэ урьдчилан мэдэгдэлгүйгээр өөрчлөгдөж болох боловч баталгаажсан захиалгыг зарласан үнээр нь биелүүлнэ.',
            },
            {
                title: '4. Оюуны өмч',
                body: 'Энэхүү вэбсайт дээрх бүх агуулга, түүний дотор дизайн, зураг, текст, Домог Брэндийн нэр, лого нь Домог Брэндийн оюуны өмч юм. Та бичгээр зөвшөөрөл авалгүйгээр манай агуулгыг хуулбарлах, түгээх, ашиглах эрхгүй.',
            },
            {
                title: '5. Хариуцлагын хязгаарлалт',
                body: 'Домог Брэнд нь манай бүтээгдэхүүн, үйлчилгээг ашигласнаас үүдэлтэй шууд бус, санамсаргүй, онцгой, эсвэл үр дагаварт хохирлыг хариуцахгүй. Манай хариуцлага бүтээгдэхүүний худалдан авалтын үнээр хязгаарлагдана.',
            },
            {
                title: '6. Хэрэглэх хууль',
                body: 'Эдгээр нөхцөл нь Монгол Улсын хуулиар зохицуулагдана. Аливаа маргааныг Улаанбаатар хотын шүүхээр шийдвэрлэнэ.',
            },
            {
                title: '7. Нөхцөлийн өөрчлөлт',
                body: 'Бид эдгээр нөхцөлийг хэдийд ч өөрчлөх эрхтэй. Өөрчлөлтийг шинэчилсэн огноотой хамт энэ хуудсанд нийтэлнэ. Манай үйлчилгээг үргэлжлүүлэн ашигласнаар та өөрчилсөн нөхцөлийг хүлээн зөвшөөрсөнд тооцогдоно.',
            },
            { title: '8. Холбоо барих', body: 'Эдгээр нөхцөлийн талаар асуулт байвал бидэнтэй холбогдоно уу:' },
        ],
        org: 'Домог Брэнд',
    },
} satisfies Record<Locale, unknown>;

export default function TermsPage({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }

    const c = content[locale];
    const t = getMessages(locale);

    return (
        <LegalPage
            locale={locale}
            path="/terms"
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
