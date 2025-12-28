import { Metadata } from "next";
import Link from "next/link";
import { locales, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import { Shield, Wrench, Clock, CheckCircle, AlertCircle } from "lucide-react";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const isEN = params.locale === 'en';
    return {
        title: isEN ? 'Lifetime Warranty' : 'Насан туршийн баталгаа',
        description: isEN 
            ? 'Domog Brand lifetime craftsmanship warranty. We stand behind every stitch for the life of your boots.'
            : 'Домог Брэндийн насан туршийн урлалын баталгаа. Таны гутлын насан туршид бид оёдол бүрдээ баталгаа өгнө.',
    };
}

export default function WarrantyPage({ params: { locale } }: PageProps) {
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
                        {isEN ? 'Our Promise' : 'Манай амлалт'}
                    </span>
                    <h1 className="font-serif text-3xl lg:text-4xl text-cream font-medium">
                        {isEN ? 'Lifetime Craftsmanship Warranty' : 'Насан Туршийн Урлалын Баталгаа'}
                    </h1>
                    <p className="text-cream/70 text-base mt-4 max-w-2xl mx-auto">
                        {isEN 
                            ? 'Every pair of Domog boots is built to last a lifetime. We stand behind every stitch.'
                            : 'Домог гутал бүр насан турш тэсвэрлэхээр бүтээгдсэн. Бид оёдол бүрдээ баталгаа өгнө.'}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    
                    {/* Promise Statement */}
                    <div className="text-center mb-16 pb-16 border-b border-cream-200">
                        <div className="w-20 h-20 bg-cream-sand flex items-center justify-center mx-auto mb-6 rounded-full">
                            <Shield className="w-10 h-10 text-cognac" />
                        </div>
                        <p className="font-serif text-xl lg:text-2xl text-charcoal-900 leading-relaxed max-w-2xl mx-auto">
                            {isEN 
                                ? '"When a boot leaves our workshop, it carries our name. That name means something. If our work fails, we make it right."'
                                : '"Гутал манай цехээс гарахдаа манай нэрийг авч явдаг. Энэ нэр утга учиртай. Хэрэв манай ажил амжилтгүй болвол бид засна."'}
                        </p>
                        <p className="text-stone-warm mt-4 text-sm uppercase tracking-wider">
                            — {isEN ? 'Master Craftsman, Domog Atelier' : 'Мастер Урчин, Домог Ателье'}
                        </p>
                    </div>

                    {/* What's Covered */}
                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-8 flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-cognac" />
                            {isEN ? 'What Our Warranty Covers' : 'Баталгаанд хамрагдах зүйлс'}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    en: 'Structural defects in craftsmanship',
                                    mn: 'Урлалын бүтцийн алдаа'
                                },
                                {
                                    en: 'Stitching failures under normal use',
                                    mn: 'Хэвийн хэрэглээнд оёдлын эвдрэл'
                                },
                                {
                                    en: 'Sole separation from the upper',
                                    mn: 'Ул-ын дээд хэсгээс салах'
                                },
                                {
                                    en: 'Hardware defects (buckles, eyelets)',
                                    mn: 'Эд анги-ийн алдаа (тоолуур, нүд)'
                                },
                                {
                                    en: 'Leather delamination or peeling',
                                    mn: 'Арьс хуурах, хальсрах'
                                },
                                {
                                    en: 'Zipper malfunctions (where applicable)',
                                    mn: 'Цахилгаан түгжээний алдаа (хамааралтай бол)'
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 bg-cream-sand">
                                    <CheckCircle className="w-5 h-5 text-cognac flex-shrink-0 mt-0.5" />
                                    <span className="text-stone-warm">{isEN ? item.en : item.mn}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Not Covered */}
                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-8 flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-burgundy-700" />
                            {isEN ? 'Not Covered by Warranty' : 'Баталгаанд хамрагдахгүй'}
                        </h2>
                        <div className="bg-burgundy-700/5 border border-burgundy-700/20 p-8">
                            <ul className="space-y-3 text-stone-warm">
                                <li className="flex gap-2">
                                    <span className="text-burgundy-700">•</span>
                                    {isEN ? 'Normal wear and tear (scuffs, creasing, patina development)' : 'Хэвийн элэгдэл (зураас, үрчлээ, патина хөгжил)'}
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-burgundy-700">•</span>
                                    {isEN ? 'Damage from improper care or storage' : 'Буруу арчилгаа, хадгалалтаас үүдсэн гэмтэл'}
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-burgundy-700">•</span>
                                    {isEN ? 'Water damage (beyond normal exposure)' : 'Усны гэмтэл (хэвийн хэрэглээнээс давсан)'}
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-burgundy-700">•</span>
                                    {isEN ? 'Modifications or repairs by non-authorized parties' : 'Зөвшөөрөлгүй талын өөрчлөлт, засвар'}
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-burgundy-700">•</span>
                                    {isEN ? 'Sole wear from regular use (resoling available)' : 'Хэрэглээнээс болсон ул элэгдэл (дахин ул солих боломжтой)'}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Resoling Service */}
                    <div className="mb-16 bg-cream-sand p-8 lg:p-12">
                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-cream flex items-center justify-center flex-shrink-0">
                                <Wrench className="w-7 h-7 text-cognac" />
                            </div>
                            <div>
                                <h3 className="font-serif text-xl text-charcoal-900 mb-3">
                                    {isEN ? 'Resoling & Refurbishment Service' : 'Ул солих ба Сэргээх үйлчилгээ'}
                                </h3>
                                <p className="text-stone-warm leading-relaxed mb-4">
                                    {isEN 
                                        ? 'Boots are designed to be resoled, not replaced. When your soles wear down—a sign of a life well-lived—send them back to us. Our craftsmen will restore them to their former glory.'
                                        : 'Гутлыг солихгүй, ул солихоор зориулан бүтээсэн. Таны ул элэгдэхэд—сайн амьдарсны тэмдэг—буцааж илгээнэ үү. Манай урчууд хуучин гоо сайхныг нь сэргээнэ.'}
                                </p>
                                <ul className="space-y-2 text-stone-warm text-sm">
                                    <li>• {isEN ? 'Resoling: $85-120 depending on style' : 'Ул солих: $85-120 загвараас хамаарна'}</li>
                                    <li>• {isEN ? 'Full refurbishment: $150-200' : 'Бүрэн сэргээлт: $150-200'}</li>
                                    <li>• {isEN ? 'Turnaround time: 2-3 weeks' : 'Хугацаа: 2-3 долоо хоног'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* How to Claim */}
                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-8 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-cognac" />
                            {isEN ? 'How to Make a Warranty Claim' : 'Баталгаат нэхэмжлэл гаргах'}
                        </h2>
                        <div className="space-y-6">
                            {[
                                {
                                    step: 1,
                                    en: { title: 'Contact Us', desc: 'Email domogbrand@gmail.com with photos of the issue and your order number.' },
                                    mn: { title: 'Бидэнтэй холбогдоно уу', desc: 'Асуудлын зураг, захиалгын дугаартай имэйлийг domogbrand@gmail.com руу илгээнэ үү.' }
                                },
                                {
                                    step: 2,
                                    en: { title: 'Assessment', desc: 'Our team will review your claim within 48 hours and advise on next steps.' },
                                    mn: { title: 'Үнэлгээ', desc: 'Манай баг таны нэхэмжлэлийг 48 цагийн дотор хянаж, дараагийн алхмуудыг зөвлөнө.' }
                                },
                                {
                                    step: 3,
                                    en: { title: 'Ship to Atelier', desc: 'If approved, ship your boots to our atelier. We provide a prepaid label for warranty repairs.' },
                                    mn: { title: 'Ателье руу илгээх', desc: 'Зөвшөөрөгдсөн бол гутлаа манай ателье руу илгээнэ үү. Баталгаат засварт урьдчилан төлсөн шошго өгнө.' }
                                },
                                {
                                    step: 4,
                                    en: { title: 'Repair or Replace', desc: 'We will repair or, if not possible, replace your boots and return them to you.' },
                                    mn: { title: 'Засах эсвэл солих', desc: 'Бид засварлах эсвэл боломжгүй бол гутлыг солиод буцааж илгээнэ.' }
                                }
                            ].map((item) => (
                                <div key={item.step} className="flex gap-6">
                                    <div className="w-10 h-10 bg-charcoal-900 text-cream-50 flex items-center justify-center flex-shrink-0 font-medium">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-charcoal-900 mb-1">
                                            {isEN ? item.en.title : item.mn.title}
                                        </h3>
                                        <p className="text-stone-warm">
                                            {isEN ? item.en.desc : item.mn.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="text-center pt-8 border-t border-cream-200">
                        <h3 className="font-serif text-xl text-charcoal-900 mb-4">
                            {isEN ? 'Need warranty assistance?' : 'Баталгааны тусламж хэрэгтэй юу?'}
                        </h3>
                        <p className="text-stone-warm mb-6">
                            {isEN 
                                ? 'Our team is ready to help with any concerns about your Domog boots.'
                                : 'Манай баг таны Домог гутлын талаар ямар ч асуудалд туслахад бэлэн байна.'}
                        </p>
                        <Link 
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-2 bg-charcoal-900 text-cream-50 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
                        >
                            {isEN ? 'Contact Warranty Support' : 'Баталгааны тусламж авах'}
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
