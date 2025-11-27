import { locales, isValidLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export default function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
    // Validate locale
    if (!isValidLocale(locale)) {
        notFound();
    }

    return <>{children}</>;
}
