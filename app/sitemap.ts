import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { locales } from '@/lib/i18n/config';
import { localizedUrl, languageAlternates } from '@/lib/seo/metadata';

/** Every public page in every language, each with its language alternates. */
const PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/shop', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/size-guide', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/care', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/shipping', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/warranty', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
    ...products.map((p) => ({ path: `/products/${p.id}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
    return locales.flatMap((locale) =>
        PAGES.map((page) => ({
            url: localizedUrl(locale, page.path),
            changeFrequency: page.changeFrequency,
            priority: page.priority,
            alternates: { languages: languageAlternates(page.path) },
        }))
    );
}
