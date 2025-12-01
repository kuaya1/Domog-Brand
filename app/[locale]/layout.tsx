import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import dynamic from "next/dynamic";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ToastProvider as LegacyToastProvider } from "@/components/ui";
import { ToastProvider } from "@/components/ToastProvider";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { locales, isValidLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/dictionaries';
import { notFound } from 'next/navigation';

// Dynamic imports for non-critical components
// These components are not needed for initial render and can be lazy-loaded
const CartDrawer = dynamic(() => import('@/components/CartDrawer').then(mod => ({ default: mod.CartDrawer })), {
    ssr: false,
    loading: () => null, // Cart drawer is hidden by default
});

const SmartSearch = dynamic(() => import('@/components/SmartSearch').then(mod => ({ default: mod.SmartSearch })), {
    ssr: false,
    loading: () => null,
});

const NewsletterPopup = dynamic(() => import('@/components/NewsletterPopup').then(mod => ({ default: mod.NewsletterPopup })), {
    ssr: false,
    loading: () => null,
});

const inter = Inter({ 
    subsets: ["latin", "cyrillic"], 
    variable: "--font-inter",
    weight: ["300", "400", "500", "600"],
    display: "swap",
    preload: true,
});

const playfair = Playfair_Display({ 
    subsets: ["latin", "cyrillic"], 
    variable: "--font-playfair",
    weight: ["400", "500", "600", "700"],
    display: "swap",
    preload: true,
});

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FAF8F3' },
        { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    ],
};

// Metadata based on locale
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale;
    
    const titles: Record<string, string> = {
        en: "Domog Brand | Premium Handcrafted Mongolian Footwear",
        mn: "Домог Брэнд | Монгол гар урлалын гутал",
    };
    
    const descriptions: Record<string, string> = {
        en: "Handcrafted traditional Mongolian boots since 1990. 35 years of master craftsmanship serving presidents, Olympic champions, and discerning collectors worldwide.",
        mn: "1990 оноос хойш уламжлалт Монгол гутлыг гараар урлаж байна. Ерөнхийлөгч нар, Олимпийн аваргууд болон дэлхийн цуглуулагчдад 35 жил үйлчилж байна.",
    };

    return {
        metadataBase: new URL('https://domogbrand.com'),
        title: {
            default: titles[locale] || titles.en,
            template: `%s | ${locale === 'mn' ? 'Домог Брэнд' : 'Domog Brand'}`
        },
        description: descriptions[locale] || descriptions.en,
        keywords: [
            "Mongolian boots",
            "handcrafted footwear",
            "luxury boots",
            "traditional craftsmanship",
            "Монгол гутал",
            "гар урлал",
            "Domog Brand"
        ],
        authors: [{ name: "Domog Brand", url: "https://domogbrand.com" }],
        creator: "Domog Brand",
        publisher: "Domog Brand",
        openGraph: {
            type: "website",
            locale: locale === 'mn' ? "mn_MN" : "en_US",
            url: "https://domogbrand.com",
            siteName: locale === 'mn' ? "Домог Брэнд" : "Domog Brand",
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            images: [
                {
                    url: "/images/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Domog Brand - Premium Mongolian Boots",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            images: ["/images/og-image.jpg"],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: `https://domogbrand.com/${locale}`,
            languages: {
                'en': 'https://domogbrand.com/en',
                'mn': 'https://domogbrand.com/mn',
            },
        },
    };
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Domog Brand',
    url: 'https://domogbrand.com',
    logo: 'https://domogbrand.com/images/logo.png',
    description: 'Premium handcrafted Mongolian boots since 1990',
    foundingDate: '1990',
    foundingLocation: {
        '@type': 'Place',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ulaanbaatar',
            addressCountry: 'Mongolia'
        }
    },
    sameAs: [
        'https://www.facebook.com/mongolundesniieetengutal/',
        'https://instagram.com/domogbrand'
    ]
};

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export default function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
    // Validate locale
    if (!isValidLocale(locale)) {
        notFound();
    }

    // Get dictionary for this locale
    const dictionary = getDictionary(locale);

    return (
        <html lang={locale} className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.variable} ${playfair.variable} font-sans bg-cream text-black antialiased`}>
                <a 
                    href="#main-content" 
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-black"
                >
                    Skip to main content
                </a>
                <Navigation dictionary={dictionary.navigation} />
                <main id="main-content">{children}</main>
                <Footer dictionary={dictionary.footer} locale={locale} />
                <CartDrawer dictionary={dictionary.cart} locale={locale} />
                <SmartSearch />
                <NewsletterPopup delay={15000} exitIntent={true} />
                <ToastProvider />
                <PerformanceMonitor />
            </body>
        </html>
    );
}
