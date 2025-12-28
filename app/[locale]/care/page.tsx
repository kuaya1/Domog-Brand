import { Metadata } from "next";
import { locales, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import { getCareMetadata } from "@/lib/seo/metadata";
import { getCarePageSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import CareContent from "./CareContent";

// Generate static params for both locales
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

// SEO Metadata for Care page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return getCareMetadata(params.locale);
}

export default function CarePage({ params: { locale } }: PageProps) {
    // Validate locale
    if (!isValidLocale(locale)) {
        notFound();
    }
    
    // Structured data for Care page
    const careSchema = getCarePageSchema();
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: `/${locale}` },
        { name: locale === 'mn' ? 'Арчилгаа' : 'Care Guide', url: `/${locale}/care` },
    ], locale);

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(careSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            
            <CareContent locale={locale} />
        </>
    );
}
