import type { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

/** The host production serves. The apex domain redirects here. */
export const SITE_URL = 'https://www.domogbrand.com';

/** Absolute URL of a page in a given locale. `path` starts with "/" or is empty for the home page. */
export function localizedUrl(locale: Locale, path = ''): string {
    return `${SITE_URL}/${locale}${path}`;
}

export function absoluteUrl(path: string): string {
    return path.startsWith('http') ? path : `${SITE_URL}${encodeURI(path)}`;
}

/** hreflang alternates for a path: every locale plus x-default. */
export function languageAlternates(path: string): Record<string, string> {
    return {
        ...Object.fromEntries(locales.map((l) => [l, localizedUrl(l, path)])),
        'x-default': localizedUrl(defaultLocale, path),
    };
}

interface PageMetadataInput {
    locale: Locale;
    /** Path after the locale, e.g. "/shop" or "" for the home page. */
    path: string;
    title: string;
    description: string;
    /** Site-relative or absolute image URL for link previews. */
    image?: string;
    /** Use the title as-is instead of appending the site name. */
    absoluteTitle?: boolean;
    noindex?: boolean;
}

/**
 * Every page builds its metadata here, so each one gets its own canonical
 * URL and language alternates instead of inheriting the home page's.
 */
export function buildMetadata({
    locale,
    path,
    title,
    description,
    image,
    absoluteTitle,
    noindex,
}: PageMetadataInput): Metadata {
    const t = getMessages(locale);
    const url = localizedUrl(locale, path);
    const images = image ? [absoluteUrl(image)] : undefined;

    return {
        title: absoluteTitle ? { absolute: title } : title,
        description,
        alternates: {
            canonical: url,
            languages: languageAlternates(path),
        },
        openGraph: {
            type: 'website',
            url,
            siteName: t.meta.siteName,
            title,
            description,
            locale: locale === 'mn' ? 'mn_MN' : 'en_US',
            images,
        },
        twitter: {
            card: images ? 'summary_large_image' : 'summary',
            title,
            description,
            images,
        },
        robots: noindex ? { index: false, follow: true } : undefined,
    };
}
