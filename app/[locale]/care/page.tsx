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
                        <p className="font-serif text-2xl text-black italic">
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
                        <Wind className="h-6 w-6 text-cognac" />
                        <h2 className="font-serif text-2xl text-black">
                            {isEN ? 'The Daily Ritual' : 'Өдөр Тутмын Дэг'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p>
                            <strong className="text-black">{isEN ? 'Brush after wearing.' : 'Тоосыг нь үргээх.'}</strong>{' '}
                            {isEN
                                ? 'A horsehair brush removes surface dust before it can work its way into the leather. Twenty seconds of attention prevents hours of restoration later.'
                                : 'Адууны үсэн сойз нь тоосыг арьсанд шингэхээс хамгаална. Хорин секундын арчилгаа хожмын олон цагийн засвараас илүү үнэ цэнэтэй.'
                            }
                        </p>
                        <p>
                            <strong className="text-black">{isEN ? 'Let them rest.' : 'Амраах.'}</strong>{' '}
                            {isEN
                                ? 'Leather needs time to release moisture absorbed from your feet. Never wear the same pair two days running. This is not superstition—it is leather science.'
                                : 'Арьс амьсгалж, чийгээ гадагшлуулахад хугацаа хэрэгтэй. Нэг гутлыг хоёр өдөр дараалан бүү өмс. Энэ бол мухар сүсэг биш—арьс арчилгааны хууль.'
                            }
                        </p>
                        <p>
                            <strong className="text-black">{isEN ? 'Use shoe trees.' : 'Хэвэнд нь хадгалах.'}</strong>{' '}
                            {isEN
                                ? 'Cedar shoe trees absorb moisture and maintain shape. Insert them while the leather is still warm from wear—this is when it is most receptive to being reminded of its form.'
                                : 'Хуш модон хэв чийгийг өөртөө шингээж, хэлбэрийг нь хадгална. Гутлаа тайлмагц, арьс нь бүлээн байхад хэвийг нь хийгээрэй—энэ үед арьс хэлбэрээ хамгийн сайн санадаг.'
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
                            {isEN ? 'The Monthly Nourishment' : 'Сар Бүрийн Арчилгаа'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p>
                            {isEN
                                ? 'Once a month—or when the leather looks thirsty—your boots deserve deep conditioning. Use a quality leather conditioner or saddle soap. Apply sparingly with a soft cloth, working in circular motions. Less is more; leather cannot drink what it does not need.'
                                : 'Сард нэг удаа—эсвэл арьс хуурайшсан үед—таны гуталд гүн тэжээл хэрэгтэй. Чанартай тос эсвэл эмээлийн саван хэрэглэ. Зөөлөн алчуураар бага багаар, тойргоор түрх. Бага нь их; арьс хэрэггүй зүйлээ шингээж чадахгүй.'
                            }
                        </p>
                        <p>
                            <strong className="text-black">{isEN ? 'The patina will deepen.' : 'Өнгө нь гүнзгийрнэ.'}</strong>{' '}
                            {isEN
                                ? 'Each conditioning session develops the leather\'s character. The color grows richer, the texture more supple. This is not maintenance—it is cultivation.'
                                : 'Тэжээл өгөх бүрт арьсны чанар сайжирна. Өнгө нь баяжиж, бүтэц нь зөөлөрнө. Энэ бол засвар биш—энэ бол тордолт.'
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
                            {isEN ? 'The Rest Between Seasons' : 'Улирал Солих Амралт'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p>
                            {isEN
                                ? 'When your boots rest for a season, they deserve proper hibernation:'
                                : 'Гутал тань нэг улирал амрахдаа зөв хадгалалт шаардана:'
                            }
                        </p>
                        <ul className="space-y-4 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'Clean thoroughly and condition before storage'
                                        : 'Хадгалахаас өмнө сайтар цэвэрлэж, тослох'
                                    }
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'Insert shoe trees to maintain shape'
                                        : 'Хэлбэрийг нь хадгалахын тулд модон хэв хийх'
                                    }
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'Store in dust bags—never plastic, which traps moisture'
                                        : 'Даавуун уутанд хадгалах—гялгар уут чийг татдаг тул хэзээ ч бүү хэрэглэ'
                                    }
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'Keep away from direct sunlight and heat sources'
                                        : 'Нарны шууд тусгал, халуун эх үүсвэрээс хол байлгах'
                                    }
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">•</span>
                                <span>
                                    {isEN
                                        ? 'A cool, dark place with moderate humidity is ideal'
                                        : 'Сэрүүн, харанхуй, хуурай газар тохиромжтой'
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
                            {isEN ? 'The Resoling Promise' : 'Ул Солих Баталгаа'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p>
                            {isEN
                                ? 'Our boots are constructed to be resoled. This is not an afterthought—it is fundamental to how we build. The uppers, properly cared for, will outlast multiple soles.'
                                : 'Манай гутал нь улыг нь сольж болохоор бүтээгдсэн. Энэ бол бидний хийцийн үндсэн зарчим. Дээд хэсгийг нь зөв арчилбал олон улыг элээх насжилттай.'
                            }
                        </p>
                        <p>
                            {isEN
                                ? 'When your soles show wear—after years of loyal service—bring them home. We will resole them with the same care we gave their first creation. The relationship continues.'
                                : 'Олон жилийн эдэлгээний дараа ул нь элэгдэх үед бидэнд авчирч өгөөрэй. Бид анх урласан шигээ сэтгэл гарган улыг нь сольж өгнө. Та бидний харилцаа үргэлжилсээр байх болно.'
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
                            {isEN ? 'Our Lifetime Commitment' : 'Насан Туршийн Баталгаа'}
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-stone-warm leading-relaxed">
                        <p className="text-lg">
                            {isEN
                                ? 'We build boots to outlast trends, seasons, and decades. If our craftsmanship fails, we make it right.'
                                : 'Бид цаг хугацаа, улирал, он жилүүдийг даван туулах гутал бүтээдэг. Хэрэв бидний хийцээс шалтгаалан асуудал гарвал бид хариуцна.'
                            }
                        </p>
                        
                        <div className="bg-white border border-cream-200 p-8 mt-8">
                            <h3 className="font-serif text-xl text-black mb-4">
                                {isEN ? 'What This Means' : 'Энэ юу гэсэн үг вэ?'}
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Heart className="h-5 w-5 text-cognac flex-shrink-0 mt-0.5" />
                                    <span>
                                        {isEN
                                            ? 'If a seam fails due to craftsmanship, we repair it—no questions, no cost, no time limit.'
                                            : 'Хэрэв оёдол задарвал бид үнэ төлбөргүй, хугацаа харгалзахгүйгээр засаж өгнө.'
                                        }
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Heart className="h-5 w-5 text-cognac flex-shrink-0 mt-0.5" />
                                    <span>
                                        {isEN
                                            ? 'If hardware breaks under normal use, we replace it.'
                                            : 'Хэрэв тоноглол хэвийн хэрэглээний явцад эвдэрвэл бид сольж өгнө.'
                                        }
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Heart className="h-5 w-5 text-cognac flex-shrink-0 mt-0.5" />
                                    <span>
                                        {isEN
                                            ? 'If the leather needs reconditioning after years of wear, bring it home.'
                                            : 'Олон жил өмссөний дараа арьсыг сэргээх шаардлагатай бол бидэнд хандаарай.'
                                        }
                                    </span>
                                </li>
                            </ul>
                        </div>
                        
                        <p className="italic">
                            {isEN
                                ? 'This is not customer service. This is craftsmanship. We remember every pair we\'ve made. We honor every foot we\'ve served.'
                                : 'Энэ бол зүгээр нэг үйлчилгээ биш. Энэ бол урлал. Бид урласан хос бүрээ санадаг. Бидний бүтээлийг өмссөн хүн бүрийг хүндэтгэдэг.'
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
