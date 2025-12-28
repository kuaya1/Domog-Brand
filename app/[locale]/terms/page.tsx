import { Metadata } from "next";
import Link from "next/link";
import { locales, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const isEN = params.locale === 'en';
    return {
        title: isEN ? 'Terms of Service' : 'Үйлчилгээний нөхцөл',
        description: isEN 
            ? 'Terms of Service for Domog Brand - Conditions governing your use of our services and purchase of our handcrafted footwear.'
            : 'Домог Брэндийн үйлчилгээний нөхцөл - Манай үйлчилгээг ашиглах, гар урлалын гутал худалдан авах нөхцөлүүд.',
    };
}

export default function TermsPage({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }
    
    const isEN = locale === 'en';
    const lastUpdated = "December 27, 2025";

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Header */}
            <section className="bg-charcoal-900 py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4">
                        {isEN ? 'Legal' : 'Хууль эрх зүй'}
                    </span>
                    <h1 className="font-serif text-3xl lg:text-4xl text-cream font-medium">
                        {isEN ? 'Terms of Service' : 'Үйлчилгээний Нөхцөл'}
                    </h1>
                    <p className="text-cream/60 text-sm mt-4">
                        {isEN ? `Last updated: ${lastUpdated}` : `Сүүлд шинэчлэгдсэн: ${lastUpdated}`}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <div className="prose prose-stone max-w-none">
                        
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4">
                            {isEN ? '1. Agreement to Terms' : '1. Нөхцлийг зөвшөөрөх'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'By accessing or using Domog Brand\'s website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'
                                : 'Домог Брэндийн вэбсайт, үйлчилгээг ашигласнаар та эдгээр Үйлчилгээний нөхцлийг дагаж мөрдөхийг зөвшөөрч байна. Хэрэв та эдгээр нөхцлийг зөвшөөрөхгүй бол манай үйлчилгээг бүү ашиглана уу.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '2. Products and Commissions' : '2. Бүтээгдэхүүн ба захиалга'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-4">
                            {isEN 
                                ? 'All Domog boots are handcrafted to order. By placing a commission:'
                                : 'Бүх Домог гутал захиалгаар гараар урлагддаг. Захиалга өгснөөр:'}
                        </p>
                        <ul className="list-disc list-inside text-stone-warm space-y-2 mb-6">
                            <li>{isEN ? 'You acknowledge production time of 4-8 weeks' : 'Та 4-8 долоо хоногийн үйлдвэрлэлийн хугацааг хүлээн зөвшөөрч байна'}</li>
                            <li>{isEN ? 'Custom orders cannot be cancelled once production begins' : 'Үйлдвэрлэл эхэлсний дараа захиалгыг цуцлах боломжгүй'}</li>
                            <li>{isEN ? 'Prices are in USD unless otherwise stated' : 'Үнэ нь USD-ээр тооцогдоно (өөрөөр заагаагүй бол)'}</li>
                            <li>{isEN ? 'Colors may vary slightly due to natural leather characteristics' : 'Байгалийн арьсны онцлогоос шалтгаалан өнгө бага зэрэг өөр байж болно'}</li>
                        </ul>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '3. Pricing and Payment' : '3. Үнэ ба төлбөр'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'All prices are displayed in USD. Payment is required in full at the time of order. We accept major credit cards and bank transfers. Prices are subject to change without notice, but confirmed orders will be honored at the quoted price.'
                                : 'Бүх үнэ USD-ээр харуулагдсан. Захиалга өгөхдөө бүрэн төлбөрийг төлөх шаардлагатай. Бид гол кредит карт, банкны шилжүүлгийг хүлээн авдаг. Үнэ урьдчилан мэдэгдэлгүйгээр өөрчлөгдөж болох боловч баталгаажсан захиалга нь зарлагдсан үнээр биелэгдэнэ.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '4. Intellectual Property' : '4. Оюуны өмч'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'All content on this website, including designs, images, text, and the Domog Brand name and logo, are the intellectual property of Domog Brand. You may not reproduce, distribute, or use our content without written permission.'
                                : 'Энэхүү вэбсайт дээрх бүх агуулга, түүний дотор дизайн, зураг, текст, Домог Брэндийн нэр, лого нь Домог Брэндийн оюуны өмч юм. Та бичгээр зөвшөөрөл авалгүйгээр манай агуулгыг хуулбарлах, түгээх, ашиглах эрхгүй.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '5. Limitation of Liability' : '5. Хариуцлагын хязгаарлалт'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'Domog Brand shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.'
                                : 'Домог Брэнд нь манай бүтээгдэхүүн, үйлчилгээг ашигласнаас үүдэлтэй шууд бус, санамсаргүй, онцгой, эсвэл үр дагаварт хохирлыг хариуцахгүй. Манай хариуцлага бүтээгдэхүүний худалдан авалтын үнээр хязгаарлагдана.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '6. Governing Law' : '6. Хэрэглэх хууль'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'These terms are governed by the laws of Mongolia. Any disputes shall be resolved in the courts of Ulaanbaatar, Mongolia.'
                                : 'Эдгээр нөхцөл нь Монгол Улсын хуулиар зохицуулагдана. Аливаа маргааныг Улаанбаатар хотын шүүхээр шийдвэрлэнэ.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '7. Changes to Terms' : '7. Нөхцлийн өөрчлөлт'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of our services constitutes acceptance of the modified terms.'
                                : 'Бид эдгээр нөхцлийг хэдийд ч өөрчлөх эрхтэй. Өөрчлөлтийг шинэчлэгдсэн огноотой хамт энэ хуудсанд нийтлэх болно. Манай үйлчилгээг үргэлжлүүлэн ашигласнаар та өөрчилсөн нөхцлийг хүлээн зөвшөөрч байгаа болно.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '8. Contact' : '8. Холбоо барих'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'For questions about these terms, please contact us:'
                                : 'Эдгээр нөхцлийн талаар асуулт байвал бидэнтэй холбогдоно уу:'}
                        </p>
                        <div className="bg-cream-sand p-6 border-l-2 border-gold/30">
                            <p className="text-charcoal-900 font-medium">Domog Brand</p>
                            <p className="text-stone-warm">Khan-Uul District, 15th Khoroo</p>
                            <p className="text-stone-warm">Ulaanbaatar, Mongolia</p>
                            <p className="text-cognac mt-2">legal@domogbrand.com</p>
                        </div>

                        {/* Back Link */}
                        <div className="mt-12 pt-8 border-t border-cream-200">
                            <Link 
                                href={`/${locale}`}
                                className="text-cognac hover:text-cognac/80 transition-colors text-sm uppercase tracking-wider"
                            >
                                ← {isEN ? 'Return to Home' : 'Нүүр хуудас руу буцах'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
