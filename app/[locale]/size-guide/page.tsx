import { Metadata } from "next";
import { locales, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import SizeGuideContent from "./SizeGuideContent";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const isEN = params.locale === 'en';
    return {
        title: isEN ? 'Size Guide' : 'Хэмжээний Заавар',
        description: isEN 
            ? 'Find your perfect Domog boot size with our comprehensive size guide and measurement instructions.'
            : 'Манай дэлгэрэнгүй хэмжээний заавар, хэмжилтийн зааврын тусламжтайгаар төгс Домог гутлын хэмжээгээ олоорой.',
    };
}

export default function SizeGuidePage({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }
    
    return <SizeGuideContent />;
}
