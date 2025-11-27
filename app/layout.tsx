import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ToastProvider as LegacyToastProvider } from "@/components/ui";
import { ToastProvider } from "@/components/ToastProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { SmartSearch } from "@/components/SmartSearch";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const inter = Inter({ 
    subsets: ["latin"], 
    variable: "--font-inter",
    weight: ["300", "400", "500", "600"],
    display: "swap",
    preload: true,
});

const playfair = Playfair_Display({ 
    subsets: ["latin"], 
    variable: "--font-playfair",
    weight: ["400", "500", "600", "700"],
    display: "swap",
    preload: true,
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FAF8F3' },
        { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL('https://domogbrand.com'),
    title: {
        default: "Domog Brand | Premium Handcrafted Mongolian Footwear",
        template: "%s | Domog Brand"
    },
    description: "Handcrafted traditional Mongolian boots since 1990. 35 years of master craftsmanship serving presidents, Olympic champions, and discerning collectors worldwide.",
    keywords: [
        "Mongolian boots",
        "handcrafted footwear",
        "luxury boots",
        "traditional craftsmanship",
        "artisan boots",
        "premium leather boots",
        "bespoke footwear",
        "Domog Brand"
    ],
    authors: [{ name: "Domog Brand", url: "https://domogbrand.com" }],
    creator: "Domog Brand",
    publisher: "Domog Brand",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://domogbrand.com",
        siteName: "Domog Brand",
        title: "Domog Brand | Premium Handcrafted Mongolian Footwear",
        description: "Handcrafted traditional Mongolian boots. 35 years of master craftsmanship for presidents, champions, and discerning collectors.",
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
        title: "Domog Brand | Premium Mongolian Footwear",
        description: "Handcrafted traditional Mongolian boots. 35 years of master craftsmanship.",
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
    category: "Fashion & Footwear",
};

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
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
                <Navigation />
                <main id="main-content">{children}</main>
                <Footer />
                <CartDrawer />
                <SmartSearch />
                <NewsletterPopup delay={15000} exitIntent={true} />
                <ToastProvider />
                <PerformanceMonitor />
            </body>
        </html>
    );
}
