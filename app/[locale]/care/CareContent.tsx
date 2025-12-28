'use client';

import { Droplets, Wind, Moon, RefreshCw, Heart, Shield } from 'lucide-react';

interface CareContentProps {
    locale: string;
}

export default function CareContent({ locale }: CareContentProps) {
    const isEN = locale === 'en';

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero */}
            <section className="bg-charcoal-900 py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,169,97,0.4)_0%,_transparent_50%)]" />
                </div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-6">
                        {isEN ? 'The Care Ritual' : 'Арчилгааны Дэг'}
                    </span>
                    <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream font-medium tracking-tight mb-6">
                        {isEN ? 'Living Leather, Living Care' : 'Амьд Арьс, Амьд Харилцаа'}
                    </h1>
                    <p className="text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">
                        {isEN 
                            ? 'Your boots will darken with wear. This is not damage—it is biography. The patina that develops is uniquely yours, a map of everywhere you have walked.'
                            : 'Өмсөх тусам өнгө нь гүнзгийрнэ. Энэ бол хуучирч байгаа хэрэг биш—түүх бичигдэж буй хэрэг. Үүссэн өнгө (патина) нь зөвхөн таных, таны туулсан зам мөрийн гэрч юм.'
                        }
                    </p>
                </div>
            </section>

            {/* Care Philosophy */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <blockquote className="border-l-2 border-gold/30 pl-6 mb-12">
                        <p className="font-serif text-2xl text-charcoal-900 italic">
                            {isEN 
                                ? '"We cure leather by seasons, not hours. Care for it the same way."'
                                : '"Бид арьсаа цагаар бус, улирлаар хэмжиж идээлдэг. Түүнийг ч мөн адил цаг гарган хайрлаарай."'
                            }
                        </p>
                    </blockquote>
                    
                    <p className="text-stone-warm text-lg leading-relaxed mb-8">
                        {isEN
                            ? 'The leather in your Domog boots was vegetable-tanned over weeks, not hours. It was shaped by hand, not machine. It deserves care that honors this investment. What follows is not a chore—it is a ritual that extends the conversation between you and your boots.'
                            : 'Домог гутлын арьс долоо хоногоор биш, сар жилээр идээшсэн. Машинаар бус, махир модон дээр гараар хэлбэржсэн. Ийм бүтээл хүндэтгэл шаардана. Энэ бол ажил биш—энэ бол та гутал хоёрын хоорондох чимээгүй яриа юм.'
                        }
                    </p>
                </div>
            </section>

            {/* Daily Care */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-gold" />
                        </div>
                        <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 font-medium">
                            {isEN ? 'Daily Ritual' : 'Өдөр Тутмын Дэг'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                        <p>
                            {isEN 
                                ? 'After wearing, let your boots rest. Insert cedar shoe trees to absorb moisture and hold shape. This simple act extends life by years.'
                                : 'Өмсөсний дараа гутлаа амраа. Чийг шингээх, хэлбэр хадгалахын тулд хушын модон хэлбэрлэгч хий. Энэ энгийн үйлдэл жилээр насыг нь уртасгана.'
                            }
                        </p>
                        <p>
                            {isEN
                                ? 'Brush gently with a horsehair brush to remove dust. Always brush in one direction. The leather responds to consistency—it remembers how you treat it.'
                                : 'Тоосыг морины үсэн соёгоор зөөлөн арчиж цэвэрлэ. Нэг чиглэлд арч. Арьс тогтмол арчилгааг санадаг—та түүнд хэрхэн хандсаныг л санадаг.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Monthly Care */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <Moon className="w-5 h-5 text-gold" />
                        </div>
                        <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 font-medium">
                            {isEN ? 'Monthly Conditioning' : 'Сар Бүрийн Тосолгоо'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                        <p>
                            {isEN 
                                ? 'Apply conditioner sparingly—less is always more. Use circular motions with a soft cloth. Focus on stress points: the toe box, heel, and flex areas.'
                                : 'Тослогч бодисыг хэмнэлттэй түр—бага нь илүү. Зөөлөн даавуугаар дугуй хөдөлгөөнөөр шингээ. Ширүүлдэг хэсгүүдэд анхаар: хуруу, өсгий, нугалах хэсгүүд.'
                            }
                        </p>
                        <p>
                            {isEN
                                ? 'We recommend natural products: beeswax, lanolin, or neatsfoot oil. Avoid silicone-based products—they suffocate the leather.'
                                : 'Бид байгалийн гаралтай бүтээгдэхүүн санал болгоно: зөгийн лав, ланолин, эсвэл үхрийн тос. Силикон бүтээгдэхүүн хэрэглэхгүй—арьсыг "амьсгалуулахгүй".'
                            }
                        </p>
                    </div>
                    
                    {/* Product Recommendations */}
                    <div className="mt-10 bg-cream-sand rounded-lg p-6">
                        <h3 className="font-medium text-charcoal-900 mb-4 flex items-center gap-2">
                            <Heart className="w-4 h-4 text-gold" />
                            {isEN ? 'Recommended Products' : 'Санал Болгох Бүтээгдэхүүн'}
                        </h3>
                        <ul className="space-y-2 text-stone-warm">
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                <span>{isEN ? 'Saphir Médaille d\'Or Renovateur' : 'Saphir Médaille d\'Or Renovateur'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                <span>{isEN ? 'Venetian Leather Balm' : 'Venetian Leather Balm'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                <span>{isEN ? 'Pure neatsfoot oil (for conditioning)' : 'Цэвэр үхрийн тос (тосолгоонд)'}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Seasonal Care */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <RefreshCw className="w-5 h-5 text-gold" />
                        </div>
                        <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 font-medium">
                            {isEN ? 'Seasonal Storage' : 'Улирлын Хадгалалт'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                        <p>
                            {isEN 
                                ? 'Before storing, clean thoroughly and apply a light coat of conditioner. Insert shoe trees and place in breathable cloth bags—never plastic.'
                                : 'Хадгалахаас өмнө сайтар цэвэрлэж, нимгэн тос түрхэ. Модон хэлбэрлэгч хийж, агааржуулдаг даавуун уутанд хий—хуванцар хэзээ ч бүү хэрэглэ.'
                            }
                        </p>
                        <p>
                            {isEN
                                ? 'Store in a cool, dry place away from direct sunlight. Check monthly even during storage—leather is alive, it still needs attention.'
                                : 'Сэрүүн, хуурай, нарнаас хол газар хадгал. Хадгалах үед ч сар болгон шалга—арьс амьд, анхаарал хэрэгтэй.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Water & Weather */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <Wind className="w-5 h-5 text-gold" />
                        </div>
                        <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 font-medium">
                            {isEN ? 'Water & Weather' : 'Ус & Цаг Агаар'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                        <p>
                            {isEN 
                                ? 'Your boots are vegetable-tanned—they have natural water resistance but are not waterproof. Light rain is fine; standing water is not.'
                                : 'Таны гутал ургамлаар идээшсэн—усанд тэсвэртэй боловч ус нэвтэрдэггүй биш. Бага бороонд болно; хотгор усанд болохгүй.'
                            }
                        </p>
                        <p>
                            {isEN
                                ? 'If wet: Let dry naturally, away from heat. Stuff with newspaper to absorb moisture. Never use a hair dryer or heater—forced heat cracks leather.'
                                : 'Норвол: Халуунаас хол, аяндаа хатаа. Чийг шингээхийн тулд сонин хий. Үсний хатаагч, халаагч бүү хэрэглэ—хүчтэй халуун арьсыг хагалдаг.'
                            }
                        </p>
                    </div>
                    
                    {/* Warning Box */}
                    <div className="mt-10 bg-cognac/10 border border-cognac/20 rounded-lg p-6">
                        <h3 className="font-medium text-cognac mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            {isEN ? 'Important' : 'Анхааруулга'}
                        </h3>
                        <p className="text-stone-warm text-sm">
                            {isEN 
                                ? 'Salt stains from winter roads should be addressed immediately. Wipe with a damp cloth (distilled water) and let dry completely before conditioning.'
                                : 'Өвлийн замын давсны толбыг тэр дороо арилга. Цэвэршүүлсэн усаар норгосон даавуугаар арч, тослохоосоо өмнө бүрэн хатаа.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Heritage Note */}
            <section className="py-16 lg:py-24 bg-charcoal-900 text-cream-50">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <blockquote className="border-l-2 border-gold/50 pl-6">
                        <p className="font-serif text-xl lg:text-2xl italic mb-4">
                            {isEN 
                                ? '"We spent 35 years learning what hides can become. Give yourself time to learn your own boots."'
                                : '"Бид 35 жил арьс юу болж чадахыг сурсан. Өөрийнхөө гутлыг мэдэж авахад цаг өг."'
                            }
                        </p>
                        <footer className="text-gold/70 text-sm tracking-wide">
                            — {isEN ? 'Domog Workshop' : 'Домогийн урлан'}
                        </footer>
                    </blockquote>
                </div>
            </section>

            {/* Closing */}
            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <blockquote className="font-serif text-2xl lg:text-3xl text-charcoal-900 italic mb-6">
                        {isEN
                            ? '"A machine can measure a boot. Only hands can know it."'
                            : '"Машин гутлыг хэмжиж чадна. Харин зөвхөн гар л түүнийг мэдэрнэ."'
                        }
                    </blockquote>
                    <p className="text-stone-warm">
                        {isEN
                            ? 'The same is true of care. Your hands will learn what your boots need.'
                            : 'Арчилгаа ч мөн адил. Таны гар гуталд тань юу хэрэгтэйг мэдэрдэг болно.'
                        }
                    </p>
                </div>
            </section>
        </div>
    );
}
