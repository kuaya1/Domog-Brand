/**
 * Common Dictionary Types and Translations
 * 
 * Type-safe localization for shared components:
 * - Navigation
 * - Footer
 * - ProductCard
 * - CartDrawer
 * 
 * Usage: Import getDictionary(locale) in layout.tsx and pass to components
 */

import { type Locale } from './i18n/config';

// ============================================================================
// Type Definitions - Ensures compile-time safety for all translation keys
// ============================================================================

export interface NavigationDictionary {
    shop: string;
    heritage: string;
    atelier: string;
    cart: string;
    search_placeholder: string;
    shop_now: string;
    shop_collection: string;
    our_heritage: string;
    visit_atelier: string;
    shopping_bag: string;
    language: string;
    tagline: string;
}

export interface ProductCardDictionary {
    new_badge: string;
    view_details: string;
    currently_unavailable: string;
    usd: string;
}

export interface CartDictionary {
    your_cart: string;
    empty_cart_title: string;
    empty_cart_description: string;
    browse_collection: string;
    size: string;
    remove: string;
    subtotal: string;
    shipping: string;
    shipping_calculated: string;
    free_shipping: string;
    tax: string;
    discount: string;
    total: string;
    checkout: string;
    continue_shopping: string;
    promo_code: string;
    apply: string;
    promo_applied: string;
    items_in_cart: string;
    item_in_cart: string;
}

export interface FooterDictionary {
    brand_description: string;
    brand_quote: string;
    shop_title: string;
    all_collection: string;
    ceremonial: string;
    festival: string;
    traditional: string;
    daily_wear: string;
    support_title: string;
    size_guide: string;
    care_instructions: string;
    shipping_returns: string;
    warranty: string;
    contact_us: string;
    atelier_title: string;
    address_line1: string;
    address_line2: string;
    hours_label: string;
    hours_weekday: string;
    hours_saturday: string;
    newsletter_title: string;
    newsletter_description: string;
    email_placeholder: string;
    subscribe: string;
    newsletter_note: string;
    copyright: string;
    privacy_policy: string;
    terms_of_service: string;
}

export interface CommonDictionary {
    navigation: NavigationDictionary;
    productCard: ProductCardDictionary;
    cart: CartDictionary;
    footer: FooterDictionary;
}

// ============================================================================
// English Dictionary
// ============================================================================

const en: CommonDictionary = {
    navigation: {
        shop: "Shop",
        heritage: "Heritage",
        atelier: "Atelier",
        cart: "Cart",
        search_placeholder: "Search products...",
        shop_now: "Shop Now",
        shop_collection: "Shop Collection",
        our_heritage: "Our Heritage",
        visit_atelier: "Visit Atelier",
        shopping_bag: "Shopping Bag",
        language: "Language",
        tagline: "Handcrafted in Mongolia since 1990",
    },
    productCard: {
        new_badge: "New",
        view_details: "View Details",
        currently_unavailable: "Currently Unavailable",
        usd: "USD",
    },
    cart: {
        your_cart: "Your Cart",
        empty_cart_title: "Your cart is empty",
        empty_cart_description: "Discover our collection of handcrafted Mongolian boots and find the perfect pair.",
        browse_collection: "Browse Collection",
        size: "Size",
        remove: "Remove",
        subtotal: "Subtotal",
        shipping: "Shipping",
        shipping_calculated: "Calculated at checkout",
        free_shipping: "Free",
        tax: "Tax",
        discount: "Discount",
        total: "Total",
        checkout: "Proceed to Checkout",
        continue_shopping: "Continue Shopping",
        promo_code: "Promo Code",
        apply: "Apply",
        promo_applied: "applied",
        items_in_cart: "items",
        item_in_cart: "item",
    },
    footer: {
        brand_description: "Handcrafted in Ulaanbaatar since 1990. Where the patience of the steppe meets the precision of the atelier.",
        brand_quote: "Some things cannot be rushed.",
        shop_title: "Shop",
        all_collection: "All Collection",
        ceremonial: "Ceremonial",
        festival: "Festival",
        traditional: "Traditional",
        daily_wear: "Daily Wear",
        support_title: "Support",
        size_guide: "Size Guide",
        care_instructions: "Care Instructions",
        shipping_returns: "Shipping & Returns",
        warranty: "Warranty",
        contact_us: "Contact Us",
        atelier_title: "Atelier",
        address_line1: "Khan-Uul District, 15th Khoroo",
        address_line2: "Ulaanbaatar, Mongolia",
        hours_label: "Hours",
        hours_weekday: "Mon - Fri: 09:00 - 18:00",
        hours_saturday: "Sat: 10:00 - 15:00",
        newsletter_title: "Join the Quiet Circle",
        newsletter_description: "Reserved for those who appreciate craft over convenience. Early access to new releases, stories from the workshop, and the occasional piece we make just once. No noise. No spam.",
        email_placeholder: "Your email",
        subscribe: "Subscribe",
        newsletter_note: "We send perhaps four letters per year. We understand your inbox is precious.",
        copyright: "Domog Brand. All rights reserved.",
        privacy_policy: "Privacy Policy",
        terms_of_service: "Terms of Service",
    },
};

// ============================================================================
// Mongolian Dictionary
// ============================================================================

const mn: CommonDictionary = {
    navigation: {
        shop: "Дэлгүүр",
        heritage: "Өв уламжлал",
        atelier: "Урлан",
        cart: "Сагс",
        search_placeholder: "Бүтээгдэхүүн хайх...",
        shop_now: "Худалдан авах",
        shop_collection: "Цуглуулга үзэх",
        our_heritage: "Бидний өв",
        visit_atelier: "Урланд зочлох",
        shopping_bag: "Худалдааны сагс",
        language: "Хэл",
        tagline: "1990 оноос Монголд гараар урласан",
    },
    productCard: {
        new_badge: "Шинэ",
        view_details: "Дэлгэрэнгүй",
        currently_unavailable: "Түр дууссан",
        usd: "ам.доллар",
    },
    cart: {
        your_cart: "Таны сагс",
        empty_cart_title: "Таны сагс хоосон байна",
        empty_cart_description: "Монголын гар урлалын гутлын цуглуулгаас өөрт тохирох хослолыг олоорой.",
        browse_collection: "Цуглуулга үзэх",
        size: "Хэмжээ",
        remove: "Хасах",
        subtotal: "Дүн",
        shipping: "Хүргэлт",
        shipping_calculated: "Төлбөрийн үед тооцоолно",
        free_shipping: "Үнэгүй",
        tax: "Татвар",
        discount: "Хөнгөлөлт",
        total: "Нийт",
        checkout: "Төлбөр төлөх",
        continue_shopping: "Худалдааг үргэлжлүүлэх",
        promo_code: "Промо код",
        apply: "Хэрэглэх",
        promo_applied: "хэрэглэгдсэн",
        items_in_cart: "бүтээгдэхүүн",
        item_in_cart: "бүтээгдэхүүн",
    },
    footer: {
        brand_description: "1990 оноос Улаанбаатар хотод гараар урласан. Тал нутгийн тэвчээр урланы нарийн урлалтай уулздаг газар.",
        brand_quote: "Зарим зүйлийг яарах боломжгүй.",
        shop_title: "Дэлгүүр",
        all_collection: "Бүх цуглуулга",
        ceremonial: "Ёслолын",
        festival: "Баярын",
        traditional: "Уламжлалт",
        daily_wear: "Өдөр тутмын",
        support_title: "Тусламж",
        size_guide: "Хэмжээний заавар",
        care_instructions: "Арчилгааны заавар",
        shipping_returns: "Хүргэлт ба буцаалт",
        warranty: "Баталгаа",
        contact_us: "Холбоо барих",
        atelier_title: "Урлан",
        address_line1: "Хан-Уул дүүрэг, 15-р хороо",
        address_line2: "Улаанбаатар, Монгол",
        hours_label: "Цагийн хуваарь",
        hours_weekday: "Даваа - Баасан: 09:00 - 18:00",
        hours_saturday: "Бямба: 10:00 - 15:00",
        newsletter_title: "Тайван бүлгэмд нэгдээрэй",
        newsletter_description: "Тав тухаас илүү урлалыг үнэлдэг хүмүүст зориулсан. Шинэ бүтээгдэхүүнд эрт хандах эрх, цехийн түүхүүд, ганц удаа хийдэг онцгой бүтээлүүд. Шуугиангүй. Спамгүй.",
        email_placeholder: "Таны имэйл",
        subscribe: "Бүртгүүлэх",
        newsletter_note: "Бид жилд дөрвөн захидал илгээдэг. Таны мэйл хайрцаг үнэ цэнэтэй гэдгийг бид ойлгодог.",
        copyright: "Домог Брэнд. Бүх эрх хуулиар хамгаалагдсан.",
        privacy_policy: "Нууцлалын бодлого",
        terms_of_service: "Үйлчилгээний нөхцөл",
    },
};

// ============================================================================
// Dictionary Map
// ============================================================================

const dictionaries: Record<Locale, CommonDictionary> = {
    en,
    mn,
};

// ============================================================================
// Getter Function
// ============================================================================

/**
 * Get the complete dictionary for a locale
 * @param locale - The locale code ('en' or 'mn')
 * @returns The complete CommonDictionary for that locale
 */
export function getDictionary(locale: Locale): CommonDictionary {
    return dictionaries[locale] || dictionaries.en;
}

/**
 * Get a specific section of the dictionary
 * @param locale - The locale code
 * @param section - The section name ('navigation', 'productCard', 'cart', 'footer')
 */
export function getDictionarySection<K extends keyof CommonDictionary>(
    locale: Locale,
    section: K
): CommonDictionary[K] {
    const dict = getDictionary(locale);
    return dict[section];
}
