'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { locales, localeNames, type Locale } from '@/lib/i18n/config';
import { useLocale, switchLocaleInPath } from '@/lib/i18n/navigation';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    
    const currentLocale = useLocale();
    const nextLocale: Locale = currentLocale === 'en' ? 'mn' : 'en';

    const switchLocale = () => {
        startTransition(() => {
            const newPath = switchLocaleInPath(pathname, nextLocale);
            router.push(newPath);
        });
    };

    return (
        <button
            onClick={switchLocale}
            disabled={isPending}
            className="text-xs font-medium tracking-widest uppercase px-3 py-1.5 border border-cognac-accessible/30 text-cognac-accessible hover:bg-cognac-accessible/10 transition-all duration-300 disabled:opacity-50"
            aria-label={`Switch to ${localeNames[nextLocale]}`}
        >
            {isPending ? '...' : localeNames[nextLocale]}
        </button>
    );
}
