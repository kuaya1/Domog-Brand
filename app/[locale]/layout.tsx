import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import dynamic from "next/dynamic";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ToastProvider";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { locales, isValidLocale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { SITE_URL } from '@/lib/seo/metadata';
import { siteSchema } from '@/lib/seo/structured-data';
import { notFound } from 'next/navigation';

// Not needed for the first render
const CartDrawer = dynamic(() => import('@/components/CartDrawer').then(mod => ({ default: mod.CartDrawer })), {
    ssr: false,
    loading: () => null,
});

const SmartSearch = dynamic(() => import('@/components/SmartSearch').then(mod => ({ default: mod.SmartSearch })), {
    ssr: false,
    loading: () => null,
});

const OfferNotice = dynamic(() => import('@/components/OfferNotice').then(mod => ({ default: mod.OfferNotice })), {
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

/**
 * Site-wide defaults only. Each page sets its own title, description,
 * canonical URL and language alternates (lib/seo/metadata.ts), so no page
 * inherits the home page's canonical.
 */
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
    const t = getMessages(params.locale);
    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: t.meta.home.title,
            template: t.meta.titleTemplate,
        },
        description: t.meta.home.description,
        applicationName: t.meta.siteName,
        robots: { index: true, follow: true },
    };
}

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export default function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }

    const t = getMessages(locale);

    return (
        <html lang={locale} className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="manifest" href="/manifest.json" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema(locale)) }}
                />
            </head>
            <body className={`${inter.variable} ${playfair.variable} font-sans bg-cream text-charcoal-900 antialiased`}>
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-charcoal-900"
                >
                    {t.common.skipToContent}
                </a>
                <Navigation />
                <main id="main-content">{children}</main>
                <Footer />
                <CartDrawer />
                <SmartSearch />
                <OfferNotice delay={15000} exitIntent={true} />
                <ToastProvider />
                <PerformanceMonitor />
            </body>
        </html>
    );
}
