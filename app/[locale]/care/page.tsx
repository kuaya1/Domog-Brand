import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';
import { pageBreadcrumb } from '@/lib/seo/structured-data';
import CareContent from './CareContent';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    return buildMetadata({ locale, path: '/care', title: t.meta.care.title, description: t.meta.care.description });
}

export default function CarePage({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }

    const breadcrumb = pageBreadcrumb(locale, '/care', getMessages(locale).meta.care.title);
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <CareContent locale={locale} />
        </>
    );
}
