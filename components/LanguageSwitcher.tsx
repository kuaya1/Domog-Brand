'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { localeNames, type Locale } from '@/lib/i18n/config';
import { switchLocaleInPath } from '@/lib/i18n/navigation';
import { useMessages } from '@/lib/i18n/use-messages';

/** Switches to the other language on the same page, keeping query string and hash. */
export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const { locale, t } = useMessages();
    const nextLocale: Locale = locale === 'en' ? 'mn' : 'en';

    const switchLocale = () => {
        const { search, hash } = window.location;
        startTransition(() => {
            router.push(`${switchLocaleInPath(pathname, nextLocale)}${search}${hash}`);
        });
    };

    return (
        <button
            type="button"
            onClick={switchLocale}
            disabled={isPending}
            lang={nextLocale}
            className="text-xs font-medium tracking-widest uppercase px-3 py-1.5 border border-cognac/30 text-cognac hover:bg-cognac/10 transition-all duration-300 disabled:opacity-50"
            aria-label={t.nav.switchLanguage}
        >
            {localeNames[nextLocale]}
        </button>
    );
}
