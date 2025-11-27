import { type Locale } from './config';

// Import translations statically for SSG compatibility
import en from '@/messages/en.json';
import mn from '@/messages/mn.json';

const messages: Record<Locale, typeof en> = {
    en,
    mn,
};

export type Messages = typeof en;
export type MessageKey = keyof Messages;

/**
 * Get translations for a specific locale (Server Component compatible)
 */
export function getTranslations(locale: Locale): Messages {
    return messages[locale] || messages.en;
}

/**
 * Get a specific namespace of translations
 */
export function getNamespace<K extends MessageKey>(
    locale: Locale,
    namespace: K
): Messages[K] {
    const t = getTranslations(locale);
    return t[namespace];
}

/**
 * Helper to safely get nested translation values
 */
export function t(
    locale: Locale,
    namespace: MessageKey,
    key: string
): string {
    const translations = getTranslations(locale);
    const ns = translations[namespace] as Record<string, string>;
    return ns?.[key] || key;
}
