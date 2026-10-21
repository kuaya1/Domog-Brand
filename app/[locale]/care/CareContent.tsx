import Link from 'next/link';
import { Droplets, Wind, Moon, RefreshCw, Heart, Shield } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';

/**
 * Care guidance, both languages side by side for review. The instructions are
 * unchanged from the previous page. Removed: unverified claims about how the
 * leather is tanned and shaped, the "35 years" line, and the unattributed
 * quotations. The previous Mongolian intro also contradicted the English one.
 */
const content = {
    en: {
        eyebrow: 'Care guide',
        title: 'Looking after your boots',
        intro: 'Leather darkens and changes with wear. These steps help keep your boots clean, supple, and in shape.',
        dailyTitle: 'After each wear',
        daily: [
            'After wearing, let your boots rest. Insert cedar shoe trees to absorb moisture and hold their shape.',
            'Brush gently with a horsehair brush to remove dust, always in one direction.',
        ],
        monthlyTitle: 'Monthly conditioning',
        monthly: [
            'Apply conditioner sparingly with a soft cloth, using circular motions. Focus on the toe, heel, and flex areas.',
            'We recommend natural products such as beeswax, lanolin, or neatsfoot oil. Avoid silicone-based products, which stop the leather from breathing.',
        ],
        productsTitle: 'Recommended products',
        products: ["Saphir Médaille d'Or Renovateur", 'Venetian Leather Balm', 'Pure neatsfoot oil (for conditioning)'],
        storageTitle: 'Seasonal storage',
        storage: [
            'Before storing, clean the boots thoroughly and apply a light coat of conditioner. Insert shoe trees and keep them in breathable cloth bags, never plastic.',
            'Store in a cool, dry place away from direct sunlight, and check them once a month.',
        ],
        waterTitle: 'Water and weather',
        water: [
            'Leather boots are not waterproof. Light rain is fine; avoid standing water.',
            'If your boots get wet, let them dry naturally, away from heat, with newspaper inside to absorb moisture. Never use a hair dryer or heater: direct heat cracks leather.',
        ],
        importantTitle: 'Important',
        important: 'Remove salt stains from winter roads straight away. Wipe with a cloth dampened with distilled water and let the boots dry completely before conditioning.',
        questionsTitle: 'Questions about your pair?',
        questionsBody: 'Contact us about care, or read what our warranty covers.',
        contact: 'Contact us',
        warranty: 'Warranty',
    },
    mn: {
        eyebrow: 'Арчилгааны заавар',
        title: 'Гутлын арчилгаа',
        intro: 'Арьс өмсөх тусам бараан өнгөтэй болж, өөрчлөгддөг. Дараах алхмууд гутлыг тань цэвэр, зөөлөн, хэлбэрээ хадгалсан байлгахад тусална.',
        dailyTitle: 'Өмсөх бүрийн дараа',
        daily: [
            'Өмсөсний дараа гутлаа амраагаарай. Чийгийг шингээж, хэлбэрийг нь хадгалахын тулд хушин модон хэвлэгч хийгээрэй.',
            'Тоосыг морины үсэн сойзоор зөөлөн, үргэлж нэг чиглэлд арчиж цэвэрлээрэй.',
        ],
        monthlyTitle: 'Сар бүрийн тосолгоо',
        monthly: [
            'Тосыг зөөлөн даавуугаар бага хэмжээгээр, дугуй хөдөлгөөнөөр түрхээрэй. Хошуу, өсгий, нугардаг хэсэгт анхаараарай.',
            'Зөгийн лав, ланолин, үхрийн шилбэний тос зэрэг байгалийн гаралтай бүтээгдэхүүнийг санал болгож байна. Арьсыг амьсгалуулахгүй болгодог силикон агуулсан бүтээгдэхүүнээс зайлсхийгээрэй.',
        ],
        productsTitle: 'Санал болгох бүтээгдэхүүн',
        products: ["Saphir Médaille d'Or Renovateur", 'Venetian Leather Balm', 'Цэвэр үхрийн шилбэний тос (тосолгоонд)'],
        storageTitle: 'Улирлын хадгалалт',
        storage: [
            'Хадгалахаасаа өмнө гутлаа сайтар цэвэрлэж, нимгэн тос түрхээрэй. Хэвлэгч хийгээд агаар нэвтэрдэг даавуун уутанд хийж хадгалаарай. Хуванцар уут хэрэглэж болохгүй.',
            'Сэрүүн, хуурай, нарны шууд тусгалаас хол газар хадгалж, сард нэг удаа шалгаж байгаарай.',
        ],
        waterTitle: 'Ус, цаг агаар',
        water: [
            'Арьсан гутал бүрэн усны хамгаалалттай биш. Бага зэргийн бороо асуудалгүй ч тогтсон уснаас зайлсхийгээрэй.',
            'Гутал норвол сонин чихээд, халуунаас хол газар аяндаа хатаагаарай. Үс хатаагч, халаагуур бүү хэрэглээрэй: шууд халуун арьсыг хагаргадаг.',
        ],
        importantTitle: 'Анхааруулга',
        important: 'Өвлийн замын давсны толбыг тэр дор нь арилгаарай. Нэрмэл усаар норгосон даавуугаар арчаад, тослохоосоо өмнө бүрэн хатаагаарай.',
        questionsTitle: 'Гутлынхаа талаар асуух зүйл байна уу?',
        questionsBody: 'Арчилгааны талаар бидэнтэй холбогдох эсвэл баталгаанд юу хамрагддагийг үзээрэй.',
        contact: 'Холбоо барих',
        warranty: 'Баталгаа',
    },
} satisfies Record<Locale, unknown>;

export default function CareContent({ locale }: { locale: Locale }) {
    const c = content[locale];
    const sections = [
        { icon: Droplets, title: c.dailyTitle, paragraphs: c.daily },
        { icon: Moon, title: c.monthlyTitle, paragraphs: c.monthly, products: true },
        { icon: RefreshCw, title: c.storageTitle, paragraphs: c.storage },
        { icon: Wind, title: c.waterTitle, paragraphs: c.water, important: true },
    ];

    return (
        <div className="min-h-screen bg-cream">
            <section className="bg-charcoal-900 pt-36 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,169,97,0.4)_0%,_transparent_50%)]" />
                </div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-6">{c.eyebrow}</span>
                    <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream font-medium tracking-tight mb-6">{c.title}</h1>
                    <p className="text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">{c.intro}</p>
                </div>
            </section>

            {sections.map(({ icon: Icon, title, paragraphs, products, important }) => (
                <section key={title} className="py-16 lg:py-20 border-b border-cream-200">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-gold-700" aria-hidden="true" />
                            </div>
                            <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 font-medium">{title}</h2>
                        </div>
                        <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                            {paragraphs.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>

                        {products && (
                            <div className="mt-10 bg-cream-sand rounded-lg p-6">
                                <h3 className="font-medium text-charcoal-900 mb-4 flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-gold-700" aria-hidden="true" />
                                    {c.productsTitle}
                                </h3>
                                <ul className="space-y-2 text-stone-warm">
                                    {c.products.map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <span className="text-gold-700" aria-hidden="true">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {important && (
                            <div className="mt-10 bg-cognac/10 border border-cognac/20 rounded-lg p-6">
                                <h3 className="font-medium text-cognac mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4" aria-hidden="true" />
                                    {c.importantTitle}
                                </h3>
                                <p className="text-stone-warm text-sm">{c.important}</p>
                            </div>
                        )}
                    </div>
                </section>
            ))}

            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 mb-4">{c.questionsTitle}</h2>
                    <p className="text-stone-warm mb-8">{c.questionsBody}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={`/${locale}/contact?inquiry=care`}
                            className="inline-flex items-center gap-2 bg-charcoal-900 text-cream-50 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
                        >
                            {c.contact}
                        </Link>
                        <Link
                            href={`/${locale}/warranty`}
                            className="inline-flex items-center gap-2 border border-charcoal-900 text-charcoal-900 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-900 hover:text-cream-50 transition-colors"
                        >
                            {c.warranty}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
