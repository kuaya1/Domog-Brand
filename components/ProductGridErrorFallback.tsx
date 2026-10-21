'use client';

import { RefreshCw, PackageX } from 'lucide-react';
import { useMessages } from '@/lib/i18n/use-messages';

/** Shown when the product grid fails to render. */
export function ProductGridErrorFallback({ onRetry }: { onRetry?: () => void }) {
    const { t } = useMessages();

    return (
        <div className="col-span-full min-h-[400px] flex items-center justify-center px-6 py-20" role="alert">
            <div className="max-w-md text-center space-y-8">
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gold-600/10 flex items-center justify-center">
                        <PackageX className="w-10 h-10 text-gold-700" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="font-serif text-3xl text-charcoal-900 font-medium">{t.collection.loadErrorTitle}</h3>
                    <p className="font-sans text-base text-stone-warm leading-relaxed">{t.collection.loadErrorBody}</p>
                </div>
                <button
                    type="button"
                    onClick={() => (onRetry ? onRetry() : window.location.reload())}
                    className="inline-flex items-center gap-2 px-10 py-4 border-2 border-charcoal-900 text-sm uppercase tracking-[0.2em] font-medium text-charcoal-900 hover:bg-charcoal-900 hover:text-cream-50 transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-gold-600 focus:ring-offset-4"
                >
                    <RefreshCw className="w-4 h-4" aria-hidden="true" />
                    {t.common.retry}
                </button>
            </div>
        </div>
    );
}
