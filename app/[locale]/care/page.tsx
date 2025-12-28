'use client';

import { useParams } from 'next/navigation';
import { Droplets, Wind, Moon, RefreshCw, Heart, Shield } from 'lucide-react';
import { getNamespace } from '@/lib/i18n/translations';
import { isValidLocale } from '@/lib/i18n/config';

export default function CarePage() {
    const params = useParams();
    const locale = typeof params.locale === 'string' ? params.locale : 'en';
    const isEN = locale === 'en';

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero */}
            <section className="bg-black py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,169,97,0.4)_0%,_transparent_50%)]" />
                </div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-6">
                        {isEN ? 'The Care Ritual' : 'Арчилгааны Ёслол'}
                    </span>
                    <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream font-medium tracking-tight mb-6">
                        {isEN ? 'Living Leather, Living Care' : 'Амьд Арьс, Амьд Арчилгаа'}
                    </h1>
                    <p className="text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">
                        {isEN 
                            ? 'Your boots will darken with wear. This is not damage—it is biography. The patina that develops is uniquely yours, a map of everywhere you have walked.'
                            : 'Таны гутал өмсөх тусам бараанна. Энэ бол гэмтэл биш—түүх юм. Үүссэн патина нь зөвхөн таных, таны аялсан газар бүрийн газрын зураг.'
                        }
                    </p>
                </div>
            </section>

            {/* Care Philosophy */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <blockquote className="border-l-2 border-gold/30 pl-6 mb-12">
                        <p className="font-serif text-2xl text-black italic">
                            {isEN 
                                ? '"We cure leather by seasons, not hours. Care for it the same way."'
                                : '"Бид арьсаа цагаар бус, улирлаар хэмжиж идээлдэг. Түүнийг ч мөн адил арчилаарай."'
                            }
                        </p>
                    </blockquote>
                    
                    <p className="text-stone-warm text-lg leading-relaxed mb-8">
                        {isEN
                            ? 'The leather in your Domog boots was vegetable-tanned over weeks, not hours. It was shaped by hand, not machine. It deserves care that honors this investment. What follows is not a chore—it is a ritual that extends the conversation between you and your boots.'
                            : 'Таны Домог гутлын арьсыг долоо хоногоор идээлсэн, цагаар биш. Машинаар бус, гараар хэлбэржүүлсэн. Энэ хөрөнгө оруулалтыг хүндэтгэсэн арчилгаа шаардлагатай. Дараах зүйлс бол ажил биш—таныг гутлын хоорондын харилцааг үргэлжлүүлэх ёслол юм.'
                        }
                    </p>
                </div>
            </section>

            {/* Daily Care */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Wind className="h-6 w-6 text-cognac" />
                        <h2 className="font-serif text-2xl text-black">
                            {isEN ? 'The Daily Ritual' : 'Өдөр Тутмын Ёслол'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p>
                            <strong className="text-black">{isEN ? 'Brush after wearing.' : 'Өмссөний дараа сойзлох.'}</strong>{' '}
                            {isEN
                                ? 'A horsehair brush removes surface dust before it can work its way into the leather. Twenty seconds of attention prevents hours of restoration later.'
                                : 'Адууны үсэн сойз гадаргуун тоосыг арьсанд шингэхээс өмнө арилгана. Хорин секундын анхаарал дараа нь цагийн сэргээн засварлалтаас сэргийлнэ.'
                            }
                        </p>
                        <p>
                            <strong className="text-black">{isEN ? 'Let them rest.' : 'Амраа.'}</strong>{' '}
                            {isEN
                                ? 'Leather needs time to release moisture absorbed from your feet. Never wear the same pair two days running. This is not superstition—it is leather science.'
                                : 'Арьс хөлөөс шингээсэн чийгээ гаргахад цаг хугацаа хэрэгтэй. Хоёр өдөр дараалан нэг хосыг бүү өмс. Энэ бол суртахуун биш—арьсны шинжлэх ухаан.'
                            }
                        </p>
                        <p>
                            <strong className="text-black">{isEN ? 'Use shoe trees.' : 'Гутлын хэвийг хэрэглэ.'}</strong>{' '}
                            {isEN
                                ? 'Cedar shoe trees absorb moisture and maintain shape. Insert them while the leather is still warm from wear—this is when it is most receptive to being reminded of its form.'
                                : 'Хуш модон гутлын хэв чийгийг шингээж, хэлбэрийг хадгална. Өмссөний дараа арьс дулаан байхад хийгээрэй—энэ үед хэлбэрээ санахад хамгийн бэлэн байдаг.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Deep Conditioning */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Droplets className="h-6 w-6 text-cognac" />
                        <h2 className="font-serif text-2xl text-black">
                            {isEN ? 'The Monthly Nourishment' : 'Сар Бүрийн Тэжээл'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p>
                            {isEN
                                ? 'Once a month—or when the leather looks thirsty—your boots deserve deep conditioning. Use a quality leather conditioner or saddle soap. Apply sparingly with a soft cloth, working in circular motions. Less is more; leather cannot drink what it does not need.'
                                : 'Сард нэг удаа—эсвэл арьс цангаж харагдах үед—таны гутал гүн тэжээллэг шаардлагатай. Чанартай арьсны тэжээлэгч эсвэл эмээлийн саван хэрэглэ. Зөөлөн алчуураар бага багаар, тойргоор түрхэ. Бага нь их; арьс хэрэггүй зүйлээ ууж чадахгүй.'
                            }
                        </p>
                        <p>
                            <strong className="text-black">{isEN ? 'The patina will deepen.' : 'Патина гүнзгийрнэ.'}</strong>{' '}
                            {isEN
                                ? 'Each conditioning session develops the leather\'s character. The color grows richer, the texture more supple. This is not maintenance—it is cultivation.'
                                : 'Тэжээлэг болгон арьсны шинж чанарыг хөгжүүлнэ. Өнгө нь баяжиж, бүтэц нь зөөлөрнө. Энэ бол засвар үйлчилгээ биш—хөгжүүлэлт.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Storage */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Moon className="h-6 w-6 text-cognac" />
                        <h2 className="font-serif text-2xl text-black">
                            {isEN ? 'The Rest Between Seasons' : 'Улирал Хоорондын Амралт'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p>
                            {isEN
                                ? 'When your boots rest for a season, they deserve proper hibernation:'
                                : 'Таны гутал нэг улирал амрахад зөв өвөлжилт шаардлагатай:'
                            }
                        </p>
                        <ul className="space-y-4 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'Clean thoroughly and condition before storage'
                                        : 'Хадгалахаас өмнө сайтар цэвэрлэж тэжээ'
                                    }
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'Insert shoe trees to maintain shape'
                                        : 'Хэлбэрээ хадгалахын тулд гутлын хэвийг хий'
                                    }
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'Store in dust bags—never plastic, which traps moisture'
                                        : 'Тоосны уутанд хадгал—хэзээ ч чийг барьдаг гялгаруутанд биш'
                                    }
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'Keep away from direct sunlight and heat sources'
                                        : 'Шууд нарны гэрэл болон халуун эх үүсвэрээс хол байлга'
                                    }
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'A cool, dark place with moderate humidity is ideal'
                                        : 'Сэрүүн, харанхуй, дунд зэргийн чийгтэй газар тохиромжтой'
                                    }
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Resoling Promise */}
            <section className="py-16 lg:py-24 border-b border-cream-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <RefreshCw className="h-6 w-6 text-cognac" />
                        <h2 className="font-serif text-2xl text-black">
                            {isEN ? 'The Resoling Promise' : 'Ул Солих Амлалт'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p>
                            {isEN
                                ? 'Our boots are constructed to be resoled. This is not an afterthought—it is fundamental to how we build. The uppers, properly cared for, will outlast multiple soles.'
                                : 'Манай гутлыг улаа сольж болохоор бүтээсэн. Энэ бол дараа бодогдсон зүйл биш—бид хэрхэн барьдаг тулгуур зарчим юм. Дээд хэсэг нь зөв арчлагдвал олон улыг давж үлдэнэ.'
                            }
                        </p>
                        <p>
                            {isEN
                                ? 'When your soles show wear—after years of loyal service—bring them home. We will resole them with the same care we gave their first creation. The relationship continues.'
                                : 'Таны ул элэгдсэн үед—олон жилийн үнэнч үйлчилгээний дараа—гэртээ авчир. Бид тэднийг анхны бүтээлийнх шигээ анхааралтай ул сольно. Харилцаа үргэлжилнэ.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Warranty */}
            <section className="py-16 lg:py-24 bg-cream-sand">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="h-6 w-6 text-cognac" />
                        <h2 className="font-serif text-2xl text-black">
                            {isEN ? 'Our Lifetime Commitment' : 'Манай Насан Туршийн Амлалт'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p className="text-lg">
                            {isEN
                                ? 'We build boots to outlast trends, seasons, and decades. If our craftsmanship fails, we make it right.'
                                : 'Бид гутлыг чиг хандлага, улирал, арван жилүүдийг давахаар бүтээдэг. Хэрэв бидний урлал бүтэлгүйтвэл бид засна.'
                            }
                        </p>
                        
                        <div className="bg-white border border-cream-200 p-8 mt-8">
                            <h3 className="font-serif text-xl text-black mb-4">
                                {isEN ? 'What This Means' : 'Энэ нь юу гэсэн үг вэ'}
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Heart className="h-5 w-5 text-cognac flex-shrink-0 mt-0.5" />
                                    <span>
                                        {isEN
                                            ? 'If a seam fails due to craftsmanship, we repair it—no questions, no cost, no time limit.'
                                            : 'Хэрэв оёдол урлалын шалтгаанаар тасарвал бид засна—асуултгүй, үнэгүй, хугацаагүй.'
                                        }
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Heart className="h-5 w-5 text-cognac flex-shrink-0 mt-0.5" />
                                    <span>
                                        {isEN
                                            ? 'If hardware breaks under normal use, we replace it.'
                                            : 'Хэрэв хатуу эд анги хэвийн хэрэглээнд эвдэрвэл бид солино.'
                                        }
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Heart className="h-5 w-5 text-cognac flex-shrink-0 mt-0.5" />
                                    <span>
                                        {isEN
                                            ? 'If the leather needs reconditioning after years of wear, bring it home.'
                                            : 'Хэрэв арьс олон жилийн өмсгөлийн дараа сэргээлт хэрэгтэй бол гэртээ авчир.'
                                        }
                                    </span>
                                </li>
                            </ul>
                        </div>
                        
                        <p className="italic">
                            {isEN
                                ? 'This is not customer service. This is craftsmanship. We remember every pair we\'ve made. We honor every foot we\'ve served.'
                                : 'Энэ бол үйлчлүүлэгчийн үйлчилгээ биш. Энэ бол урлал. Бид хийсэн хос бүрээ санадаг. Бид үйлчилсэн хөл бүрээ хүндэтгэдэг.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Closing */}
            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <blockquote className="font-serif text-2xl lg:text-3xl text-black italic mb-6">
                        {isEN
                            ? '"A machine can measure a boot. Only hands can know it."'
                            : '"Машин гутлыг хэмжиж чадна. Зөвхөн гар л түүнийг мэдэж чадна."'
                        }
                    </blockquote>
                    <p className="text-stone-warm">
                        {isEN
                            ? 'The same is true of care. Your hands will learn what your boots need.'
                            : 'Арчилгаанд ч мөн адил. Таны гар таны гутал юу хэрэгтэйг мэдэж сурна.'
                        }
                    </p>
                </div>
            </section>
        </div>
    );
}
