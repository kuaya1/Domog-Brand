'use client';

import Link from 'next/link';
import { useMessages } from '@/lib/i18n/use-messages';

/** Shown when a page calls notFound(), for example an unknown product ID. */
export default function LocaleNotFound() {
    const { locale, t } = useMessages();

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-cream px-6 pt-32 pb-20">
            <div className="max-w-md text-center">
                <p className="font-serif text-6xl text-gold-600/40 mb-6" aria-hidden="true">
                    404
                </p>
                <h1 className="font-serif text-3xl text-charcoal-900 mb-4">{t.notFound.title}</h1>
                <p className="text-stone-warm mb-10">{t.notFound.body}</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center bg-charcoal-900 text-cream-50 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
                    >
                        {t.notFound.home}
                    </Link>
                    <Link
                        href={`/${locale}/shop`}
                        className="inline-flex items-center border border-charcoal-900 text-charcoal-900 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-900 hover:text-cream-50 transition-colors"
                    >
                        {t.notFound.collection}
                    </Link>
                </div>
            </div>
        </div>
    );
}
