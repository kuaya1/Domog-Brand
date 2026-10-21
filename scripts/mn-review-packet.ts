/**
 * Writes docs/content/MN-REVIEW-PACKET.md: every Mongolian string on the site
 * that did not come verbatim from the v2 handoff, side by side with its
 * English, for Gemini and family review.
 *
 *   npm run review:mn
 *
 * Regenerate after changing messages/*.json, the care page text, or
 * product names, so the packet always matches what the site renders.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import en from '../messages/en.json';
import mn from '../messages/mn.json';
import { products } from '../lib/products';
import { careContent } from '../app/[locale]/care/content';

type Tree = { [key: string]: string | string[] | Tree };

/** Keys whose Mongolian is v2's own wording, used as written. Everything else is a draft. */
const FROM_V2 = new Set([
    'common.close', 'common.retry', 'common.error', 'common.skipToContent', 'common.home',
    'nav.collection', 'nav.story', 'nav.contact', 'nav.bag', 'nav.searchPlaceholder', 'nav.explore',
    'footer.descriptor', 'footer.collection', 'footer.allStyles', 'footer.help', 'footer.sizeGuide', 'footer.care',
    'footer.shipping', 'footer.warranty', 'footer.contact', 'footer.addressContact',
    'categories.riding', 'categories.festival', 'categories.luxury', 'categories.winter', 'categories.ceremonial',
    'categories.everyday',
    'search.placeholder', 'search.action', 'search.none', 'search.viewAll',
    'collection.title', 'collection.intro', 'collection.filter', 'collection.all', 'collection.price',
    'collection.sort', 'collection.newest', 'collection.priceAsc', 'collection.priceDesc',
    'product.view', 'product.new', 'product.breadcrumbCollection', 'product.fallbackDescription', 'product.sizeFit',
    'product.sizeGuide', 'product.chooseSize', 'product.sizeRequired', 'product.quantity', 'product.increase',
    'product.decrease', 'product.addBag', 'product.ask', 'product.related', 'product.previousImage',
    'product.nextImage', 'product.imageNumber',
    'fit.title', 'fit.intro', 'fit.tabChart', 'fit.chartTitle', 'fit.length', 'fit.calculate', 'fit.calculatorTitle',
    'fit.help', 'fit.steps.1', 'fit.steps.2', 'fit.steps.3', 'fit.steps.4', 'fit.steps.5',
    'bag.title', 'bag.drawerLabel', 'bag.empty', 'bag.emptyBody', 'bag.explore', 'bag.continue', 'bag.remove',
    'bag.subtotal', 'bag.shipping', 'bag.total',
    'contact.eyebrow', 'contact.title', 'contact.intro', 'contact.name', 'contact.email', 'contact.phone',
    'contact.optional', 'contact.subject', 'contact.message', 'contact.send', 'contact.sending', 'contact.successTitle',
    'home.heroEyebrow', 'home.heroTitle', 'home.heroBody', 'home.heroPrimary', 'home.heroSecondary',
    'home.collectionTitle', 'home.collectionBody', 'home.collectionAction', 'home.familyTitle', 'home.familyBody',
    'home.familyAction', 'home.chooseTitle', 'home.choose1Title', 'home.choose1Body', 'home.choose2Title',
    'home.choose2Body', 'home.choose3Title', 'home.choose3Body', 'home.careTitle', 'home.careBody', 'home.careAction',
    'home.contactTitle', 'home.contactBody', 'home.contactAction',
    'story.eyebrow', 'story.title', 'story.body', 'story.collectionTitle', 'story.collectionBody',
    'story.collectionAction', 'story.contactTitle', 'story.contactBody', 'story.contactAction', 'story.careTitle',
    'story.careAction', 'story.warrantyAction',
]);

/** Keys built from v2 wording but changed; reviewed separately with the reason. */
const ADAPTED_FROM_V2: Record<string, string> = {
    'categories.heritage': 'v2 gives "Өв уламжлал" (noun). Changed to the adjectival form so it matches the other style labels.',
    'contact.errorUnavailable': "v2's failure message asks the visitor to try again; retrying cannot work until email delivery is connected, so it points to email and phone instead.",
    'story.careBody': 'Combines v2\'s care sentence with a pointer to the warranty page.',
};

/** Where each group of strings appears. */
const CONTEXT: Record<string, string> = {
    meta: 'Browser tab titles and search-result descriptions.',
    common: 'Shared controls and screen-reader labels.',
    nav: 'Header and mobile menu. Labels ending in "Label" are read by screen readers.',
    footer: 'Site footer.',
    categories: 'Style labels on product cards, filters, the footer, and search.',
    search: 'Search dialog.',
    collection: 'Collection page (/shop).',
    product: 'Product page, its notifications, and image controls.',
    fit: 'Size guide: the product-page pop-up and /size-guide.',
    bag: 'Bag drawer and /cart. The orderMessage lines prefill the contact form when ordering from the bag.',
    offer: 'Pop-up notice for the WELCOME10 code.',
    contact: 'Contact page and form states.',
    home: 'Home page.',
    story: 'Our story (/about).',
    notFound: 'Page-not-found screen.',
};

/** Notes for strings where the context is not obvious from the English. */
const NOTES: Record<string, string> = {
    'meta.titleTemplate': '%s is replaced by the page title.',
    'nav.switchLanguage': 'Screen-reader label of the language button on Mongolian pages (it switches to English).',
    'nav.since': 'Small label next to the DOMOG logo.',
    'footer.rights': 'Legal name kept as "Домог Брэнд", matching the privacy policy and terms.',
    'search.priceUnder': '{price} is a USD amount such as $300.',
    'search.priceOver': '{price} is a USD amount such as $500.',
    'collection.priceUpTo': '{price} is the slider value, such as $550.',
    'fit.notOffered': 'Narrow table cell: this model does not come in that size.',
    'fit.unitIn': 'Abbreviation for inches.',
    'fit.chartNote': 'Under the size chart.',
    'bag.size': '{size} is an EU size such as 42.',
    'bag.orderMessageLine': 'Example: "- ТЭНГЭР, EU 42 × 1".',
    'bag.estimateNote': 'Under the totals. The site takes no online payment; orders are confirmed by contact.',
    'product.inquiryPrefix': 'Prefills the contact message from "Ask about this pair". Trailing space is intentional.',
    'product.imageAlt': 'Image description for screen readers.',
    'offer.body': '{code} is WELCOME10.',
};

/** Policy-page Mongolian changed in this pass (shipping, warranty, terms, privacy). */
const POLICY_EDITS: { page: string; english: string; before: string; after: string }[] = [
    { page: 'Warranty', english: 'Lifetime Craftsmanship Warranty', before: 'Насан Туршийн Урлалын Баталгаа', after: 'Насан туршийн хийцийн баталгаа' },
    { page: 'Warranty', english: 'Structural defects in craftsmanship', before: 'Урлалын бүтцийн алдаа', after: 'Хийцийн бүтцийн гэмтэл' },
    { page: 'Warranty', english: 'Stitching failures under normal use', before: 'Хэвийн хэрэглээнд оёдлын эвдрэл', after: 'Хэвийн хэрэглээнд гарсан оёдлын гэмтэл' },
    { page: 'Warranty', english: 'Sole separation from the upper', before: 'Ул-ын дээд хэсгээс салах', after: 'Ул гутлын дээд хэсгээс салах' },
    { page: 'Warranty', english: 'Hardware defects (buckles, eyelets)', before: 'Эд анги-ийн алдаа (тоолуур, нүд)', after: 'Төмөр эд ангийн гэмтэл (горхи, сүвний төмөр)' },
    { page: 'Warranty', english: 'Leather delamination or peeling', before: 'Арьс хуурах, хальсрах', after: 'Арьс давхаргаараа салах, хуурах' },
    { page: 'Warranty', english: 'Zipper malfunctions (where applicable)', before: 'Цахилгаан түгжээний алдаа (хамааралтай бол)', after: 'Цахилгаан товчны гэмтэл (байгаа бол)' },
    { page: 'Warranty', english: 'Normal wear and tear (scuffs, creasing, patina development)', before: 'Хэвийн элэгдэл (зураас, үрчлээ, патина хөгжил)', after: 'Хэвийн элэгдэл (зураас, үрчлээ, өнгө хувирах)' },
    { page: 'Warranty', english: 'Modifications or repairs by non-authorized parties', before: 'Зөвшөөрөлгүй талын өөрчлөлт, засвар', after: 'Зөвшөөрөлгүй этгээдийн өөрчлөлт, засвар' },
    { page: 'Warranty', english: 'Sole wear from regular use (resoling available)', before: 'Хэрэглээнээс болсон ул элэгдэл (дахин ул солих боломжтой)', after: 'Хэрэглээнээс болсон улны элэгдэл (ул солих үйлчилгээ бий)' },
    { page: 'Warranty', english: 'Resoling and refurbishment are paid services:', before: '(new line; replaces a promotional paragraph)', after: 'Ул солих, сэргээх нь төлбөртэй үйлчилгээ юм:' },
    { page: 'Warranty', english: 'Send your boots: If approved, ship your boots to our workshop…', before: 'Ателье руу илгээх: …манай ателье руу илгээнэ үү…', after: 'Гутлаа илгээх: …манай урланд илгээнэ үү…' },
    { page: 'Shipping', english: 'Production time', before: 'Үйлдвэрлэлийн хугацаа', after: 'Хийх хугацаа' },
    { page: 'Shipping', english: 'Production time is how long we need to prepare your pair before it ships. Shipping time is added after dispatch.', before: '(new line)', after: 'Хийх хугацаа гэдэг нь гутлыг илгээхээс өмнө бэлтгэхэд шаардагдах хугацаа юм. Хүргэлтийн хугацаа илгээсний дараа нэмэгдэнэ.' },
    { page: 'Shipping', english: 'Transit time after dispatch', before: 'Хүргэлтийн хугацаа', after: 'Илгээснээс хойшх хүргэлтийн хугацаа' },
    { page: 'Shipping', english: 'Express shipping shortens transit time only. It does not shorten production time.', before: '(new line)', after: 'Шуурхай хүргэлт зөвхөн хүргэлтийн хугацааг богиносгоно. Хийх хугацаанд нөлөөлөхгүй.' },
    { page: 'Shipping', english: 'Asia Pacific / Rest of world', before: 'Ази Номхон далай / Бусад улсууд', after: 'Ази, Номхон далайн бүс / Бусад улс' },
    { page: 'Shipping', english: 'Free exchanges for sizing issues', before: 'Хэмжээний асуудалтай бол үнэгүй солино', after: 'Хэмжээ таараагүй бол үнэгүй солино' },
    { page: 'Terms', english: 'Custom orders cannot be cancelled once production begins', before: 'Үйлдвэрлэл эхэлсний дараа захиалгыг цуцлах боломжгүй (said all orders)', after: 'Тусгай захиалгыг хийж эхэлсний дараа цуцлах боломжгүй' },
    { page: 'Terms', english: '(spelling throughout)', before: 'нөхцлийн, нөхцлийг', after: 'нөхцөлийн, нөхцөлийг' },
    { page: 'Privacy', english: 'contact our atelier / our workshop team', before: 'ателье / цехийн баг', after: 'урлан / урлангийн баг' },
];

function leaves(tree: Tree, prefix = ''): [string, string][] {
    return Object.entries(tree).flatMap(([key, value]): [string, string][] => {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'string') return [[path, value]];
        if (Array.isArray(value)) return value.map((v, i): [string, string] => [`${path}.${i + 1}`, v]);
        return leaves(value, path);
    });
}

const cell = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ');

const enMap = new Map(leaves(en as Tree));
const mnLeaves = leaves(mn as Tree);
const notFromV2 = mnLeaves.filter(([key]) => !FROM_V2.has(key) && !(key in ADAPTED_FROM_V2));
// Strings identical in both languages (size-system codes, placeholder-only patterns) need no review.
const identical = notFromV2.filter(([key, text]) => enMap.get(key) === text);
const drafts = notFromV2.filter(([key, text]) => enMap.get(key) !== text);
const careEn = new Map(leaves(careContent.en as unknown as Tree));
const careMn = leaves(careContent.mn as unknown as Tree);
const draftProducts = products.filter((p) => Number(p.id) >= 7);

const out: string[] = [];
out.push('# Mongolian review packet');
out.push('');
out.push('Generated by `npm run review:mn` from the strings the site renders on branch `content/domog-bilingual-blueprint`. Do not edit by hand: send corrections back, and they are applied to the source files.');
out.push('');
out.push('| Section | Rows |');
out.push('|---|---|');
out.push(`| 1. Interface strings (Claude drafts) | ${drafts.length} |`);
out.push(`| 2. Adapted from v2 | ${Object.keys(ADAPTED_FROM_V2).length} |`);
out.push(`| 3. Care page | ${careMn.length} |`);
out.push(`| 4. Product names 7–15 | ${draftProducts.length} |`);
out.push(`| 5. Policy-page corrections | ${POLICY_EDITS.length} |`);
out.push('');
out.push(`Not included: ${FROM_V2.size} interface strings whose Mongolian is v2's own wording, used as written, and ${identical.length} strings that are the same in both languages (${identical.map(([k]) => `\`${k}\``).join(', ')}).`);
out.push('');
out.push('## Instructions for the reviewer');
out.push('');
out.push('```text');
out.push("You are reviewing Mongolian website copy for Domog, a Mongolian boot business run by Eric's parents since 1990.");
out.push('Each row gives the English, the current Mongolian, and where it appears.');
out.push('');
out.push('For every row, reply with the ID and one of:');
out.push('  OK');
out.push('  or: corrected Mongolian | literal English back-translation | one-line reason');
out.push('');
out.push('Rules:');
out.push('- Natural modern Mongolian in Cyrillic, suited to a calm, premium shop.');
out.push('- Keep {placeholders} and %s exactly as they are. Keep numbers, prices, sizes, and policy scope identical to the English.');
out.push('- Keep model names (ТЭНГЭР, БАТУ, etc.) unchanged. For products 7–15, say whether the Mongolian name reads naturally and is appropriate.');
out.push('- Do not add claims, services, or promises that are not in the English.');
out.push('- If the English itself is unclear or wrong, say so in the reason.');
out.push('```');
out.push('');

out.push('## 1. Interface strings (Claude drafts)');
out.push('');
drafts.forEach(([key, mnText], index) => {
    const group = key.split('.')[0];
    if (group !== drafts[index - 1]?.[0].split('.')[0]) {
        out.push(`### ${group}`, '');
        if (CONTEXT[group]) out.push(CONTEXT[group], '');
        out.push('| ID | English | Mongolian (draft) | Notes |', '|---|---|---|---|');
    }
    out.push(`| \`${key}\` | ${cell(enMap.get(key) ?? '')} | ${cell(mnText)} | ${cell(NOTES[key] ?? '')} |`);
    if (group !== drafts[index + 1]?.[0].split('.')[0]) out.push('');
});

out.push('## 2. Adapted from v2');
out.push('');
out.push('| ID | English | Mongolian | Why it differs from v2 |');
out.push('|---|---|---|---|');
for (const [key, reason] of Object.entries(ADAPTED_FROM_V2)) {
    const mnText = mnLeaves.find(([k]) => k === key)?.[1] ?? '';
    out.push(`| \`${key}\` | ${cell(enMap.get(key) ?? '')} | ${cell(mnText)} | ${cell(reason)} |`);
}
out.push('');

out.push('## 3. Care page (/care)');
out.push('');
out.push('Rewritten in this pass. The care instructions match the previous page; unverified claims about tanning and handwork were removed from both languages.');
out.push('');
out.push('| ID | English | Mongolian (draft) |');
out.push('|---|---|---|');
for (const [key, mnText] of careMn) {
    out.push(`| \`care.${key}\` | ${cell(careEn.get(key) ?? '')} | ${cell(mnText)} |`);
}
out.push('');

out.push('## 4. Product names 7–15');
out.push('');
out.push('Products 1–6 keep their existing names (ТЭНГЭР, НААДАМ, АЛТАН, АЛТАЙ, АНУ, БАТУ). These nine had English descriptive names only; the Mongolian is a draft translation of the English, not a new brand name. Whether these products are current is a separate question (docs/content/OPEN-QUESTIONS.md, 2.1).');
out.push('');
out.push('| ID | English name | Mongolian (draft) | Notes |');
out.push('|---|---|---|---|');
for (const p of draftProducts) {
    const note = p.id === '14' ? 'Culture-sensitive name: please check meaning and appropriateness.' : '';
    out.push(`| \`product.${p.id}\` | ${cell(p.nameLocalized.en)} | ${cell(p.nameLocalized.mn)} | ${note} |`);
}
out.push('');

out.push('## 5. Policy-page corrections');
out.push('');
out.push('The shipping, warranty, terms, and privacy pages kept their existing Mongolian. These lines were changed to fix errors or to match the English. Figures and obligations are unchanged.');
out.push('');
out.push('| Page | English | Before | Now |');
out.push('|---|---|---|---|');
for (const edit of POLICY_EDITS) {
    out.push(`| ${edit.page} | ${cell(edit.english)} | ${cell(edit.before)} | ${cell(edit.after)} |`);
}
out.push('');

const target = join(process.cwd(), 'docs', 'content', 'MN-REVIEW-PACKET.md');
writeFileSync(target, out.join('\n'));
console.log(
    `Wrote ${target}: ${drafts.length} interface drafts, ${Object.keys(ADAPTED_FROM_V2).length} adapted, ` +
        `${careMn.length} care rows, ${draftProducts.length} product names, ${POLICY_EDITS.length} policy edits`
);

// Guard against stale classification: every FROM_V2 key must still exist.
const missing = [...FROM_V2, ...Object.keys(ADAPTED_FROM_V2)].filter((k) => !enMap.has(k));
if (missing.length) {
    console.error(`Unknown keys in FROM_V2/ADAPTED_FROM_V2: ${missing.join(', ')}`);
    process.exitCode = 1;
}
