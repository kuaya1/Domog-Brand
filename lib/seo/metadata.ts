/**
 * DOMOG BRAND — SEO METADATA LIBRARY
 * 
 * Centralized metadata generation for all page types.
 * Optimized for luxury brand positioning and qualified traffic.
 */

import { Metadata } from 'next';
import { Product } from '@/lib/products';

const BASE_URL = 'https://domogbrand.com';
const BRAND_NAME = 'Domog Brand';
const BRAND_NAME_MN = 'Домог Брэнд';

// =============================================================================
// SHARED METADATA
// =============================================================================

const sharedKeywords = [
    'Mongolian boots',
    'Mongolian traditional boots',
    'handcrafted Mongolian footwear',
    'Mongolian leather boots',
    'traditional Mongolian craftsmanship',
    'heritage footwear',
    'artisan bootmaker Mongolia',
    'luxury Mongolian boots',
    'Монгол гутал',
    'гар урлал',
    'Domog Brand',
    'Домог',
];

const sharedOpenGraph = {
    siteName: BRAND_NAME,
    type: 'website' as const,
    images: [
        {
            url: `${BASE_URL}/images/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'Domog Brand - Premium Handcrafted Mongolian Boots',
        },
    ],
};

// =============================================================================
// HOMEPAGE METADATA
// =============================================================================

export function getHomeMetadata(locale: string): Metadata {
    const isEN = locale === 'en';
    
    const title = isEN 
        ? 'Domog Brand | Handcrafted Mongolian Boots Since 1990'
        : 'Домог Брэнд | 1990 оноос Монгол Гутал Урлаж Байна';
    
    const description = isEN
        ? 'Premium traditional Mongolian boots handcrafted by master artisans since 1990. Serving presidents, Olympic champions, and collectors worldwide. Legacy carved by hand.'
        : 'Мастер урчуудын 1990 оноос гараар урласан уламжлалт Монгол гутал. Ерөнхийлөгч нар, Олимпийн аваргууд, дэлхийн цуглуулагчдад үйлчилж байна.';

    return {
        title,
        description,
        keywords: sharedKeywords,
        openGraph: {
            ...sharedOpenGraph,
            title,
            description,
            url: `${BASE_URL}/${locale}`,
            locale: isEN ? 'en_US' : 'mn_MN',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${BASE_URL}/images/og-image.jpg`],
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}`,
            languages: {
                'en': `${BASE_URL}/en`,
                'mn': `${BASE_URL}/mn`,
                'x-default': `${BASE_URL}/en`,
            },
        },
    };
}

// =============================================================================
// SHOP PAGE METADATA
// =============================================================================

export function getShopMetadata(locale: string, category?: string): Metadata {
    const isEN = locale === 'en';
    
    let title: string;
    let description: string;
    
    if (category) {
        title = isEN
            ? `${category} Mongolian Boots | Traditional Handcrafted Footwear | Domog`
            : `${category} Монгол Гутал | Уламжлалт Гар Урлал | Домог`;
        description = isEN
            ? `Explore our ${category.toLowerCase()} collection of handcrafted Mongolian boots. Each pair represents 40+ hours of master craftsmanship. Premium leather, traditional techniques.`
            : `Манай ${category.toLowerCase()} цуглуулгыг судлаарай. Нэг хос бүр 40+ цагийн мастер урлал.`;
    } else {
        title = isEN
            ? 'Shop Traditional Mongolian Boots | Handcrafted Heritage Footwear | Domog'
            : 'Монгол Гутал Худалдан Авах | Уламжлалт Гар Урлал | Домог';
        description = isEN
            ? 'Browse our complete collection of handcrafted Mongolian boots. From riding boots to ceremonial footwear, each pair carries 35 years of heritage. $290-$520 USD.'
            : 'Монгол гутлын бүрэн цуглуулгыг үзнэ үү. Унах гутлаас эхлээд ёслолын гутал хүртэл, нэг бүр 35 жилийн өв соёлыг агуулна.';
    }

    const keywords = [
        ...sharedKeywords,
        'buy Mongolian boots',
        'Mongolian boots online',
        'traditional boots for sale',
        category ? `${category.toLowerCase()} boots Mongolia` : 'boots collection',
    ];

    return {
        title,
        description,
        keywords,
        openGraph: {
            ...sharedOpenGraph,
            title,
            description,
            url: category 
                ? `${BASE_URL}/${locale}/shop?category=${encodeURIComponent(category)}`
                : `${BASE_URL}/${locale}/shop`,
            locale: isEN ? 'en_US' : 'mn_MN',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${BASE_URL}/images/og-shop.jpg`],
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}/shop`,
            languages: {
                'en': `${BASE_URL}/en/shop`,
                'mn': `${BASE_URL}/mn/shop`,
            },
        },
    };
}

// =============================================================================
// PRODUCT PAGE METADATA
// =============================================================================

export function getProductMetadata(product: Product, locale: string): Metadata {
    const isEN = locale === 'en';
    
    const title = isEN
        ? `${product.name} - ${product.category} Boots | Handcrafted in Mongolia | Domog`
        : `${product.name} - ${product.category} Гутал | Монголд Урласан | Домог`;
    
    const description = isEN
        ? `${product.description.slice(0, 120)}... Handcrafted in Mongolia since 1990. $${product.price} USD. Free worldwide shipping.`
        : `${product.descriptionLocalized?.mn?.slice(0, 120) || product.description.slice(0, 120)}... 1990 оноос Монголд урласан. $${product.price} USD.`;

    const keywords = [
        product.name,
        `${product.name} boots`,
        `${product.category} Mongolian boots`,
        `handcrafted ${product.category.toLowerCase()} boots`,
        'Mongolian leather boots',
        'traditional boots Mongolia',
        'Domog Brand',
        ...sharedKeywords.slice(0, 5),
    ];

    const images = product.images.slice(0, 4).map((img, i) => ({
        url: img.startsWith('http') ? img : `${BASE_URL}${img}`,
        width: 1200,
        height: 630,
        alt: `${product.name} - ${product.category} Mongolian Boot - View ${i + 1}`,
    }));

    return {
        title,
        description,
        keywords,
        openGraph: {
            ...sharedOpenGraph,
            title,
            description,
            url: `${BASE_URL}/${locale}/products/${product.id}`,
            locale: isEN ? 'en_US' : 'mn_MN',
            type: 'website',
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: images.slice(0, 1).map(img => img.url),
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}/products/${product.id}`,
            languages: {
                'en': `${BASE_URL}/en/products/${product.id}`,
                'mn': `${BASE_URL}/mn/products/${product.id}`,
            },
        },
        other: {
            'product:price:amount': product.price.toString(),
            'product:price:currency': 'USD',
            'product:availability': product.inStock ? 'in stock' : 'out of stock',
            'product:condition': 'new',
            'product:brand': 'Domog Brand',
        },
    };
}

// =============================================================================
// ABOUT/HERITAGE PAGE METADATA
// =============================================================================

export function getAboutMetadata(locale: string): Metadata {
    const isEN = locale === 'en';
    
    const title = isEN
        ? 'Our Heritage | 35 Years of Mongolian Bootmaking | Domog Brand'
        : 'Бидний Түүх | 35 Жилийн Монгол Гутал Урлал | Домог Брэнд';
    
    const description = isEN
        ? 'Discover 35 years of master Mongolian bootmaking tradition. From serving presidents to Olympic champions, learn the story behind every handcrafted pair. Est. 1990, Ulaanbaatar.'
        : 'Монгол гутал урлалын 35 жилийн уламжлалыг мэдэж аваарай. Ерөнхийлөгч нараас Олимпийн аваргууд хүртэл үйлчилсэн түүхийг судлаарай.';

    const keywords = [
        'Mongolian bootmaking history',
        'traditional Mongolian craftsmanship',
        'heritage footwear Mongolia',
        'artisan bootmaker Ulaanbaatar',
        'Mongolian leather tradition',
        'master craftsman Mongolia',
        ...sharedKeywords,
    ];

    return {
        title,
        description,
        keywords,
        openGraph: {
            ...sharedOpenGraph,
            title,
            description,
            url: `${BASE_URL}/${locale}/about`,
            locale: isEN ? 'en_US' : 'mn_MN',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${BASE_URL}/images/og-heritage.jpg`],
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}/about`,
            languages: {
                'en': `${BASE_URL}/en/about`,
                'mn': `${BASE_URL}/mn/about`,
            },
        },
    };
}

// =============================================================================
// CARE PAGE METADATA
// =============================================================================

export function getCareMetadata(locale: string): Metadata {
    const isEN = locale === 'en';
    
    const title = isEN
        ? 'Leather Boot Care Guide | How to Care for Mongolian Boots | Domog'
        : 'Арьсан Гутлын Арчилгаа | Монгол Гутлыг Хэрхэн Арчлах | Домог';
    
    const description = isEN
        ? 'Complete guide to caring for your handcrafted Mongolian leather boots. Daily rituals, monthly conditioning, seasonal storage. Make your Domog boots last generations.'
        : 'Монгол арьсан гутлын бүрэн арчилгааны гарын авлага. Өдөр тутмын арчилгаа, сар бүрийн тосолгоо, улирлын хадгалалт.';

    const keywords = [
        'leather boot care',
        'how to care for Mongolian boots',
        'leather conditioning guide',
        'boot maintenance tips',
        'Mongolian leather care',
        'vegetable tanned leather care',
        'handcrafted boot care',
        ...sharedKeywords.slice(0, 5),
    ];

    return {
        title,
        description,
        keywords,
        openGraph: {
            ...sharedOpenGraph,
            title,
            description,
            url: `${BASE_URL}/${locale}/care`,
            locale: isEN ? 'en_US' : 'mn_MN',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${BASE_URL}/images/og-care.jpg`],
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}/care`,
            languages: {
                'en': `${BASE_URL}/en/care`,
                'mn': `${BASE_URL}/mn/care`,
            },
        },
    };
}

// =============================================================================
// CONTACT/ATELIER PAGE METADATA
// =============================================================================

export function getContactMetadata(locale: string): Metadata {
    const isEN = locale === 'en';
    
    const title = isEN
        ? 'Visit Our Atelier | Contact Domog Brand | Ulaanbaatar, Mongolia'
        : 'Манай Урланд Зочлоорой | Домог Брэндтэй Холбогдох | Улаанбаатар';
    
    const description = isEN
        ? 'Visit the Domog atelier in Ulaanbaatar to witness 35 years of bootmaking tradition. Commission custom boots or schedule a consultation. Khan-Uul District.'
        : 'Улаанбаатар дахь Домог урланд зочилж 35 жилийн гутал урлалын уламжлалыг биечлэн мэдрээрэй. Захиалгат гутал эсвэл зөвлөгөө авах цаг товлоорой.';

    const keywords = [
        'Domog atelier Ulaanbaatar',
        'Mongolian bootmaker contact',
        'custom boots Mongolia',
        'visit bootmaker Mongolia',
        'Ulaanbaatar leather workshop',
        ...sharedKeywords.slice(0, 5),
    ];

    return {
        title,
        description,
        keywords,
        openGraph: {
            ...sharedOpenGraph,
            title,
            description,
            url: `${BASE_URL}/${locale}/contact`,
            locale: isEN ? 'en_US' : 'mn_MN',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${BASE_URL}/images/og-atelier.jpg`],
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}/contact`,
            languages: {
                'en': `${BASE_URL}/en/contact`,
                'mn': `${BASE_URL}/mn/contact`,
            },
        },
    };
}

// =============================================================================
// CART PAGE METADATA (noindex but still needs basics)
// =============================================================================

export function getCartMetadata(locale: string): Metadata {
    const isEN = locale === 'en';
    
    return {
        title: isEN ? 'Your Commission | Domog Brand' : 'Таны Захиалга | Домог Брэнд',
        description: isEN 
            ? 'Review your selected Domog boots before commissioning.'
            : 'Захиалга хийхээс өмнө сонгосон Домог гутлаа шалгана уу.',
        robots: {
            index: false,
            follow: true,
        },
    };
}
