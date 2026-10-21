import type { Metadata } from 'next';
import { isValidLocale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { buildMetadata, localizedUrl } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    return buildMetadata({ locale, path: '/shop', title: t.meta.shop.title, description: t.meta.shop.description });
}

export default function ShopLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    const breadcrumb = breadcrumbSchema([
        { name: t.common.home, url: localizedUrl(locale) },
        { name: t.nav.collection, url: localizedUrl(locale, '/shop') },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            {children}
        </>
    );
}
