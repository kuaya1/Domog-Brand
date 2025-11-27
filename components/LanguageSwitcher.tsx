'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { locales, defaultLocale, localeNames, type Locale } from '@/lib/i18n/config';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    // Determine current locale from pathname
    const getCurrentLocale = (): Locale => {
        for (const locale of locales) {
            if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
                return locale;
            }
        }
        return defaultLocale;
    };

    const currentLocale = getCurrentLocale();
    const nextLocale: Locale = currentLocale === 'en' ? 'mn' : 'en';

    const switchLocale = () => {
        startTransition(() => {
            let newPath: string;

            // Remove current locale prefix if present
            const pathWithoutLocale = pathname.replace(new RegExp(`^/(${locales.join('|')})`), '') || '/';

            if (nextLocale === defaultLocale) {
                // Switching to default locale - use path without prefix
                newPath = pathWithoutLocale;
            } else {
                // Switching to non-default locale - add prefix
                newPath = `/${nextLocale}${pathWithoutLocale}`;
            }

            router.push(newPath);
        });
    };

    return (
        <button
            onClick={switchLocale}
            disabled={isPending}
            className="text-xs font-medium tracking-widest uppercase px-3 py-1.5 border border-cognac/30 text-cognac hover:bg-cognac/10 transition-all duration-300 disabled:opacity-50"
            aria-label={`Switch to ${localeNames[nextLocale]}`}
        >
            {isPending ? '...' : localeNames[nextLocale]}
        </button>
    );
}
