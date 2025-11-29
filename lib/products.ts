import { type Locale } from './i18n/config';

export interface LocalizedText {
    en: string;
    mn: string;
}

export interface Product {
    id: string;
    name: string;
    nameLocalized?: LocalizedText;
    price: number;
    description: string;
    descriptionLocalized?: LocalizedText;
    images: string[];
    category: string;
    categoryLocalized?: LocalizedText;
    sizes: string[];
    isNew?: boolean;
    inStock?: boolean;
}

/**
 * Get localized product name
 */
export function getLocalizedName(product: Product, locale: Locale): string {
    return product.nameLocalized?.[locale] || product.name;
}

/**
 * Get localized product description
 */
export function getLocalizedDescription(product: Product, locale: Locale): string {
    return product.descriptionLocalized?.[locale] || product.description;
}

/**
 * Get localized category
 */
export function getLocalizedCategory(product: Product, locale: Locale): string {
    return product.categoryLocalized?.[locale] || product.category;
}

export interface ProductCategory {
    id: string;
    name: string;
    description: string;
    slug: string;
}

// Product Categories with premium descriptions
export const productCategories: ProductCategory[] = [
    {
        id: 'ceremonial',
        name: 'Ceremonial',
        slug: 'Ceremonial',
        description: 'Reserved for life\'s defining moments. Our ceremonial collection embodies the gravitas of state occasions and sacred traditions, crafted for those who understand that presence is earned, not demanded.',
    },
    {
        id: 'festival',
        name: 'Festival',
        slug: 'Festival',
        description: 'Born from the spirit of Naadam. These boots honor Mongolia\'s greatest celebration—where horsemen, archers, and wrestlers gather. Flexible enough for competition, elegant enough for ceremony.',
    },
    {
        id: 'riding',
        name: 'Riding',
        slug: 'Riding',
        description: 'Engineered for the saddle. The reinforced construction and precision fit that made our ancestors masters of the steppe, now refined for the modern equestrian who refuses to compromise.',
    },
    {
        id: 'winter',
        name: 'Winter',
        slug: 'Winter',
        description: 'Forged for the harshest conditions on earth. Mongolian winters test everything—only the finest materials and construction endure. These boots don\'t just survive; they protect.',
    },
    {
        id: 'luxury',
        name: 'Luxury',
        slug: 'Luxury',
        description: 'The pinnacle of our craft. Gold-thread embroidery, the rarest leathers, and techniques known only to our master artisans. For collectors who recognize that true luxury is measured in hours, not price.',
    },
    {
        id: 'heritage',
        name: 'Heritage',
        slug: 'Heritage',
        description: 'The essence of tradition. Faithful reproductions of historical designs worn by khans, shamans, and nobility. Each pair is a conversation with centuries of Mongolian craftsmanship.',
    },
    {
        id: 'everyday',
        name: 'Everyday',
        slug: 'Everyday',
        description: 'Where heritage meets daily life. Our most versatile collection brings artisanal quality to your everyday moments, proving that exceptional craftsmanship belongs in every step.',
    },
];

export const products: Product[] = [
    // ============================================================================
    // REORDERED PRODUCTS - Per Collection Display Order
    // ============================================================================
    {
        id: "1",
        name: "Steppe Rider Boot",
        nameLocalized: {
            en: "Steppe Rider Boot",
            mn: "Тал нутгийн унагчийн гутал"
        },
        price: 290,
        description: "Built for riders who measure distance in days, not miles. Triple-reinforced leather soles grip the stirrup through forty-below windstorms, while the hand-felted wool lining holds warmth like a second skin. Our founder tested these himself across 400 kilometers of open steppe—they returned home before he did.",
        descriptionLocalized: {
            en: "Built for riders who measure distance in days, not miles. Triple-reinforced leather soles grip the stirrup through forty-below windstorms, while the hand-felted wool lining holds warmth like a second skin.",
            mn: "Зайг бус өдрөөр хэмждэг унагчдад зориулсан. Гурав дахин бэхжүүлсэн арьсан ул нь дөч хасах хүйтэнд дөрөөг барьж, гараар эсгийсэн ноосон дотор нь хоёр дахь арьс шиг дулаан хадгалдаг."
        },
        images: ["/images/PNG images/steppe-rider (1).png"],
        category: "Riding",
        categoryLocalized: { en: "Riding", mn: "Унах" },
        sizes: ["40", "41", "42", "43", "44", "45"],
        inStock: true,
    },
    {
        id: "2",
        name: "Khan's Legacy Boot",
        nameLocalized: {
            en: "Khan's Legacy Boot",
            mn: "Хааны өвийн гутал"
        },
        price: 420,
        description: "A forty-hour masterpiece. Gold thread spirals across midnight-black calf leather in patterns that mirror the constellation maps used by Mongol astronomers. The leather is selected from a single hide, ensuring perfect color harmony. Only twelve pairs are produced each year—and we never rush the gold work.",
        descriptionLocalized: {
            en: "A forty-hour masterpiece. Gold thread spirals across midnight-black calf leather in patterns that mirror the constellation maps used by Mongol astronomers.",
            mn: "Дөчин цагийн мастерын бүтээл. Монгол одон орны зураглалын хээгээр алтан утас хар тугалын арьсан дээр мушгирдаг. Арьс нь нэг ширхэг арьснаас сонгогдож, төгс өнгөний зохицол хангадаг."
        },
        images: ["/images/PNG images/khans-legacy.png"],
        category: "Luxury",
        categoryLocalized: { en: "Luxury", mn: "Люкс" },
        sizes: ["40", "41", "42", "43", "44"],
        inStock: true,
    },
    {
        id: "3",
        name: "Genghis Ceremonial Boot",
        nameLocalized: {
            en: "Genghis Ceremonial Boot",
            mn: "Чингисийн ёслолын гутал"
        },
        price: 450,
        description: "Reserved for moments that demand presence. Hand-stitched from vegetable-tanned cowhide using techniques unchanged for eight generations, these boots feature our signature silver-inlay work depicting the eternal flame of the Mongol Empire. Presidents and heads of state have stood in these boots during ceremonies where history was made.",
        descriptionLocalized: {
            en: "Reserved for moments that demand presence. Hand-stitched from vegetable-tanned cowhide using techniques unchanged for eight generations.",
            mn: "Төр соёлын хүндэтгэл шаардсан мөчүүдэд зориулсан. Найман үеийн турш өөрчлөгдөөгүй арга техникээр ургамлаар идээшүүлсэн үхрийн арьсаар гараар оёсон."
        },
        images: ["/images/PNG images/Generated Image November 27, 2025 - 10_19AM-EDIT.png"],
        category: "Ceremonial",
        categoryLocalized: { en: "Ceremonial", mn: "Ёслолын" },
        sizes: ["39", "40", "41", "42", "43", "44"],
        isNew: true,
        inStock: true,
    },
    {
        id: "4",
        name: "Altai Mountain Boot",
        nameLocalized: {
            en: "Altai Mountain Boot",
            mn: "Алтайн уулын гутал"
        },
        price: 320,
        description: "Where the Altai Mountains touch the eternal blue sky, temperatures test both resolve and craftsmanship. These boots emerge from that challenge: double-walled construction, yak-wool insulation, and soles that flex at negative forty degrees. The geometric embroidery tells the story of mountain spirits who guide travelers home.",
        descriptionLocalized: {
            en: "Where the Altai Mountains touch the eternal blue sky, temperatures test both resolve and craftsmanship. These boots emerge from that challenge: double-walled construction, yak-wool insulation, and soles that flex at negative forty degrees.",
            mn: "Алтай уул мөнх хөх тэнгэртэй уулзах газар температур нь шийдэмжийг ч, урлалыг ч шалгадаг. Эдгээр гутал тэр сорилтоос гарч ирсэн: давхар хананы бүтэц, сарлагийн ноосон дулаалга, хасах дөч градуст уян хатан ул."
        },
        images: ["/images/PNG images/altai-mountain (1).png"],
        category: "Winter",
        categoryLocalized: { en: "Winter", mn: "Өвөл" },
        sizes: ["38", "39", "40", "41", "42"],
        inStock: true,
    },
    {
        id: "5",
        name: "Burkhan Khaldun Sacred Boot",
        nameLocalized: {
            en: "Burkhan Khaldun Sacred Boot",
            mn: "Бурхан Халдуны ариун гутал"
        },
        price: 520,
        description: "Named for the sacred mountain where Temüjin became Genghis Khan. Each pair features hand-tooled depictions of the mountain's three peaks and is blessed by a local shaman before shipping. The leather is cured using ancient mineral techniques that create a patina deepening with every wear—your journey written on your feet.",
        descriptionLocalized: {
            en: "Named for the sacred mountain where Temüjin became Genghis Khan. Each pair features hand-tooled depictions of the mountain's three peaks and is blessed by a local shaman before shipping.",
            mn: "Тэмүжин Чингис хаан болсон ариун уулын нэрээр нэрлэгдсэн. Гутал бүр уулын гурван оргилын гар урлалын дүрслэлтэй бөгөөд илгээхээс өмнө орон нутгийн бөөгөөр ариусгагддаг."
        },
        images: ["/images/PNG images/Generated Image December 6, 2025 - 1_08PM.png"],
        category: "Luxury",
        categoryLocalized: { en: "Luxury", mn: "Люкс" },
        sizes: ["39", "40", "41", "42", "43", "44"],
        isNew: true,
        inStock: true,
    },
    {
        id: "6",
        name: "Naadam Festival Boot",
        nameLocalized: {
            en: "Naadam Festival Boot",
            mn: "Наадмын баярын гутал"
        },
        price: 380,
        description: "Born from the three manly arts of wrestling, archery, and horsemanship. The flexible sole allows the agility Naadam demands, while the upturned toe—a sacred design honoring the earth—ensures you never miss a stirrup. Olympic champions have trusted these boots in competition. Their secret? A break-in period of exactly zero.",
        descriptionLocalized: {
            en: "Born from the three manly arts of wrestling, archery, and horsemanship. The flexible sole allows the agility Naadam demands, while the upturned toe—a sacred design honoring the earth—ensures you never miss a stirrup.",
            mn: "Бөх, сурын харваа, морины уралдаан гэсэн гурван эрийн наадмаас төрсөн. Уян хатан ул нь Наадамд шаардагдах хөнгөн чадлыг олгодог, газрыг хүндэтгэсэн ариун загвар болох өргөсөн үзүүр нь дөрөөг хэзээ ч алдахгүй байхыг баталгаажуулдаг."
        },
        images: ["/images/PNG images/Generated Image December 5, 2025 - 6_52PM.png"],
        category: "Festival",
        categoryLocalized: { en: "Festival", mn: "Баярын" },
        sizes: ["38", "39", "40", "41", "42", "43"],
        isNew: true,
        inStock: true,
    },

    // ============================================================================
    // ADDITIONAL PRODUCTS 7-15
    // ============================================================================
    {
        id: "7",
        name: "Gobi Desert Boot",
        price: 340,
        description: "Where sand meets stone, only true craftsmanship survives. These boots combine the breathability demanded by summer steppe with protection against the Gobi's infamous temperature swings. The amber-toned leather pays homage to the desert's sunset palette, while reinforced stitching withstands sand that would destroy lesser footwear.",
        images: ["/images/PNG images/Generated Image December 5, 2025 - 6_51PM.png"],
        category: "Everyday",
        sizes: ["38", "39", "40", "41", "42", "43", "44"],
        inStock: true,
    },
    {
        id: "8",
        name: "Tuul River Boot",
        price: 310,
        description: "Inspired by the waters that have sustained Ulaanbaatar for centuries. The wave-pattern stitching along the shaft is more than decorative—it channels moisture away from the foot while allowing the leather to breathe. Ideal for those who walk between worlds: the boardroom and the wilderness, equally at home in both.",
        images: ["/images/PNG images/Generated Image December 6, 2025 - 12_58PM.png"],
        category: "Everyday",
        sizes: ["38", "39", "40", "41", "42", "43"],
        inStock: true,
    },
    {
        id: "9",
        name: "Tsagaan Sar Celebration Boot",
        price: 390,
        description: "Created for the White Moon festival, Mongolia's most cherished celebration of renewal. The white leather—rare, difficult to work, unforgiving of errors—symbolizes purity and new beginnings. Silver thread embroidery depicts the three precious gifts: wisdom, courage, and warmth. A boot for moments when family and tradition matter most.",
        images: ["/images/PNG images/Generated Image November 27, 2025 - 10_19AM-EDIT.png"],
        category: "Ceremonial",
        sizes: ["38", "39", "40", "41", "42", "43"],
        isNew: true,
        inStock: true,
    },
    {
        id: "10",
        name: "Khövsgöl Lake Boot",
        price: 360,
        description: "Deep blue leather mirrors the waters of Mongolia's sacred lake, the 'Younger Sister of the Sea.' The boot's unique water-resistant treatment comes from a family formula passed down for five generations—a blend of beeswax and mountain herbs that protects without suffocating the leather. For those who find peace near water.",
        images: ["/images/PNG images/khans-legacy.png"],
        category: "Heritage",
        sizes: ["39", "40", "41", "42", "43", "44"],
        inStock: true,
    },
    {
        id: "11",
        name: "Ger Artisan Boot",
        price: 275,
        description: "The workhorse of our collection, named for the traditional dwelling that shelters nomadic families. Unadorned doesn't mean unrefined—every seam is triple-stitched, every sole hand-lasted to last decades, not seasons. This is the boot that taught us what matters: comfort that compounds over years, not fashion that fades with trends.",
        images: ["/images/PNG images/steppe-rider (1).png"],
        category: "Everyday",
        sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
        inStock: true,
    },
    {
        id: "12",
        name: "Morin Khuur Performer Boot",
        price: 410,
        description: "Designed in collaboration with masters of the horsehead fiddle. The slightly elevated heel improves posture for extended performances, while the soft sole allows subtle foot movements that traditional musicians use to keep rhythm. The carved leather patterns echo the instrument's iconic curves. Art deserves artistry, in every detail.",
        images: ["/images/PNG images/altai-mountain (1).png"],
        category: "Heritage",
        sizes: ["38", "39", "40", "41", "42", "43"],
        inStock: true,
    },
    {
        id: "13",
        name: "Takhi Wild Horse Boot",
        price: 380,
        description: "Named for the last truly wild horses on earth, native to the Mongolian steppe. The distinctive tan and black leather pattern mirrors their coat, while the boot's extraordinary flexibility—tested by professional riders—allows communication with the horse through subtle foot pressure. For those who speak the language of the plains.",
        images: ["/images/PNG images/Generated Image December 6, 2025 - 1_08PM.png"],
        category: "Riding",
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        inStock: true,
    },
    {
        id: "14",
        name: "Darkhad Shaman Boot",
        price: 480,
        description: "The Darkhad people have preserved shamanic traditions that predate written history. These boots, created with their guidance, feature symbols of protection and passage between worlds. The specially treated leather is said to grow stronger with ritual use. We make only what is ordered—these boots find their owners, not the reverse.",
        images: ["/images/PNG images/Generated Image December 5, 2025 - 6_52PM.png"],
        category: "Ceremonial",
        sizes: ["39", "40", "41", "42", "43"],
        inStock: true,
    },
    {
        id: "15",
        name: "Orkhon Valley Heritage Boot",
        price: 440,
        description: "The Orkhon Valley was the heart of the Mongol Empire. These boots reproduce, with historical precision, the style worn by the empire's elite administrators—those who kept the largest contiguous empire in history running. Cognac leather, brass hardware, and scrollwork that once indicated rank and responsibility. Power, understated.",
        images: ["/images/PNG images/Generated Image December 6, 2025 - 12_58PM.png"],
        category: "Heritage",
        sizes: ["39", "40", "41", "42", "43", "44"],
        isNew: true,
        inStock: true,
    },
];

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

// Helper function to get featured products
export function getFeaturedProducts(count: number = 6): Product[] {
    return products.slice(0, count);
}

// Helper function to get new arrivals
export function getNewArrivals(): Product[] {
    return products.filter(p => p.isNew);
}

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
    return productCategories.find(c => c.slug.toLowerCase() === slug.toLowerCase());
}
