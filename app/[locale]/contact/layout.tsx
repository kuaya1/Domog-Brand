import type { Metadata } from 'next';
import { isValidLocale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';
import { pageBreadcrumb } from '@/lib/seo/structured-data';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    return buildMetadata({ locale, path: '/contact', title: t.meta.contact.title, description: t.meta.contact.description });
}

export default function ContactLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const breadcrumb = pageBreadcrumb(locale, '/contact', getMessages(locale).nav.contact);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            {children}
        </>
    );
}
