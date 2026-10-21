import type { Metadata } from 'next';
import { isValidLocale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
    const locale = isValidLocale(params.locale) ? params.locale : 'en';
    const t = getMessages(locale);
    return buildMetadata({
        locale,
        path: '/cart',
        title: t.meta.bag.title,
        description: t.meta.bag.description,
        noindex: true,
    });
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return children;
}
