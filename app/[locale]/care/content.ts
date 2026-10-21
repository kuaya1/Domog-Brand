import { type Locale } from '@/lib/i18n/config';

/**
 * Care guidance, both languages side by side for review. The instructions are
 * unchanged from the previous page. Removed: unverified claims about how the
 * leather is tanned and shaped, the "35 years" line, and the unattributed
 * quotations. The previous Mongolian intro also contradicted the English one.
 */
export const careContent = {
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
