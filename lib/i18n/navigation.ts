'use client';

import { usePathname } from 'next/navigation';
import { locales, defaultLocale, type Locale } from './config';

/**
 * Get the current locale from the URL path
 */
export function useLocale(): Locale {
    const pathname = usePathname();
    const locale = locales.find(
        (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
    );
    return locale || defaultLocale;
}

/**
 * Create a localized path
 */
export function useLocalizedPath() {
    const locale = useLocale();
    
    return (path: string): string => {
        // If path already starts with a locale, return as-is
        if (locales.some(l => path.startsWith(`/${l}/`) || path === `/${l}`)) {
            return path;
        }
        
        // Ensure path starts with /
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        
        // Prepend the current locale
        return `/${locale}${normalizedPath}`;
    };
}

/**
 * Get path without locale prefix
 */
export function getPathWithoutLocale(pathname: string): string {
    for (const locale of locales) {
        if (pathname.startsWith(`/${locale}/`)) {
            return pathname.slice(locale.length + 1);
        }
        if (pathname === `/${locale}`) {
            return '/';
        }
    }
    return pathname;
}

/**
 * Switch the locale in a path
 */
export function switchLocaleInPath(pathname: string, newLocale: Locale): string {
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    return `/${newLocale}${pathWithoutLocale}`;
}
