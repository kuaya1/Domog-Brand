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
        title: isEN ? 'Privacy Policy' : 'Нууцлалын бодлого',
        description: isEN 
            ? 'Privacy Policy for Domog Brand - How we collect, use, and protect your personal information.'
            : 'Домог Брэндийн нууцлалын бодлого - Таны хувийн мэдээллийг хэрхэн цуглуулж, ашиглаж, хамгаалах тухай.',
    };
}

export default function PrivacyPage({ params: { locale } }: PageProps) {
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
                        {isEN ? 'Privacy Policy' : 'Нууцлалын Бодлого'}
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
                            {isEN ? '1. Information We Collect' : '1. Бидний цуглуулдаг мэдээлэл'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'At Domog Brand, we collect information you provide directly when you place an order, contact our atelier, or subscribe to our newsletter. This includes your name, email address, shipping address, phone number, and payment information.'
                                : 'Домог Брэнд нь таныг захиалга өгөх, манай ателье холбогдох, эсвэл мэдээллийн товхимолд бүртгүүлэхэд шууд өгсөн мэдээллийг цуглуулдаг. Үүнд таны нэр, имэйл хаяг, хүргэлтийн хаяг, утасны дугаар, төлбөрийн мэдээлэл багтана.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '2. How We Use Your Information' : '2. Таны мэдээллийг хэрхэн ашигладаг'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-4">
                            {isEN ? 'We use your information to:' : 'Бид таны мэдээллийг дараах зорилгоор ашигладаг:'}
                        </p>
                        <ul className="list-disc list-inside text-stone-warm space-y-2 mb-6">
                            <li>{isEN ? 'Process and fulfill your orders' : 'Таны захиалгыг боловсруулж, биелүүлэх'}</li>
                            <li>{isEN ? 'Communicate about your commission' : 'Таны захиалгын талаар холбогдох'}</li>
                            <li>{isEN ? 'Send updates about new collections (if subscribed)' : 'Шинэ цуглуулгын талаар мэдээлэл илгээх (бүртгүүлсэн бол)'}</li>
                            <li>{isEN ? 'Improve our craftsmanship and services' : 'Манай урлал, үйлчилгээг сайжруулах'}</li>
                            <li>{isEN ? 'Comply with legal obligations' : 'Хуулийн шаардлагыг биелүүлэх'}</li>
                        </ul>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '3. Information Sharing' : '3. Мэдээлэл хуваалцах'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'We do not sell your personal information. We share data only with trusted partners necessary to fulfill your order: shipping carriers, payment processors, and our workshop team. All partners are bound by confidentiality agreements.'
                                : 'Бид таны хувийн мэдээллийг зардаггүй. Зөвхөн таны захиалгыг биелүүлэхэд шаардлагатай итгэмжлэгдсэн түншүүдтэй хуваалцдаг: тээврийн компаниуд, төлбөрийн системүүд, манай цехийн баг. Бүх түншүүд нууцлалын гэрээгээр хязгаарлагддаг.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '4. Data Security' : '4. Өгөгдлийн аюулгүй байдал'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'We implement industry-standard security measures to protect your information. All transactions are encrypted using SSL technology. We retain your data only as long as necessary to provide our services and comply with legal requirements.'
                                : 'Бид таны мэдээллийг хамгаалахын тулд салбарын стандарт аюулгүй байдлын арга хэмжээг хэрэгжүүлдэг. Бүх гүйлгээ SSL технологи ашиглан шифрлэгддэг. Бид таны өгөгдлийг зөвхөн үйлчилгээ үзүүлэх, хуулийн шаардлагыг биелүүлэхэд шаардлагатай хугацаанд хадгалдаг.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '5. Your Rights' : '5. Таны эрхүүд'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-4">
                            {isEN ? 'You have the right to:' : 'Танд дараах эрхүүд бий:'}
                        </p>
                        <ul className="list-disc list-inside text-stone-warm space-y-2 mb-6">
                            <li>{isEN ? 'Access your personal data' : 'Хувийн мэдээлэлдээ хандах'}</li>
                            <li>{isEN ? 'Request correction of inaccurate data' : 'Буруу мэдээллийг засахыг хүсэх'}</li>
                            <li>{isEN ? 'Request deletion of your data' : 'Мэдээллээ устгахыг хүсэх'}</li>
                            <li>{isEN ? 'Unsubscribe from marketing communications' : 'Маркетингийн мэдээллээс татгалзах'}</li>
                        </ul>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '6. Cookies' : '6. Күүки'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'We use essential cookies to ensure our website functions properly. We also use analytics cookies to understand how visitors interact with our site, helping us improve your experience.'
                                : 'Манай вэбсайт зөв ажиллахын тулд зайлшгүй күүки ашигладаг. Мөн зочдын вэбсайттай хэрхэн харилцдагийг ойлгохын тулд аналитик күүки ашиглаж, таны туршлагыг сайжруулахад тусалдаг.'}
                        </p>

                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4 mt-10">
                            {isEN ? '7. Contact Us' : '7. Холбоо барих'}
                        </h2>
                        <p className="text-stone-warm leading-relaxed mb-6">
                            {isEN 
                                ? 'For privacy-related inquiries, please contact us at:'
                                : 'Нууцлалтай холбоотой асуултуудыг дараах хаягаар илгээнэ үү:'}
                        </p>
                        <div className="bg-cream-sand p-6 border-l-2 border-gold/30">
                            <p className="text-charcoal-900 font-medium">Domog Brand</p>
                            <p className="text-stone-warm">Khan-Uul District, 15th Khoroo</p>
                            <p className="text-stone-warm">Ulaanbaatar, Mongolia</p>
                            <p className="text-cognac mt-2">domogbrand@gmail.com</p>
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
