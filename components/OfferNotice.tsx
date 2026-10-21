'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Gift, Copy, Check } from 'lucide-react';
import { useMessages } from '@/lib/i18n/use-messages';
import { format } from '@/lib/i18n/messages';

interface OfferNoticeProps {
    /** Delay before showing (ms). */
    delay?: number;
    /** Also show when the pointer leaves the top of the window. */
    exitIntent?: boolean;
}

/** Same key the earlier newsletter popup used, so visitors who dismissed it are not shown it again early. */
const STORAGE_KEY = 'domog-newsletter-popup';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000;

/** The welcome code accepted by the bag (lib/stores/cart-store.ts). */
const OFFER_CODE = 'WELCOME10';

function wasRecentlyDismissed(): boolean {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return false;
        const data = JSON.parse(stored);
        return Date.now() - data.timestamp < DISMISS_DURATION;
    } catch {
        return false;
    }
}

/**
 * Tells visitors about the existing first-order code. It replaces a popup
 * that asked for an email address, kept it only in the browser, and then
 * claimed the code had been sent by email.
 */
export function OfferNotice({ delay = 15000, exitIntent = true }: OfferNoticeProps) {
    const { t } = useMessages();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const hasTriggered = useRef(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    const open = useCallback(() => {
        if (hasTriggered.current || wasRecentlyDismissed()) return;
        hasTriggered.current = true;
        setIsOpen(true);
    }, []);

    // The old popup stored the visitor's email in this key. Drop it, keep the timestamp.
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const data = stored ? JSON.parse(stored) : null;
            if (data?.email) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissed: true, timestamp: data.timestamp }));
            }
        } catch {
            // Ignore unreadable storage
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(open, delay);
        const handleMouseLeave = (e: MouseEvent) => e.clientY <= 0 && open();
        if (exitIntent) document.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [delay, exitIntent, open]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissed: true, timestamp: Date.now() }));
        } catch {
            // Ignore unavailable storage
        }
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        closeRef.current?.focus();
        const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, handleClose]);

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(OFFER_CODE);
            setCopied(true);
        } catch {
            // Clipboard unavailable: the code stays visible to copy by hand
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="offer-title">
            <div className="absolute inset-0 bg-charcoal-900/70 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />

            <div className="relative w-full max-w-md bg-cream shadow-2xl animate-scale-in p-8 md:p-12 text-center">
                <button
                    ref={closeRef}
                    type="button"
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-stone-warm hover:text-charcoal-900 transition-colors"
                    aria-label={t.common.close}
                >
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Gift className="h-8 w-8 text-gold-700" aria-hidden="true" />
                </div>
                <h2 id="offer-title" className="font-serif text-2xl md:text-3xl text-charcoal-900 mb-3">
                    {t.offer.title}
                </h2>
                <p className="text-stone-warm mb-6">{format(t.offer.body, { code: OFFER_CODE })}</p>

                <div className="flex items-center justify-center gap-3 bg-charcoal-900 text-cream-50 px-5 py-3 mb-6">
                    <span className="text-cream-300 text-sm">{t.offer.codeLabel}</span>
                    <span className="font-mono text-lg">{OFFER_CODE}</span>
                    <button
                        type="button"
                        onClick={copyCode}
                        className="ml-2 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300"
                    >
                        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                        <span aria-live="polite">{copied ? t.offer.copied : t.offer.copy}</span>
                    </button>
                </div>

                <button type="button" onClick={handleClose} className="text-sm text-stone-warm hover:text-charcoal-900 underline underline-offset-4">
                    {t.offer.dismiss}
                </button>
            </div>
        </div>
    );
}

export default OfferNotice;
