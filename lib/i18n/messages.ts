import en from '@/messages/en.json';
import mn from '@/messages/mn.json';
import { defaultLocale, isValidLocale, type Locale } from './config';

/**
 * Single source for interface and page copy in both languages.
 *
 * mn.json is type-checked against en.json, so a key missing from either
 * file fails the build instead of silently showing English on a Mongolian
 * page. tests/i18n.test.ts also rejects empty strings and mismatched
 * {placeholders}.
 */
export type Messages = typeof en;

const catalogs: Record<Locale, Messages> = { en, mn };

export interface PluralForms {
    one: string;
    other: string;
}

export function getMessages(locale: string): Messages {
    return catalogs[isValidLocale(locale) ? locale : defaultLocale];
}

/** Replace {name} placeholders. Unknown placeholders are left visible so they are caught in review. */
export function format(template: string, values: Record<string, string | number> = {}): string {
    return template.replace(/\{(\w+)\}/g, (match, key: string) =>
        key in values ? String(values[key]) : match
    );
}

/** Pick the plural form for a count and fill in {count}. */
export function plural(locale: Locale, count: number, forms: PluralForms): string {
    const form = new Intl.PluralRules(locale).select(count) === 'one' ? forms.one : forms.other;
    return format(form, { count });
}

/**
 * Prices are charged in USD in both languages. Formatting is deliberately
 * locale-independent so server and browser render identical text.
 */
export function formatPrice(amount: number): string {
    const fractionDigits = Number.isInteger(amount) ? 0 : 2;
    return `$${amount.toLocaleString('en-US', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: 2,
    })}`;
}

const DATE_LOCALES: Record<Locale, string> = { en: 'en-US', mn: 'mn-MN' };

/**
 * Format a date-only value (YYYY-MM-DD). Parsed and formatted in UTC so the
 * calendar day never shifts with the reader's time zone.
 */
export function formatDate(isoDate: string, locale: Locale): string {
    return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
        dateStyle: 'long',
        timeZone: 'UTC',
    }).format(new Date(`${isoDate}T00:00:00Z`));
}
