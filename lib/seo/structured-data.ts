/**
 * Schema.org structured data. Every value here must also be visible on the
 * site: contact details, address and hours as shown in the footer and on
 * the contact page, and product name, image, price and availability as shown
 * on product pages. Claims removed in this pass (awards, famous customers,
 * founder placeholder, payment methods, shipping and return terms, ratings)
 * should only return once they are confirmed and shown to customers.
 */

import { type Locale } from '@/lib/i18n/config';
import { getMessages, format } from '@/lib/i18n/messages';
import { type Product, getLocalizedName, getCategoryLabel } from '@/lib/products';
import { CONTACT_EMAIL, CONTACT_PHONE_E164, SOCIAL_LINKS } from '@/lib/contact';
import { SITE_URL, localizedUrl, absoluteUrl } from './metadata';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function siteSchema(locale: Locale) {
    const t = getMessages(locale);
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': ORGANIZATION_ID,
                name: 'Domog',
                alternateName: ['Domog Brand', 'Домог', 'Домог Брэнд'],
                url: SITE_URL,
                description: t.footer.descriptor,
                foundingDate: '1990',
                email: CONTACT_EMAIL,
                telephone: CONTACT_PHONE_E164,
                sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
            },
            {
                '@type': 'LocalBusiness',
                '@id': `${SITE_URL}/#workshop`,
                name: 'Domog',
                url: localizedUrl(locale, '/contact'),
                telephone: CONTACT_PHONE_E164,
                email: CONTACT_EMAIL,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: t.footer.addressLine1,
                    addressLocality: locale === 'mn' ? 'Улаанбаатар' : 'Ulaanbaatar',
                    addressCountry: 'MN',
                },
                openingHoursSpecification: [
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        opens: '09:00',
                        closes: '18:00',
                    },
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: 'Saturday',
                        opens: '10:00',
                        closes: '15:00',
                    },
                ],
                parentOrganization: { '@id': ORGANIZATION_ID },
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                name: 'Domog',
                url: SITE_URL,
                inLanguage: ['en', 'mn'],
                publisher: { '@id': ORGANIZATION_ID },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${localizedUrl(locale, '/shop')}?search={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                },
            },
        ],
    };
}

export function productSchema(product: Product, locale: Locale) {
    const t = getMessages(locale);
    const name = getLocalizedName(product, locale);
    const url = localizedUrl(locale, `/products/${product.id}`);
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        sku: `DOMOG-${product.id}`,
        image: product.images.map(absoluteUrl),
        description: format(t.product.fallbackDescription, { model: name }),
        category: getCategoryLabel(product.category, locale),
        brand: { '@type': 'Brand', name: 'Domog' },
        offers: {
            '@type': 'Offer',
            url,
            priceCurrency: 'USD',
            price: product.price,
            availability: product.inStock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: { '@id': ORGANIZATION_ID },
        },
    };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/** Home → page breadcrumb for a top-level page. */
export function pageBreadcrumb(locale: Locale, path: string, name: string) {
    const t = getMessages(locale);
    return breadcrumbSchema([
        { name: t.common.home, url: localizedUrl(locale) },
        { name, url: localizedUrl(locale, path) },
    ]);
}
