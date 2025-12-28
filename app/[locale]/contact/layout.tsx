import { Metadata } from "next";
import { getContactMetadata } from "@/lib/seo/metadata";
import { getContactPageSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data";

// SEO Metadata for Contact page
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    return getContactMetadata(params.locale);
}

export default function ContactLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Structured data for Contact page
    const contactSchema = getContactPageSchema();
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: `/${locale}` },
        { name: locale === 'mn' ? 'Холбоо барих' : 'Contact', url: `/${locale}/contact` },
    ], locale);

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
