'use client';

import { useLocale } from './navigation';
import { getMessages } from './messages';

/** Messages for the locale in the current URL, for client components. */
export function useMessages() {
    const locale = useLocale();
    return { locale, t: getMessages(locale) };
}
