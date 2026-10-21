import { type Locale } from './i18n/config';
import { getMessages } from './i18n/messages';

export interface LocalizedText {
    en: string;
    mn: string;
}

/** Category IDs. Display labels live in messages/*.json under "categories". */
export const CATEGORY_IDS = [
    'riding',
    'festival',
    'ceremonial',
    'winter',
    'luxury',
    'heritage',
    'everyday',
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface Product {
    /** Immutable product ID used in URLs, carts, and orders. */
    id: string;
    /** Model name as used in orders. Also the English display name. */
    name: string;
    /** Display name in each language. Required: there is no English fallback on Mongolian pages. */
    nameLocalized: LocalizedText;
    /** Price in USD, the currency orders are charged in. */
    price: number;
    images: string[];
    category: CategoryId;
    /** EU sizes offered for this model. */
    sizes: string[];
    isNew?: boolean;
    inStock?: boolean;
    /**
     * Verified product details, once supplied by the family. Until then the
     * product page shows the restrained fallback description from the
     * messages file. Unverified claims removed from this catalog are listed
     * in docs/content/PRODUCT-FACTS.md.
     */
    details?: LocalizedText;
}

export function getLocalizedName(product: Product, locale: Locale): string {
    return product.nameLocalized[locale];
}

export function getCategoryLabel(category: CategoryId, locale: Locale): string {
    return getMessages(locale).categories[category];
}

export const products: Product[] = [
    {
        id: '1',
        name: 'TENGER',
        nameLocalized: { en: 'TENGER', mn: 'ТЭНГЭР' },
        price: 290,
        images: [
            '/images/PNG images/steppe-rider (1).png',
            '/images/boots/steppe-rider-left.jpg',
            '/images/boots/steppe-rider-right.jpg',
            '/images/boots/steppe-rider-back.jpg',
        ],
        category: 'riding',
        sizes: ['40', '41', '42', '43', '44', '45'],
        inStock: true,
    },
    {
        id: '6',
        name: 'NAADAM',
        nameLocalized: { en: 'NAADAM', mn: 'НААДАМ' },
        price: 380,
        images: [
            '/images/PNG images/Naadam Festival png.png',
            '/images/boots/naadam-festival-left.jpg',
            '/images/boots/naadam-festival-right.jpg',
            '/images/boots/naadam-festival-back.jpg',
        ],
        category: 'festival',
        sizes: ['38', '39', '40', '41', '42', '43'],
        isNew: true,
        inStock: true,
    },
    {
        id: '2',
        name: 'ALTAN',
        nameLocalized: { en: 'ALTAN', mn: 'АЛТАН' },
        price: 420,
        images: [
            '/images/PNG images/khans-legacy.png (2) (1).png',
            '/images/PNG images/khans-legacy.png (2) (1).png',
            '/images/PNG images/khans-legacy.png (2) (1).png',
            '/images/PNG images/khans-legacy.png (2) (1).png',
        ],
        category: 'luxury',
        sizes: ['40', '41', '42', '43', '44'],
        inStock: true,
    },
    {
        id: '4',
        name: 'ALTAI',
        nameLocalized: { en: 'ALTAI', mn: 'АЛТАЙ' },
        price: 320,
        images: [
            '/images/PNG images/altai-mountain (1).png',
            '/images/boots/altai-mountain-left.jpg',
            '/images/boots/altai-mountain-right.jpg',
            '/images/boots/altai-mountain-back.jpg',
        ],
        category: 'winter',
        sizes: ['38', '39', '40', '41', '42'],
        inStock: true,
    },
    {
        id: '3',
        name: 'ANU',
        nameLocalized: { en: 'ANU', mn: 'АНУ' },
        price: 450,
        images: [
            '/images/PNG images/Genghis Ceremonial png.png',
            '/images/boots/genghis-ceremonial-left.jpg',
            '/images/boots/genghis-ceremonial-right.jpg',
            '/images/boots/genghis-ceremonial-back.jpg',
        ],
        category: 'ceremonial',
        sizes: ['39', '40', '41', '42', '43', '44'],
        isNew: true,
        inStock: true,
    },
    {
        id: '5',
        name: 'BATU',
        nameLocalized: { en: 'BATU', mn: 'БАТУ' },
        price: 520,
        images: [
            '/images/PNG images/Burkhan Khalduun sacred boot .png',
            '/images/boots/burkhan-khaldun-left.jpg',
            '/images/boots/burkhan-khaldun-right.jpg',
            '/images/boots/burkhan-khaldun-back.jpg',
        ],
        category: 'luxury',
        sizes: ['39', '40', '41', '42', '43', '44'],
        isNew: true,
        inStock: true,
    },

    // Products 7-15: Mongolian names are draft translations of the English
    // descriptive names, pending family review (docs/content/OPEN-QUESTIONS.md).
    {
        id: '7',
        name: 'Gobi Desert Boot',
        nameLocalized: { en: 'Gobi Desert Boot', mn: 'Говь цөлийн гутал' },
        price: 340,
        images: ['/images/PNG images/Generated Image December 5, 2025 - 6_51PM.png'],
        category: 'everyday',
        sizes: ['38', '39', '40', '41', '42', '43', '44'],
        inStock: true,
    },
    {
        id: '8',
        name: 'Tuul River Boot',
        nameLocalized: { en: 'Tuul River Boot', mn: 'Туул голын гутал' },
        price: 310,
        images: ['/images/PNG images/Generated Image December 6, 2025 - 12_58PM.png'],
        category: 'everyday',
        sizes: ['38', '39', '40', '41', '42', '43'],
        inStock: true,
    },
    {
        id: '9',
        name: 'Tsagaan Sar Celebration Boot',
        nameLocalized: { en: 'Tsagaan Sar Celebration Boot', mn: 'Цагаан сарын баярын гутал' },
        price: 390,
        images: ['/images/PNG images/Generated Image November 27, 2025 - 10_19AM-EDIT.png'],
        category: 'ceremonial',
        sizes: ['38', '39', '40', '41', '42', '43'],
        isNew: true,
        inStock: true,
    },
    {
        id: '10',
        name: 'Khövsgöl Lake Boot',
        nameLocalized: { en: 'Khövsgöl Lake Boot', mn: 'Хөвсгөл нуурын гутал' },
        price: 360,
        images: ['/images/PNG images/khans-legacy.png'],
        category: 'heritage',
        sizes: ['39', '40', '41', '42', '43', '44'],
        inStock: true,
    },
    {
        id: '11',
        name: 'Ger Artisan Boot',
        nameLocalized: { en: 'Ger Artisan Boot', mn: 'Гэрийн урлаачийн гутал' },
        price: 275,
        images: ['/images/PNG images/steppe-rider (1).png'],
        category: 'everyday',
        sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
        inStock: true,
    },
    {
        id: '12',
        name: 'Morin Khuur Performer Boot',
        nameLocalized: { en: 'Morin Khuur Performer Boot', mn: 'Морин хуурчийн гутал' },
        price: 410,
        images: ['/images/PNG images/altai-mountain (1).png'],
        category: 'heritage',
        sizes: ['38', '39', '40', '41', '42', '43'],
        inStock: true,
    },
    {
        id: '13',
        name: 'Takhi Wild Horse Boot',
        nameLocalized: { en: 'Takhi Wild Horse Boot', mn: 'Тахь адууны гутал' },
        price: 380,
        images: ['/images/PNG images/Generated Image December 6, 2025 - 1_08PM.png'],
        category: 'riding',
        sizes: ['39', '40', '41', '42', '43', '44', '45'],
        inStock: true,
    },
    {
        id: '14',
        name: 'Darkhad Shaman Boot',
        nameLocalized: { en: 'Darkhad Shaman Boot', mn: 'Дархад бөөгийн гутал' },
        price: 480,
        images: ['/images/PNG images/Generated Image December 5, 2025 - 6_52PM.png'],
        category: 'ceremonial',
        sizes: ['39', '40', '41', '42', '43'],
        inStock: true,
    },
    {
        id: '15',
        name: 'Orkhon Valley Heritage Boot',
        nameLocalized: { en: 'Orkhon Valley Heritage Boot', mn: 'Орхоны хөндийн өв уламжлалт гутал' },
        price: 440,
        images: ['/images/PNG images/Generated Image December 6, 2025 - 12_58PM.png'],
        category: 'heritage',
        sizes: ['39', '40', '41', '42', '43', '44'],
        isNew: true,
        inStock: true,
    },
];

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getFeaturedProducts(count: number = 6): Product[] {
    return products.slice(0, count);
}

/** Categories that at least one product uses, in display order. */
export function getUsedCategories(): CategoryId[] {
    return CATEGORY_IDS.filter((id) => products.some((p) => p.category === id));
}

/** Every EU size offered by at least one product, ascending. */
export function getCatalogSizes(): string[] {
    return [...new Set(products.flatMap((p) => p.sizes))].sort((a, b) => Number(a) - Number(b));
}

export function isCategoryId(value: string): value is CategoryId {
    return (CATEGORY_IDS as readonly string[]).includes(value);
}

/**
 * Whether a product matches a search query. Model names and style labels
 * are searched in both languages, so a query typed in either language works
 * on either language's pages.
 */
export function matchesQuery(product: Product, query: string): boolean {
    const q = query.trim().toLocaleLowerCase();
    if (!q) return true;
    return [
        product.nameLocalized.en,
        product.nameLocalized.mn,
        getCategoryLabel(product.category, 'en'),
        getCategoryLabel(product.category, 'mn'),
    ].some((term) => term.toLocaleLowerCase().includes(q));
}
