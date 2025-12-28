'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { isValidLocale } from "@/lib/i18n/config";
import { Ruler, ArrowRight, Info, Footprints } from "lucide-react";

// Size conversion data
const sizeChart = [
    { eu: 36, us: 4, uk: 3.5, cm: 22.5 },
    { eu: 37, us: 5, uk: 4, cm: 23 },
    { eu: 38, us: 5.5, uk: 4.5, cm: 23.5 },
    { eu: 39, us: 6, uk: 5.5, cm: 24.5 },
    { eu: 40, us: 7, uk: 6.5, cm: 25.5 },
    { eu: 41, us: 8, uk: 7.5, cm: 26 },
    { eu: 42, us: 8.5, uk: 8, cm: 26.5 },
    { eu: 43, us: 9.5, uk: 9, cm: 27.5 },
    { eu: 44, us: 10.5, uk: 10, cm: 28.5 },
    { eu: 45, us: 11.5, uk: 11, cm: 29 },
];

export default function SizeGuideContent() {
    const params = useParams();
    const locale = typeof params.locale === 'string' ? params.locale : 'en';
    const isEN = isValidLocale(locale) ? locale === 'en' : true;
    
    const [measurementUnit, setMeasurementUnit] = useState<'cm' | 'in'>('cm');
    const [footLength, setFootLength] = useState<string>('');
    const [recommendedSize, setRecommendedSize] = useState<number | null>(null);

    const calculateSize = () => {
        const length = parseFloat(footLength);
        if (isNaN(length)) return;
        
        const lengthInCm = measurementUnit === 'in' ? length * 2.54 : length;
        
        // Find the closest size (add 0.5-1cm for comfort)
        const adjustedLength = lengthInCm + 0.5;
        const closest = sizeChart.reduce((prev, curr) => {
            return Math.abs(curr.cm - adjustedLength) < Math.abs(prev.cm - adjustedLength) ? curr : prev;
        });
        
        setRecommendedSize(closest.eu);
    };

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Header */}
            <section className="bg-charcoal-900 py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4">
                        {isEN ? 'Perfect Fit' : 'Төгс тохиргоо'}
                    </span>
                    <h1 className="font-serif text-3xl lg:text-4xl text-cream font-medium">
                        {isEN ? 'Size Guide' : 'Хэмжээний Заавар'}
                    </h1>
                    <p className="text-cream/70 text-base mt-4 max-w-2xl mx-auto">
                        {isEN 
                            ? 'A proper fit is the foundation of comfort. Let us guide you to your perfect size.'
                            : 'Зөв тохиргоо бол тав тухын үндэс. Бид танд төгс хэмжээгээ олоход туслая.'}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    
                    {/* How to Measure */}
                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-8 flex items-center gap-3">
                            <Ruler className="w-6 h-6 text-cognac" />
                            {isEN ? 'How to Measure Your Foot' : 'Хөлийн хэмжээг хэрхэн хэмжих'}
                        </h2>
                        
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                {[
                                    {
                                        step: 1,
                                        en: 'Place a piece of paper against a wall on a hard floor.',
                                        mn: 'Цаасыг хатуу шалан дээр хананд тулган тавина.'
                                    },
                                    {
                                        step: 2,
                                        en: 'Stand on the paper with your heel touching the wall. Wear the socks you plan to wear with your boots.',
                                        mn: 'Өсгийгөө хананд тулган цаасан дээр зогсоно. Гутлаа өмсөхдөө өмсөх оймсоо өмсөнө.'
                                    },
                                    {
                                        step: 3,
                                        en: 'Mark the longest point of your foot (usually the big toe or second toe).',
                                        mn: 'Хөлийнхөө хамгийн урт цэгийг тэмдэглэнэ (ихэвчлэн эрхий хуруу эсвэл хоёр дахь хуруу).'
                                    },
                                    {
                                        step: 4,
                                        en: 'Measure the distance from the wall to the mark. This is your foot length.',
                                        mn: 'Ханаас тэмдэг хүртэлх зайг хэмжинэ. Энэ бол таны хөлийн урт юм.'
                                    },
                                    {
                                        step: 5,
                                        en: 'Measure both feet—most people have slightly different sized feet. Use the larger measurement.',
                                        mn: 'Хоёр хөлөө хэмжинэ—ихэнх хүмүүсийн хөл бага зэрэг өөр хэмжээтэй байдаг. Илүү том хэмжээг ашиглана.'
                                    }
                                ].map((item) => (
                                    <div key={item.step} className="flex gap-4">
                                        <div className="w-8 h-8 bg-cognac text-cream-50 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                                            {item.step}
                                        </div>
                                        <p className="text-stone-warm leading-relaxed">
                                            {isEN ? item.en : item.mn}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Size Calculator */}
                            <div className="bg-cream-sand p-8 border border-cream-200">
                                <h3 className="font-serif text-xl text-charcoal-900 mb-6 flex items-center gap-2">
                                    <Footprints className="w-5 h-5 text-cognac" />
                                    {isEN ? 'Size Calculator' : 'Хэмжээ тооцоолуур'}
                                </h3>
                                
                                {/* Unit Toggle */}
                                <div className="flex gap-2 mb-6">
                                    <button
                                        onClick={() => setMeasurementUnit('cm')}
                                        className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                                            measurementUnit === 'cm' 
                                                ? 'bg-charcoal-900 text-cream-50' 
                                                : 'bg-cream text-stone-warm hover:bg-cream-200'
                                        }`}
                                    >
                                        CM
                                    </button>
                                    <button
                                        onClick={() => setMeasurementUnit('in')}
                                        className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                                            measurementUnit === 'in' 
                                                ? 'bg-charcoal-900 text-cream-50' 
                                                : 'bg-cream text-stone-warm hover:bg-cream-200'
                                        }`}
                                    >
                                        IN
                                    </button>
                                </div>
                                
                                <div className="mb-6">
                                    <label className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                        {isEN ? 'Your foot length' : 'Таны хөлийн урт'}
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={footLength}
                                        onChange={(e) => setFootLength(e.target.value)}
                                        placeholder={measurementUnit === 'cm' ? '25.5' : '10.0'}
                                        className="w-full border border-cream-200 bg-cream-50 py-3 px-4 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                                    />
                                </div>
                                
                                <button
                                    onClick={calculateSize}
                                    className="w-full bg-charcoal-900 text-cream-50 py-3 px-6 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    {isEN ? 'Find My Size' : 'Хэмжээгээ олох'}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                
                                {recommendedSize && (
                                    <div className="mt-6 p-4 bg-cream border border-gold/30">
                                        <p className="text-stone-warm text-sm mb-1">
                                            {isEN ? 'Your recommended size:' : 'Таны зөвлөсөн хэмжээ:'}
                                        </p>
                                        <p className="font-serif text-3xl text-charcoal-900">
                                            EU {recommendedSize}
                                        </p>
                                        <p className="text-xs text-stone-warm mt-2">
                                            {isEN 
                                                ? 'For the best fit, we recommend ordering this size. If between sizes, size up.'
                                                : 'Хамгийн сайн тохиргоонд энэ хэмжээг захиалахыг зөвлөж байна. Хоёр хэмжээний хооронд байвал том хэмжээг сонгоно.'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Size Chart */}
                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-8">
                            {isEN ? 'Size Conversion Chart' : 'Хэмжээ хөрвүүлэх хүснэгт'}
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse min-w-[500px]">
                                <thead>
                                    <tr className="border-b-2 border-charcoal-900">
                                        <th className="text-left py-4 pr-6 font-medium text-charcoal-900">EU</th>
                                        <th className="text-left py-4 pr-6 font-medium text-charcoal-900">US</th>
                                        <th className="text-left py-4 pr-6 font-medium text-charcoal-900">UK</th>
                                        <th className="text-left py-4 font-medium text-charcoal-900">CM</th>
                                    </tr>
                                </thead>
                                <tbody className="text-stone-warm">
                                    {sizeChart.map((size) => (
                                        <tr key={size.eu} className="border-b border-cream-200">
                                            <td className="py-3 pr-6 font-medium text-charcoal-900">{size.eu}</td>
                                            <td className="py-3 pr-6">{size.us}</td>
                                            <td className="py-3 pr-6">{size.uk}</td>
                                            <td className="py-3">{size.cm}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Fit Tips */}
                    <div className="bg-cream-sand p-8 lg:p-12 border-l-2 border-gold/30">
                        <div className="flex items-start gap-4">
                            <Info className="w-6 h-6 text-cognac flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-serif text-xl text-charcoal-900 mb-4">
                                    {isEN ? 'Fit Tips from Our Master Craftsman' : 'Мастер урчнаас тохиргооны зөвлөгөө'}
                                </h3>
                                <ul className="space-y-3 text-stone-warm">
                                    <li className="flex gap-2">
                                        <span className="text-cognac">•</span>
                                        {isEN 
                                            ? 'Our boots are made from natural leather that will mold to your foot over time. A snug fit initially is ideal.'
                                            : 'Манай гутал нь байгалийн арьсаар хийгдсэн бөгөөд цаг хугацааны явцад хөлдөө тохирно. Анх бага зэрэг нягт тохиргоо тохиромжтой.'}
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cognac">•</span>
                                        {isEN 
                                            ? 'If you have wide feet, consider sizing up or contacting us for bespoke options.'
                                            : 'Хэрэв та өргөн хөлтэй бол том хэмжээ сонгох эсвэл тусгай захиалгын талаар бидэнтэй холбогдоно уу.'}
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cognac">•</span>
                                        {isEN 
                                            ? 'Measure your feet at the end of the day when they are at their largest.'
                                            : 'Хөлийнхөө хэмжээг хамгийн том байх үед буюу өдрийн төгсгөлд хэмжинэ.'}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-16 pt-16 border-t border-cream-200 text-center">
                        <h3 className="font-serif text-xl text-charcoal-900 mb-4">
                            {isEN ? 'Still unsure about sizing?' : 'Хэмжээний талаар эргэлзэж байна уу?'}
                        </h3>
                        <p className="text-stone-warm mb-6">
                            {isEN 
                                ? 'Our fitting specialists are happy to help you find your perfect size.'
                                : 'Манай тохиргооны мэргэжилтнүүд танд төгс хэмжээгээ олоход туслахад баяртай байна.'}
                        </p>
                        <Link 
                            href={`/${locale}/contact?inquiry=sizing`}
                            className="inline-flex items-center gap-2 bg-charcoal-900 text-cream-50 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
                        >
                            {isEN ? 'Contact Fitting Specialist' : 'Тохиргооны мэргэжилтэнтэй холбогдох'}
                        </Link>
                    </div>

                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t border-cream-200">
                        <Link 
                            href={`/${locale}/shop`}
                            className="text-cognac hover:text-cognac/80 transition-colors text-sm uppercase tracking-wider"
                        >
                            ← {isEN ? 'Back to Shop' : 'Дэлгүүр рүү буцах'}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
