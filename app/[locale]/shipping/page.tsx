import { Metadata } from "next";
import Link from "next/link";
import { locales, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import { Truck, Globe, RefreshCw, Clock, Shield, Package } from "lucide-react";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const isEN = params.locale === 'en';
    return {
        title: isEN ? 'Shipping & Returns' : 'Хүргэлт ба Буцаалт',
        description: isEN 
            ? 'Shipping and returns policy for Domog Brand handcrafted Mongolian boots. Worldwide delivery, satisfaction guaranteed.'
            : 'Домог Брэндийн гар урлалын гутлын хүргэлт, буцаалтын бодлого. Дэлхий даяар хүргэлт, сэтгэл ханамжийн баталгаа.',
    };
}

export default function ShippingPage({ params: { locale } }: PageProps) {
    if (!isValidLocale(locale)) {
        notFound();
    }
    
    const isEN = locale === 'en';

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Header */}
            <section className="bg-charcoal-900 py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4">
                        {isEN ? 'Delivery' : 'Хүргэлт'}
                    </span>
                    <h1 className="font-serif text-3xl lg:text-4xl text-cream font-medium">
                        {isEN ? 'Shipping & Returns' : 'Хүргэлт ба Буцаалт'}
                    </h1>
                    <p className="text-cream/70 text-base mt-4 max-w-2xl mx-auto">
                        {isEN 
                            ? 'From our atelier in Ulaanbaatar to your doorstep, anywhere in the world.'
                            : 'Улаанбаатар дахь манай ателье-ээс дэлхийн аль ч өнцөгт таны хаалганд хүрнэ.'}
                    </p>
                </div>
            </section>

            {/* Shipping Info Cards */}
            <section className="py-16 lg:py-24">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    
                    {/* Key Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center p-8 bg-cream-sand border border-cream-200">
                            <div className="w-14 h-14 bg-cream flex items-center justify-center mx-auto mb-4">
                                <Truck className="w-7 h-7 text-cognac" />
                            </div>
                            <h3 className="font-serif text-lg text-charcoal-900 mb-2">
                                {isEN ? 'Free Shipping' : 'Үнэгүй хүргэлт'}
                            </h3>
                            <p className="text-stone-warm text-sm">
                                {isEN ? 'On orders over $500 USD' : '$500-аас дээш захиалгад'}
                            </p>
                        </div>
                        <div className="text-center p-8 bg-cream-sand border border-cream-200">
                            <div className="w-14 h-14 bg-cream flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-7 h-7 text-cognac" />
                            </div>
                            <h3 className="font-serif text-lg text-charcoal-900 mb-2">
                                {isEN ? 'Worldwide Delivery' : 'Дэлхий даяар'}
                            </h3>
                            <p className="text-stone-warm text-sm">
                                {isEN ? 'We ship to over 50 countries' : '50 гаруй улсад хүргэнэ'}
                            </p>
                        </div>
                        <div className="text-center p-8 bg-cream-sand border border-cream-200">
                            <div className="w-14 h-14 bg-cream flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-7 h-7 text-cognac" />
                            </div>
                            <h3 className="font-serif text-lg text-charcoal-900 mb-2">
                                {isEN ? 'Insured Shipping' : 'Даатгалтай хүргэлт'}
                            </h3>
                            <p className="text-stone-warm text-sm">
                                {isEN ? 'Full coverage on all orders' : 'Бүх захиалгад бүрэн даатгал'}
                            </p>
                        </div>
                    </div>

                    {/* Detailed Sections */}
                    <div className="space-y-16">
                        
                        {/* Production Time */}
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-5 h-5 text-cognac" />
                                    <h2 className="font-serif text-2xl text-charcoal-900">
                                        {isEN ? 'Production Time' : 'Үйлдвэрлэлийн хугацаа'}
                                    </h2>
                                </div>
                                <p className="text-stone-warm leading-relaxed mb-4">
                                    {isEN 
                                        ? 'Each pair of Domog boots is handcrafted to order by our master artisans. This process cannot be rushed—quality demands patience.'
                                        : 'Домог гутал бүрийг манай мастер урчууд захиалгаар гараар урладаг. Энэ процессыг яаравчлах боломжгүй—чанар нь тэвчээр шаарддаг.'}
                                </p>
                                <ul className="space-y-3 text-stone-warm">
                                    <li className="flex gap-2">
                                        <span className="text-cognac">•</span>
                                        {isEN ? 'Standard production: 4-6 weeks' : 'Стандарт үйлдвэрлэл: 4-6 долоо хоног'}
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cognac">•</span>
                                        {isEN ? 'Bespoke orders: 6-8 weeks' : 'Тусгай захиалга: 6-8 долоо хоног'}
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cognac">•</span>
                                        {isEN ? 'Rush orders: Contact us for availability' : 'Яаралтай захиалга: Боломжийг лавлана уу'}
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-cream-sand p-8 border-l-2 border-gold/30">
                                <p className="font-serif text-lg text-charcoal-900 italic">
                                    {isEN 
                                        ? '"We take forty hours to craft each pair. They will last forty years. We believe this is a fair exchange."'
                                        : '"Нэг хос бүрийг дөчин цагийн турш урладаг. Тэд дөчин жил тэсвэрлэнэ. Энэ бол шударга солилцоо гэж бид үзэж байна."'}
                                </p>
                            </div>
                        </div>

                        {/* Shipping Rates */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Package className="w-5 h-5 text-cognac" />
                                <h2 className="font-serif text-2xl text-charcoal-900">
                                    {isEN ? 'Shipping Rates & Times' : 'Хүргэлтийн үнэ ба хугацаа'}
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-charcoal-900">
                                            <th className="text-left py-4 pr-6 font-medium text-charcoal-900">
                                                {isEN ? 'Region' : 'Бүс нутаг'}
                                            </th>
                                            <th className="text-left py-4 pr-6 font-medium text-charcoal-900">
                                                {isEN ? 'Standard' : 'Стандарт'}
                                            </th>
                                            <th className="text-left py-4 pr-6 font-medium text-charcoal-900">
                                                {isEN ? 'Express' : 'Шуурхай'}
                                            </th>
                                            <th className="text-left py-4 font-medium text-charcoal-900">
                                                {isEN ? 'Delivery Time' : 'Хүргэлтийн хугацаа'}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-stone-warm">
                                        <tr className="border-b border-cream-200">
                                            <td className="py-4 pr-6">{isEN ? 'Mongolia' : 'Монгол'}</td>
                                            <td className="py-4 pr-6">{isEN ? 'Free' : 'Үнэгүй'}</td>
                                            <td className="py-4 pr-6">$15</td>
                                            <td className="py-4">2-5 {isEN ? 'days' : 'хоног'}</td>
                                        </tr>
                                        <tr className="border-b border-cream-200">
                                            <td className="py-4 pr-6">{isEN ? 'Asia Pacific' : 'Ази Номхон далай'}</td>
                                            <td className="py-4 pr-6">$35</td>
                                            <td className="py-4 pr-6">$65</td>
                                            <td className="py-4">7-14 {isEN ? 'days' : 'хоног'}</td>
                                        </tr>
                                        <tr className="border-b border-cream-200">
                                            <td className="py-4 pr-6">{isEN ? 'Europe' : 'Европ'}</td>
                                            <td className="py-4 pr-6">$45</td>
                                            <td className="py-4 pr-6">$85</td>
                                            <td className="py-4">10-18 {isEN ? 'days' : 'хоног'}</td>
                                        </tr>
                                        <tr className="border-b border-cream-200">
                                            <td className="py-4 pr-6">{isEN ? 'North America' : 'Хойд Америк'}</td>
                                            <td className="py-4 pr-6">$45</td>
                                            <td className="py-4 pr-6">$95</td>
                                            <td className="py-4">10-21 {isEN ? 'days' : 'хоног'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 pr-6">{isEN ? 'Rest of World' : 'Бусад улсууд'}</td>
                                            <td className="py-4 pr-6">$55</td>
                                            <td className="py-4 pr-6">$110</td>
                                            <td className="py-4">14-28 {isEN ? 'days' : 'хоног'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-stone-warm text-sm mt-4">
                                {isEN 
                                    ? '* Free shipping on orders over $500 USD to all destinations.'
                                    : '* $500-аас дээш захиалгад бүх улсад үнэгүй хүргэлт.'}
                            </p>
                        </div>

                        {/* Returns */}
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <RefreshCw className="w-5 h-5 text-cognac" />
                                    <h2 className="font-serif text-2xl text-charcoal-900">
                                        {isEN ? 'Returns & Exchanges' : 'Буцаалт ба Солилт'}
                                    </h2>
                                </div>
                                <p className="text-stone-warm leading-relaxed mb-4">
                                    {isEN 
                                        ? 'We stand behind our craftsmanship. If you are not completely satisfied, we offer:'
                                        : 'Бид өөрсдийн урлалдаа баталгаа өгдөг. Хэрэв та бүрэн сэтгэл хангалуун бус бол:'}
                                </p>
                                <ul className="space-y-3 text-stone-warm">
                                    <li className="flex gap-2">
                                        <span className="text-cognac">•</span>
                                        {isEN ? '30-day return window for unworn boots' : 'Өмсөөгүй гутлыг 30 хоногийн дотор буцаах боломжтой'}
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cognac">•</span>
                                        {isEN ? 'Free exchanges for sizing issues' : 'Хэмжээний асуудалтай бол үнэгүй солино'}
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cognac">•</span>
                                        {isEN ? 'Full refund to original payment method' : 'Анхны төлбөрийн хэлбэрээр бүрэн буцаалт'}
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-burgundy-700/10 p-8 border border-burgundy-700/20">
                                <h3 className="font-medium text-charcoal-900 mb-3">
                                    {isEN ? 'Non-Returnable Items' : 'Буцаагдахгүй бүтээгдэхүүн'}
                                </h3>
                                <ul className="space-y-2 text-stone-warm text-sm">
                                    <li>• {isEN ? 'Custom/bespoke orders' : 'Тусгай захиалгууд'}</li>
                                    <li>• {isEN ? 'Boots showing signs of wear' : 'Өмссөн ул мөртэй гутал'}</li>
                                    <li>• {isEN ? 'Items without original packaging' : 'Анхны савлагаагүй бүтээгдэхүүн'}</li>
                                    <li>• {isEN ? 'Sale items (final sale)' : 'Хямдралтай бараа (эцсийн борлуулалт)'}</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Contact CTA */}
                    <div className="mt-16 pt-16 border-t border-cream-200 text-center">
                        <h3 className="font-serif text-xl text-charcoal-900 mb-4">
                            {isEN ? 'Questions about your order?' : 'Захиалгын талаар асуулт байна уу?'}
                        </h3>
                        <p className="text-stone-warm mb-6">
                            {isEN 
                                ? 'Our team is here to help with any shipping or returns inquiries.'
                                : 'Манай баг хүргэлт, буцаалтын талаар туслахад бэлэн байна.'}
                        </p>
                        <Link 
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-2 bg-charcoal-900 text-cream-50 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
                        >
                            {isEN ? 'Contact Us' : 'Холбоо барих'}
                        </Link>
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
            </section>
        </div>
    );
}
