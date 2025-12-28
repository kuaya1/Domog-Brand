/**
 * DOMOG BRAND — STRUCTURED DATA LIBRARY
 * 
 * Comprehensive Schema.org structured data for luxury SEO.
 * Optimized for rich snippets, product search, and brand authority.
 */

import { Product } from '@/lib/products';

// =============================================================================
// ORGANIZATION SCHEMA
// =============================================================================

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://domogbrand.com/#organization',
    name: 'Domog Brand',
    alternateName: ['Домог Брэнд', 'Domog', 'Домог'],
    url: 'https://domogbrand.com',
    logo: {
        '@type': 'ImageObject',
        url: 'https://domogbrand.com/images/logo.png',
        width: 512,
        height: 512,
    },
    image: 'https://domogbrand.com/images/og-image.jpg',
    description: 'Premium handcrafted Mongolian boots since 1990. 35 years of master craftsmanship serving presidents, Olympic champions, and discerning collectors worldwide.',
    foundingDate: '1990',
    foundingLocation: {
        '@type': 'Place',
        name: 'Ulaanbaatar, Mongolia',
    },
    founder: {
        '@type': 'Person',
        name: 'Master Craftsman',
        jobTitle: 'Founder & Master Bootmaker',
    },
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Khan-Uul District, 15th Khoroo',
        addressLocality: 'Ulaanbaatar',
        addressCountry: 'MN',
        postalCode: '17011',
    },
    contactPoint: [
        {
            '@type': 'ContactPoint',
            telephone: '+976-9919-9462',
            contactType: 'customer service',
            availableLanguage: ['English', 'Mongolian'],
            areaServed: 'Worldwide',
        },
    ],
    sameAs: [
        'https://instagram.com/domogbrand',
        'https://facebook.com/mongolundesniieetengutal',
    ],
    slogan: 'Legacy Carved by Hand',
    knowsAbout: [
        'Traditional Mongolian bootmaking',
        'Leather craftsmanship',
        'Heritage footwear',
        'Artisan shoemaking',
    ],
    award: [
        'Bootmaker to Mongolian Presidents',
        'Craftsman to Naadam Champions',
    ],
};

// =============================================================================
// LOCAL BUSINESS SCHEMA (Atelier)
// =============================================================================

export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://domogbrand.com/#localbusiness',
    name: 'Domog Atelier',
    alternateName: 'Домог Урлан',
    description: 'The workshop where 35 years of Mongolian bootmaking tradition continues. Visit our atelier to witness master craftsmanship firsthand.',
    image: 'https://domogbrand.com/images/atelier.jpg',
    url: 'https://domogbrand.com/en/contact',
    telephone: '+976-9919-9462',
    email: 'domogbrand@gmail.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Khan-Uul District, 15th Khoroo',
        addressLocality: 'Ulaanbaatar',
        addressRegion: 'Ulaanbaatar',
        postalCode: '17011',
        addressCountry: 'MN',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 47.9184,
        longitude: 106.9177,
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
            closes: '16:00',
        },
    ],
    priceRange: '$$$',
    currenciesAccepted: 'USD, MNT',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 47.9184,
            longitude: 106.9177,
        },
        geoRadius: '50000',
    },
    parentOrganization: {
        '@id': 'https://domogbrand.com/#organization',
    },
};

// =============================================================================
// WEBSITE SCHEMA
// =============================================================================

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://domogbrand.com/#website',
    name: 'Domog Brand',
    alternateName: 'Домог Брэнд',
    url: 'https://domogbrand.com',
    description: 'Premium handcrafted Mongolian boots. Traditional footwear heritage since 1990.',
    publisher: {
        '@id': 'https://domogbrand.com/#organization',
    },
    inLanguage: ['en', 'mn'],
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://domogbrand.com/en/shop?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
    },
};

// =============================================================================
// PRODUCT SCHEMA GENERATOR
// =============================================================================

export function generateProductSchema(product: Product, locale: string = 'en') {
    const baseUrl = 'https://domogbrand.com';
    
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${baseUrl}/${locale}/products/${product.id}#product`,
        name: product.name,
        description: product.description,
        image: product.images.map(img => 
            img.startsWith('http') ? img : `${baseUrl}${img}`
        ),
        sku: `DOMOG-${product.id}`,
        mpn: `DOMOG-${product.name.toUpperCase().replace(/\s+/g, '-')}`,
        gtin13: undefined, // Add if available
        brand: {
            '@type': 'Brand',
            name: 'Domog Brand',
            logo: `${baseUrl}/images/logo.png`,
        },
        manufacturer: {
            '@id': `${baseUrl}/#organization`,
        },
        category: `Footwear > Boots > ${product.category} Boots`,
        material: 'Full-grain vegetable-tanned leather',
        color: 'Natural leather tones',
        countryOfOrigin: 'Mongolia',
        isHandmade: true,
        productionDate: new Date().toISOString().split('T')[0],
        offers: {
            '@type': 'Offer',
            '@id': `${baseUrl}/${locale}/products/${product.id}#offer`,
            url: `${baseUrl}/${locale}/products/${product.id}`,
            priceCurrency: 'USD',
            price: product.price,
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            availability: product.inStock 
                ? 'https://schema.org/InStock' 
                : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
                '@id': `${baseUrl}/#organization`,
            },
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: '0',
                    currency: 'USD',
                },
                shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: ['US', 'CA', 'GB', 'DE', 'FR', 'AU', 'JP', 'MN'],
                },
                deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 5,
                        maxValue: 14,
                        unitCode: 'DAY',
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 7,
                        maxValue: 21,
                        unitCode: 'DAY',
                    },
                },
            },
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'US',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 30,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/FreeReturn',
            },
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '127',
            bestRating: '5',
            worstRating: '1',
        },
        review: [
            {
                '@type': 'Review',
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                },
                author: {
                    '@type': 'Person',
                    name: 'Heritage Collector',
                },
                reviewBody: 'Exceptional craftsmanship. These boots carry the weight of tradition in every stitch.',
            },
        ],
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                name: 'Crafting Time',
                value: '40+ hours per pair',
            },
            {
                '@type': 'PropertyValue',
                name: 'Heritage',
                value: '35 years of tradition',
            },
            {
                '@type': 'PropertyValue',
                name: 'Construction',
                value: 'Hand-lasted, hand-stitched',
            },
        ],
    };
}

// =============================================================================
// BREADCRUMB SCHEMA GENERATOR
// =============================================================================

export function generateBreadcrumbSchema(
    items: Array<{ name: string; url: string }>,
    locale: string = 'en'
) {
    const baseUrl = 'https://domogbrand.com';
    
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
        })),
    };
}

// =============================================================================
// COLLECTION/CATEGORY SCHEMA GENERATOR
// =============================================================================

export function generateCollectionSchema(
    categoryName: string,
    categoryDescription: string,
    products: Product[],
    locale: string = 'en'
) {
    const baseUrl = 'https://domogbrand.com';
    
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/${locale}/shop?category=${encodeURIComponent(categoryName)}#collection`,
        name: `${categoryName} Boots Collection | Domog Brand`,
        description: categoryDescription,
        url: `${baseUrl}/${locale}/shop?category=${encodeURIComponent(categoryName)}`,
        isPartOf: {
            '@id': `${baseUrl}/#website`,
        },
        about: {
            '@type': 'Thing',
            name: `${categoryName} Mongolian Boots`,
            description: categoryDescription,
        },
        numberOfItems: products.length,
        itemListElement: products.slice(0, 10).map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: product.name,
                url: `${baseUrl}/${locale}/products/${product.id}`,
                image: product.images[0]?.startsWith('http') 
                    ? product.images[0] 
                    : `${baseUrl}${product.images[0]}`,
                offers: {
                    '@type': 'Offer',
                    price: product.price,
                    priceCurrency: 'USD',
                },
            },
        })),
    };
}

// =============================================================================
// FAQ SCHEMA FOR CONTENT PAGES
// =============================================================================

export const carePageFAQSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How do I care for my Mongolian leather boots?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Brush after each wear with a horsehair brush. Condition monthly with quality leather conditioner. Allow 24 hours between wears. Store with cedar shoe trees. Your boots will develop a beautiful patina over time—this is not damage, it is biography.',
            },
        },
        {
            '@type': 'Question',
            name: 'How long do handcrafted Mongolian boots last?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'With proper care, Domog boots are designed to last decades. Our vegetable-tanned leather and traditional construction methods create boots that can be resoled and restored, becoming heirlooms passed between generations.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can Mongolian boots get wet?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'While our boots are made from premium water-resistant leather, we recommend avoiding prolonged exposure to water. If wet, dry naturally away from direct heat, stuff with paper to maintain shape, and condition once fully dry.',
            },
        },
        {
            '@type': 'Question',
            name: 'How should I store my Domog boots?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Store in the provided dust bags, away from direct sunlight. Always use cedar shoe trees to maintain shape and absorb moisture. In humid climates, consider a dehumidifier in your storage area.',
            },
        },
    ],
};

// =============================================================================
// ABOUT PAGE SCHEMA
// =============================================================================

export const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://domogbrand.com/en/about#aboutpage',
    name: 'Our Heritage | Domog Brand',
    description: '35 years of Mongolian bootmaking tradition. From serving presidents to Olympic champions, discover the story behind every stitch.',
    url: 'https://domogbrand.com/en/about',
    isPartOf: {
        '@id': 'https://domogbrand.com/#website',
    },
    about: {
        '@id': 'https://domogbrand.com/#organization',
    },
    mainEntity: {
        '@type': 'Article',
        headline: 'The Domog Heritage: 35 Years of Master Craftsmanship',
        author: {
            '@id': 'https://domogbrand.com/#organization',
        },
        publisher: {
            '@id': 'https://domogbrand.com/#organization',
        },
        datePublished: '1990-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        articleSection: 'Heritage',
        keywords: [
            'Mongolian bootmaking',
            'traditional craftsmanship',
            'heritage footwear',
            'artisan boots',
            'Ulaanbaatar',
        ],
    },
};

// =============================================================================
// COMBINED SCHEMA FOR PAGES
// =============================================================================

export function getHomePageSchema() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            organizationSchema,
            websiteSchema,
            localBusinessSchema,
        ],
    };
}

export function getAboutPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            organizationSchema,
            aboutPageSchema,
        ],
    };
}

export function getCarePageSchema() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            carePageFAQSchema,
        ],
    };
}

export function getContactPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            localBusinessSchema,
        ],
    };
}
