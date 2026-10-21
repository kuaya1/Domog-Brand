# Domog — Bilingual Content and Claude Code Handoff

**Version:** 2.0 · October 20, 2026  
**Purpose:** Refine Gemini's Mongolian audit into an actionable bilingual editorial package and give Claude Code responsibility for final technical architecture, implementation, and verification.  
**Inputs:** Eric's instructions; Domog Content Blueprint v1; Gemini's supplied audit; ChatGPT's review and session spot-checks.  
**Status:** Implementation direction and proposed bilingual copy. No Claude Code run or site deployment has been performed by this document.

## 1. The assignment

Improve Domog's English and Mongolian website so customers can understand the boots, the family business, and the path to choosing and ordering a pair. Preserve a calm premium presentation through clear language, useful information, and a visible connection to the family.

The owner confirms that this is his mother and father's family business and that the family has operated it since 1990. The site presents Mongolian boots. Do not extend these facts into unconfirmed biographies, methods, product specifications, or service guarantees.

**Editorial anchor**

- English: **Mongolian boots. A family story since 1990.**
- Mongolian: **Монгол гутал. 1990 оноос эхтэй гэр бүлийн түүх.**

This anchor is proposed website copy. The Mongolian is a working editorial recommendation, not a claim of independent native-speaker certification.

### Roles and authority

| Contributor | Authority and responsibility |
|---|---|
| Eric and family | Business facts, family history, names, cultural intent, commercial policy, actual capabilities |
| Gemini | Mongolian editorial analysis, natural phrasing, terminology suggestions, bilingual meaning checks |
| ChatGPT | Reconcile findings, improve content direction, distinguish evidence from inference, prepare copy and implementation requirements |
| Claude Code Opus 5.5 | Final technical architect and implementer: inspect the repository, choose code/data/localization structure, reconcile conflicting recommendations, implement, and verify the complete experience |

Use Claude's highest available reasoning/effort setting supported by the user's environment. The agent should not claim a setting or model was selected unless it can verify that. If the agent cannot control model selection, identify the required setting once and proceed within the selected session as appropriate.

Claude may adapt or reject this document's technical suggestions when repository evidence supports a better solution. Record consequential decisions briefly. Business history and policy must remain grounded in the owner's information and legitimate records.

This package supplements Blueprint v1 and supersedes its narrower description of Claude as a copy implementer. Claude now owns the final technical architecture as well as implementation. The original blueprint and Gemini report remain source records.

## 2. Reconciled assessment of Gemini's findings

The session check covered the Mongolian homepage, TENGER, ALTAN, and standalone size guide. Treat those observations as a recorded sample. Recheck the repository and affected views before changing them; do not assume the site has remained static.

| Finding | Reconciled status | Action |
|---|---|---|
| Mongolian product URLs display English product content and purchase UI | Observed on TENGER and ALTAN | Audit all product templates/data and localize the complete journey |
| Footwear fit is described using software-style settings language | Observed in the size guide | Rewrite each phrase according to context; avoid a global word substitution |
| Riding category uses a bare verb; Winter category differs grammatically from neighboring labels | Observed on homepage cards | Standardize the labels while preserving their intended meaning |
| Collection and workshop/contact language is confusing | Labels observed; exact interaction destinations need checking | Verify each link/menu action and label it for its real destination |
| Same reviews appear on multiple products | Repetition observed on sampled pages | Investigate scope, provenance, and data mapping before correction |
| Review dates differ by one day across renderings | A discrepancy was reported; cause is unproven | Check date-only values, timezone handling, and rendering before concluding anything about review authenticity |
| Copyright differs between pages | Not reproduced in the session live sample; inspected pages showed 2026 | Verify current behavior and fix only a reproduced or source-confirmed issue |
| Duplicate mobile links | Not established by the desktop check | Test mobile; distinguish menu content from hidden cart/dialog content |
| Product English is hardcoded | Plausible implementation hypothesis | Determine whether literals, fallback logic, product data, server/client locale propagation, or another cause is responsible |
| Materials, lineage, famous customers, production hours, spiritual associations | Existing claims, not independently confirmed facts | Trace evidence; use supported copy and log unresolved claims |
| Several Mongolian support pages were not inspected by Gemini | Acknowledged coverage limitation | Complete coverage rather than labeling the sample a full-site audit |

Do not treat repeated reviews as proven fake reviews, a stale fetched year as a verified runtime bug, or an inference about code structure as a repository finding.

## 3. Corrections to Gemini's recommendations

### Language and meaning

- Warm imperatives such as **тавиарай** are a suitable voice choice for guidance. Declarative instructional endings such as **тавина** are also legitimate. Keep the distinction between grammar and editorial preference clear.
- **Люкс** can be reconsidered as a branding choice. It is not automatically a grammatical error. **Дээд зэрэглэлийн** preserves a premium-positioning meaning; **Гоёлын** describes a dress/occasion use and should not be treated as an exact substitute.
- **Морь уналгын** preserves the riding category. **Аяны** introduces a travel/journey use and requires separate support.
- Keep **БАТУ / BATU** until the owner decides otherwise. Do not rename it **БАТ** as a routine translation correction.
- Preserve original product IDs, names, and the relation between display name and model identity. Translate descriptive suffixes without inventing new brand names or etymologies.
- Avoid replacing one unsupported craft statement with another. Learning from elder artisans, individually fitting every pair, using specific leathers, or working without machinery all require evidence.

### Technical and cultural terms

**Уллах** refers to soling and, in a traditional boot context, joining the sole and upper. It must not be used as an automatic equivalent of every lasting or shaping operation. The explanatory dictionary also does not define **хөм** solely through a smoking process. Confirm the family's actual trade terms and materials before publishing specialist descriptions.

References:

- [Монгол хэлний их тайлбар толь — уллах](https://mongoltoli.mn/dictionary/detail/95605)
- [Монгол хэлний их тайлбар толь — хөм](https://mongoltoli.mn/search.php?opt=1&ug_id=112746&word=%D0%A5%D3%A8%D0%9C)

A culture-sensitive name should prompt a careful meaning and use check. Do not convert that uncertainty into a broad declaration that the product is culturally inappropriate. Likewise, a historical claim about horses, khans, or a lineage needs a suitable source; do not replace it with an unsupported historical generalization.

## 4. Work that can proceed now

Proceed with confirmed language and interface issues, repository inspection, missing-string coverage, and restrained general copy. A family interview is useful for deeper storytelling but is not a prerequisite for fixing the Mongolian shopping experience.

| Workstream | Proceed now | Requires specific evidence before publication |
|---|---|---|
| Navigation and actions | Meaningful bilingual labels matching actual actions | New transaction modes or services |
| Homepage | Product identity, family business since 1990, collection/contact invitations | Manufacturing methods, family biography, measurable quality/performance claims |
| Product pages | Complete localized UI; supported fields; model-preserving fallback descriptions | Materials, specifications, custom fitting, performance, production promises |
| Family story | Brief accurate introduction | Names, roles, milestones, quotations, current responsibilities |
| Fit | Clear instructions and consistent labels | Correct conversion data, model-specific sizing advice, bespoke capabilities |
| Shipping/support | Localize established terms faithfully; identify contradictions | New policies, shorter times, broader coverage, or changed customer obligations |
| Reviews | Trace records and distinguish brand versus product scope | Authenticity and deletion/reclassification decisions where records are unclear |

Optional unsupported story modules can be omitted from the proposed version. Material uncertainty in price, fit data, transaction terms, or order timing must be identified for the affected flow. Continue independent work; keep questions narrow and grouped.

## 5. Bilingual interface vocabulary

These are proposed replacements or new localized equivalents. Apply them in context after verifying the actual component/action. Translate complete phrases; do not run indiscriminate search-and-replace on words such as **тохиргоо**, which may be legitimate in other contexts.

### Navigation, collection, and contact

| Content ID | English | Mongolian | Context |
|---|---|---|---|
| nav.collection | Collection | Гутлын цуглуулга | Existing shop destination |
| nav.family | Our story | Бидний түүх | Existing about destination; expand family content only with facts |
| nav.contact | Visit & contact | Хаяг, холбоо барих | Contact destination; actual visits must be supported |
| nav.bag | Shopping bag | Сагс | Cart destination |
| search.placeholder | Search boots or styles | Гутал, загвар хайх | Product search |
| search.action | Search | Хайх | Search action |
| search.none | No matching styles found. | Хайлтанд тохирох загвар олдсонгүй. | Real empty result |
| collection.title | The Domog collection | «Домог»-ийн гутлын цуглуулга | Collection H1 |
| collection.all | All styles | Бүх загвар | Filter option |
| collection.filter | Filter | Шүүх | Filter control |
| collection.sort | Sort by | Эрэмбэлэх | Sorting control |
| collection.newest | New arrivals | Шинэ загвар | Match actual sorting semantics |
| collection.priceAsc | Price: low to high | Үнэ: багаас их рүү | Sorting option |
| collection.priceDesc | Price: high to low | Үнэ: ихээс бага руу | Sorting option |
| collection.price | Price | Үнэ | Price filter label |
| product.view | View details | Дэлгэрэнгүй үзэх | Product detail link |
| product.new | New | Шинэ | Use only when catalog flag applies |
| contact.title | Contact us | Холбоо барих | Contact page |
| contact.name | Name | Нэр | Actual form field |
| contact.email | Email address | Имэйл хаяг | Actual form field |
| contact.phone | Phone number | Утасны дугаар | Actual form field |
| contact.subject | Subject | Сэдэв | Actual form field |
| contact.message | Message | Зурвас | Actual form field |
| contact.optional | Optional | Заавал бөглөхгүй | Optional field annotation |
| contact.send | Send message | Зурвас илгээх | Real submission action |
| contact.sending | Sending… | Илгээж байна… | Real pending state |
| contact.success | Your message has been sent. | Таны зурвас илгээгдлээ. | Only after confirmed backend success |
| contact.failure | Your message could not be sent. Please try again. | Таны зурвасыг илгээж чадсангүй. Дахин оролдоно уу. | Genuine recoverable failure |
| contact.required | Please complete this field. | Энэ хэсгийг бөглөнө үү. | Required-field validation |
| contact.invalidEmail | Please enter a valid email address. | Имэйл хаягаа зөв оруулна уу. | Email validation |

### Categories — preserve their scope

| Existing concept | Mongolian direction | Restriction |
|---|---|---|
| Riding | Морь уналгын | Do not add expedition/travel performance |
| Winter | Өвлийн | Do not add temperature ratings or insulation claims |
| Festival | Баяр наадмын | Confirm it matches actual occasion/category intent |
| Ceremonial | Ёслолын | Do not automatically imply official state use |
| Everyday / Daily Wear | Өдөр тутмын | Preserve actual taxonomy relationships |
| Traditional | Уламжлалт | Do not equate automatically with Heritage |
| Heritage | Өв уламжлал | Confirm its distinct purpose if retained as a product category |
| Luxury / Premium | Дээд зэрэглэлийн | Proposed positioning label, not a certification or proof of superior materials |

Claude should inspect why filter categories and displayed category badges differ before consolidating them. Changing a visible label does not justify changing a product's classification or dropping a catalog entry.

### Product, fit, and order controls

| Content ID | English | Mongolian | Context |
|---|---|---|---|
| breadcrumb.home | Home | Нүүр | Breadcrumb |
| breadcrumb.collection | Collection | Цуглуулга | Breadcrumb |
| product.sizeFit | Size & fit | Хэмжээ, өмсгөл | Product information section |
| product.sizeGuide | Size guide | Хэмжээний заавар | Guide/modal |
| product.chooseSize | Choose a size | Хэмжээгээ сонгоно уу | Size selector |
| product.sizeRequired | Select a size to continue. | Үргэлжлүүлэхийн тулд хэмжээгээ сонгоно уу. | Required selection |
| product.quantity | Quantity | Тоо ширхэг | Quantity control |
| product.increase | Increase quantity | Тоо ширхэг нэмэх | Accessible button name |
| product.decrease | Decrease quantity | Тоо ширхэг хасах | Accessible button name |
| product.addBag | Add to bag | Сагсанд нэмэх | Only if the control adds to cart |
| product.ask | Ask about this pair | Энэ загварын талаар асуух | Only if it opens a real inquiry path |
| product.custom | Request a custom pair | Тусгай захиалгын талаар асуух | Only for an actual custom-order inquiry |
| product.options | Additional options | Нэмэлт сонголтууд | Existing supported options |
| product.engraving | Engraving | Сийлбэр | Only if this service is real and enabled |
| product.giftWrap | Gift wrapping | Бэлгийн боодол | Only if this service is real and enabled |
| product.express | Express shipping | Шуурхай хүргэлт | Preserve actual service and verified scope |
| product.total | Product total | Бүтээгдэхүүний нийт үнэ | Match what is included |
| product.related | More styles | Бусад загвар | Related products |
| product.previousImage | Previous image | Өмнөх зураг | Accessible image control |
| product.nextImage | Next image | Дараагийн зураг | Accessible image control |
| product.imageNumber | View image {number} | {number}-р зургийг үзэх | Parameterized accessible label; check numeral suffix handling |
| fit.title | Choose your size | Хэмжээгээ сонгох | Guide heading |
| fit.intro | Start by measuring your feet. | Эхлээд хөлийнхөө хэмжээг аваарай. | Safe orientation |
| fit.length | Foot length | Хөлийн урт | Measurement field |
| fit.chart | Size chart | Хэмжээний хүснэгт | Verified conversion data only |
| fit.calculate | Find my size | Хэмжээгээ тодорхойлох | Working calculator only |
| fit.help | Ask about sizing | Хэмжээ сонгох талаар асуух | Actual help destination |
| fit.true | True to size | Хэмжээндээ таардаг | Preserve review attribute meaning |
| fit.small | Runs small | Ердийн хэмжээнээс бага өмсгөлтэй | Model sizing observation, not a claim about preferred snugness |
| fit.large | Runs large | Ердийн хэмжээнээс том өмсгөлтэй | Same distinction |

Check the appropriateness of size/fit wording against the family's actual sizing system. Localizing a label must not change its numerical interpretation.

### Bag, support, reviews, and shared UI

| Content ID | English | Mongolian | Context |
|---|---|---|---|
| bag.title | Your bag | Таны сагс | Bag title |
| bag.empty | Your bag is empty. | Таны сагс хоосон байна. | Empty state |
| bag.emptyBody | Explore the collection and choose your pair. | Цуглуулгатай танилцаж, гутлаа сонгоорой. | Empty-state invitation |
| bag.continue | Continue browsing | Загваруудыг үргэлжлүүлэн үзэх | Return to collection |
| bag.remove | Remove item | Бүтээгдэхүүнийг хасах | Remove from bag |
| bag.subtotal | Subtotal | Завсрын дүн | Preserve actual calculation meaning |
| bag.shipping | Shipping | Хүргэлт | Charge/section |
| bag.total | Total | Нийт дүн | Real total |
| checkout.review | Review order | Захиалгаа шалгах | Review step |
| checkout.payment | Continue to payment | Төлбөр төлөх хэсэгт шилжих | Payment step |
| checkout.place | Place order | Захиалга илгээх | Final order action only where accurate; clarify payment consequence if required |
| support.size | Size & fit | Хэмжээ сонголт | Support navigation |
| support.care | Care guide | Арчилгааны заавар | Support navigation |
| support.shipping | Shipping & returns | Хүргэлт, буцаалт | Support navigation |
| support.warranty | Warranty | Баталгаа | Avoid inventing a fixed warranty period |
| footer.collection | Collection | Цуглуулга | Product-link column |
| footer.workshop | Address & contact | Хаяг, холбоо барих | Contact column |
| footer.support | Help | Тусламж | Support-link column |
| reviews.title | Customer reviews | Худалдан авагчдын сэтгэгдэл | Use appropriate brand/product scope |
| reviews.all | All reviews | Бүх сэтгэгдэл | Filter |
| reviews.photos | With photos | Зурагтай | Filter |
| reviews.newest | Newest first | Сүүлийн сэтгэгдэл эхэнд | Sort |
| reviews.highest | Highest rated | Өндөр үнэлгээтэй нь эхэнд | Sort |
| reviews.lowest | Lowest rated | Бага үнэлгээтэй нь эхэнд | Sort |
| reviews.helpful | Most helpful | Хамгийн хэрэгтэй гэж үнэлэгдсэн нь эхэнд | Sort |
| reviews.verified | Verified purchase | Худалдан авалт баталгаажсан | Only for actually verified purchases |
| ui.close | Close | Хаах | Accessible control |
| ui.loading | Loading… | Ачаалж байна… | Pending state |
| ui.retry | Try again | Дахин оролдох | Retry action |
| ui.error | Something went wrong. Please try again. | Алдаа гарлаа. Дахин оролдоно уу. | Generic recoverable error |
| ui.skip | Skip to main content | Үндсэн агуулга руу шилжих | Accessibility link |

Use locale-aware pluralization, interpolation, currency, and dates where the existing stack supports them. English parameterized messages such as review counts and item counts must also be translated; this table is a starting catalog, not an exhaustive inventory.

## 6. Refined homepage copy

This is a compact, grounded first release candidate for editorial implementation. It intentionally leaves room for richer family/process evidence later. Claude can adjust section order and layout to suit the existing page and the customer journey, while preserving meaning.

### H01 — Introduction

| Element | English | Mongolian |
|---|---|---|
| Eyebrow | FAMILY BUSINESS SINCE 1990 | 1990 ОНООС ЭХТЭЙ ГЭР БҮЛИЙН БИЗНЕС |
| H1 | Mongolian boots. A family story since 1990. | Монгол гутал. 1990 оноос эхтэй гэр бүлийн түүх. |
| Body | Our family's business began in 1990 and continues today through Domog. Explore the collection and discover the story behind it. | Манай гэр бүлийн бизнес 1990 онд эхэлж, өнөөдөр «Домог»-оор үргэлжилж байна. Гутлын цуглуулгатай танилцаж, бидний түүхийг сонирхоорой. |
| Primary action | Explore the collection | Цуглуулгатай танилцах |
| Secondary action | Our story | Бидний түүх |

### H02 — Collection

| Element | English | Mongolian |
|---|---|---|
| Heading | Find your pair | Өөрт тохирох гутлаа сонгоорой |
| Body | Explore the styles and read the details of each pair. If you have a question about a model or size, get in touch. | Загваруудын мэдээлэлтэй танилцаарай. Гутлын загвар, хэмжээний талаар асуух зүйл байвал бидэнтэй холбогдоорой. |
| Card action | View details | Дэлгэрэнгүй үзэх |
| Collection action | View all styles | Бүх загварыг үзэх |

Use the actual catalog and prices. Do not add new-use descriptions, warmth claims, manufacturing details, or model names as decorative copy.

### H03 — Family

| Element | English | Mongolian |
|---|---|---|
| Heading | Our family's story | Манай гэр бүлийн түүх |
| Body | This business has been part of our family's working life since 1990. Get to know the story behind Domog. | Энэ бизнес 1990 оноос манай гэр бүлийн амьдрал, ажил хөдөлмөрийн нэг хэсэг болж ирсэн. «Домог»-ийн түүхтэй танилцаарай. |
| Action | Read our story | Бидний түүхийг унших |

A genuine family image can add specificity. Do not caption an unidentified workshop image as a parent's work. Do not manufacture a first-person founder narrative or assign roles to either parent.

### H04 — Choosing a pair

| Element | English | Mongolian |
|---|---|---|
| Heading | Choosing your pair | Гутлаа сонгоход |
| Item 1 title | Explore the styles | Загваруудтай танилцах |
| Item 1 body | Read the details on each product page. | Загвар бүрийн дэлгэрэнгүй мэдээлэлтэй танилцаарай. |
| Item 2 title | Check your size | Хэмжээгээ шалгах |
| Item 2 body | Measure your feet and read the size guide before choosing. | Хэмжээгээ сонгохын өмнө хөлийнхөө хэмжээг авч, заавартай танилцаарай. |
| Item 3 title | Ask a question | Асууж тодруулах |
| Item 3 body | Contact us if you need more information about a pair or an order. | Гутал болон захиалгын талаар дэлгэрэнгүй мэдээлэл авах бол бидэнтэй холбогдоорой. |

These informational cards can replace unsupported generic craft promises in the proposed page. If verified craft/process content exists in the repository or supplied records, Claude may retain a stronger evidence-based module instead and document its source.

### H05 — Care and contact

| Element | English | Mongolian |
|---|---|---|
| Care heading | Looking after your boots | Гутлын арчилгаа |
| Care body | Read the care guide and contact us with questions about your pair. | Арчилгааны заавартай танилцаж, гутлынхаа талаар асуух зүйл байвал бидэнтэй холбогдоорой. |
| Care action | Read the care guide | Арчилгааны заавар үзэх |
| Contact heading | Questions about a pair? | Гутлын талаар асуух зүйл байна уу? |
| Contact body | Get in touch about styles, sizing, or an order. | Загвар, хэмжээ, захиалгын талаар бидэнтэй холбогдоорой. |
| Contact action | Contact us | Холбоо барих |
| Footer descriptor | Mongolian boots. A family business since 1990. | Монгол гутал. 1990 оноос эхтэй гэр бүлийн бизнес. |

No fixed newsletter frequency, discount, service response time, or lifetime statement is added by this copy. Preserve supported existing commercial arrangements until reviewed; do not invent replacements.

## 7. Product content and support pages

### Product copy rules

Build a bilingual product matrix from actual records. Include model identity, categories, supported materials/features, images, fit information, price/currency, stock/order type, and links to applicable support. Localize interface copy separately from product-specific data.

Do not translate unsupported theatrical claims into more convincing Mongolian. Determine their source and use substantiated information or a restrained fallback for the proposed version.

**Temporary factual fallback when no dependable description exists**

- English: `Explore {model}. Check the size options and contact us if you would like more information about this model.`
- Mongolian: `{model} загварын хэмжээний сонголттой танилцаарай. Энэ загварын талаар дэлгэрэнгүй мэдээлэл авах бол бидэнтэй холбогдоорой.`

This is interim copy, not a substitute for useful verified product details. Prefer available reliable details over repeated generic descriptions. Log missing fields by product ID; keep internal notes out of rendered content.

### Size-guide language

Proposed measurement instructions:

| Step | English | Mongolian |
|---|---|---|
| 1 | Place a sheet of paper against a wall on a hard, level floor. | Хатуу, тэгш шалан дээр цаасаа хананд тулгаж тавиарай. |
| 2 | Wear the socks you intend to wear with the boots. Stand on the paper with your heel against the wall. | Гуталтайгаа өмсөх оймсоо өмсөөд, өсгийгөө хананд тулган цаасан дээр зогсоорой. |
| 3 | Mark the tip of your longest toe on the paper. | Хөлийнхөө хамгийн урт хурууны үзүүр хүрсэн газрыг цаасан дээр тэмдэглээрэй. |
| 4 | Measure the distance from the wall to the mark. This is your foot length. | Ханаас тэмдэг хүртэлх зайг хэмжээрэй. Энэ нь таны хөлийн урт юм. |
| 5 | Measure both feet and use the longer measurement. | Хоёр хөлөө хэмжиж, аль урт хэмжээг нь ашиглаарай. |

These clarify the existing general measurement approach. Confirm the measurement basis before connecting it to any product recommendation. Do not generate a replacement numeric conversion chart from model memory. Reconcile the standalone chart, modal, calculator, and product options with one legitimate source and distinguish unisex/men's/women's systems where relevant.

### Production, shipping, and order terms

Separate availability, preparation/making, dispatch, and transit. Preserve actual charges and destination limits. An express transit estimate must not imply expedited manufacturing.

Use a shared policy source or clear reference structure where appropriate. Preserve any legitimate differences between products and destinations. Translating policies must not change a customer's eligibility, cost, coverage, or time limit.

### Warranty and repair

Distinguish defects from wear and paid maintenance. Identify contradictory statements and preserve a record of previous wording. Do not silently revoke obligations or introduce free service, broader lifetime coverage, prepaid labels, or a fixed duration that the business has not established.

### Reviews and dates

Trace how review records reach each page. If records are brand-level, label and place them accordingly. If there is an actual mapping bug, fix it. If sample data is confirmed, remove it from the public proposed version. If authenticity remains unresolved, document the affected records and propose a conservative treatment without inventing a verdict.

Check date-only versus timestamp semantics. A timezone-induced day shift should be corrected at formatting/data-boundary level where justified; it is not proof of falsification. Preserve actual customer text. Label any review translation appropriately if provided.

## 8. Architecture decisions for Claude

The following are decisions to make after inspection, not preselected technologies:

| Area | Claude's decision | Evidence to use |
|---|---|---|
| Locale flow | How locale reaches route, server/client component, modal, and product data | Actual route/config/component structure |
| Translation storage | How shared UI and product copy should be organized and validated | Existing i18n conventions and update needs |
| Product identity | How localized display names relate to immutable model IDs and commerce records | Catalog and integrations |
| Taxonomy | Whether differences among badges, filters, and categories are intentional | Actual data and customer paths |
| Sizing | Where validated measurement data lives and how all views consume it | Legitimate sizing records and current calculations |
| Policies | Which facts can be shared and which need product/destination scope | Existing policies and operating records |
| Metadata | How locale titles, descriptions, alternates, and structured data stay aligned | Existing framework and rendered output |
| Error handling | How missing translations, failed submissions, and unavailable items are presented | Actual state and integration contracts |
| Layout | How English/Mongolian lengths fit mobile and desktop | Rendered previews and existing visual system |

Prefer an implementation proportionate to the actual issues. Fixing locale coverage does not inherently require a framework migration, new CMS, new commerce backend, or broad dependency churn. Claude may make necessary structural improvements with a concise rationale and appropriate verification.

Choose fallbacks deliberately. A missing Mongolian translation should be visible to maintainers and must not quietly recreate an English product body inside a Mongolian route. Do not change financial values or currency solely because locale changes. Numeric display and the actual charge currency must remain clear.

## 9. Implementation sequence and verification

1. **Verify the local repository and workspace.** Do not assume the earlier setup prompt was executed. Reuse the correct checkout, preserve uncommitted work, and create or reuse an isolated branch/worktree.
2. **Inspect before deciding.** Read applicable instructions; inventory routes, content stores, components, integrations, and existing tests. Establish baseline checks.
3. **Reproduce the important issues.** Check representative bilingual pages, mobile navigation, sizing surfaces, product-to-bag flow, contact states, review mapping, and metadata. Distinguish static HTML, hidden UI, and rendered customer state.
4. **Choose the final architecture.** Write a short decision record and content coverage map. Then implement; a plan alone is not completion.
5. **Deliver a representative vertical slice.** Make one product page and its shared controls work in both languages. Verify the pattern before applying it to all catalog entries and support pages.
6. **Complete copy and coverage.** Include headers, mobile menus, footer, search, image controls, accessibility labels, filters, modals, bag, supported checkout states, forms, metadata, and structured data.
7. **Verify full journeys.** Inspect desktop/mobile in both languages. Use safe test modes or existing mocks for integrations. Do not submit real orders or send live messages as routine verification.
8. **Report the result.** Provide the worktree/branch, runnable preview, changed areas, decisions, checks, remaining fact dependencies, and a reviewable diff/PR if supported by the normal workflow.

### Acceptance criteria

- The audited Mongolian journey no longer unexpectedly switches to English body/UI text.
- Labels describe actual routes/actions, with desktop/mobile consistency.
- Product names, categories, prices, currency, and order identity remain accurate.
- Footwear fit language is comprehensible; all numeric sizing surfaces use consistent legitimate data.
- Production and transit language are consistent where operations are established.
- Family and craft copy does not add unsupported biography or product promises.
- Reviews have an understood scope/source; formatting issues are treated according to their cause.
- English and Mongolian preserve the same commercial meaning.
- Essential content, controls, and errors remain readable and accessible on mobile and desktop.
- Applicable build/type/lint checks and relevant tests pass, or pre-existing failures are clearly separated from new failures.
- No internal placeholders, fake success states, invented reviews, or undocumented business claims are introduced.

Use meaningful tests for the structural problems actually changed—for example locale propagation, shared sizing data, or policy consistency. Do not build a large test suite that only repeats the copy table. Visual inspection remains necessary for typography and wrapping.

## 10. Ready-to-use Claude Code master instruction

Paste the following into the local Claude Code session and attach this file, Blueprint v1, and Gemini's original audit if available.

```text
Act as Domog's final technical architect, bilingual implementation lead, and verification owner. Use Claude Code Opus 5.5 with the highest available reasoning/effort setting supported in this environment. If you cannot select or verify the model/setting, state that once; do not pretend it is enabled. Use careful internal reasoning and report concise conclusions, evidence, and decisions.

PROJECT
Domog is my parents' family business, operating since 1990. The bilingual site is https://www.domogbrand.com and has English and Mongolian versions. We are improving language, customer flow, family storytelling, premium presentation, and factual consistency.

INPUTS AND AUTHORITY
Read the attached Domog Bilingual Content and Claude Handoff v2. Use Blueprint v1 for broader intent and Gemini's audit as an issue-discovery source. V2 corrects several overstatements in that audit and expands your role beyond copy insertion.

You own final engineering architecture and code decisions. Inspect the repository, challenge recommendations where evidence warrants it, choose a proportionate solution, implement it, and verify the complete customer experience. Do not defer routine reversible decisions back to me. Business facts and policies require legitimate records or owner confirmation; neither a fluent draft nor an existing marketing sentence establishes truth.

START ON MY LOCAL COMPUTER
Verify whether the correct Domog repository has already been cloned and whether the earlier work environment exists. Read applicable repository instructions. If a correct checkout exists, preserve all uncommitted work and use an isolated worktree/branch. Otherwise locate the repository through existing authenticated project/GitHub configuration, verify its relationship to this site, and clone it into an appropriate local projects directory. Ask for the repository URL only if you cannot identify it unambiguously. Use content/domog-bilingual-blueprint or a safely named continuation branch; never overwrite another branch or worktree.

Open the worktree in the available local editor, install dependencies with the existing package manager, establish baseline checks, and run a local development preview. Do not claim any setup or opening action succeeded without verifying it.

DISCOVERY AND DESIGN
Inventory actual locale routes, dictionaries, product records, reusable components, server/client locale boundaries, metadata, structured data, forms, sizing data, bag, and checkout. Map V2's content requirements to those surfaces. Reproduce the central issues before assigning causes. A Mongolian product body rendered in English does not by itself prove hardcoded literals; inspect data and fallbacks. Hidden cart content does not prove a mobile-menu bug.

Record the final architecture decisions briefly, then proceed to implementation. Preserve existing product IDs, route compatibility, prices, charge currencies, real integrations, and customer obligations. You may improve content/data/component structure, shared source-of-truth arrangements, and necessary layout behavior when justified. Keep the established visual identity as the baseline and refine readability, wrapping, hierarchy, and consistency as needed.

IMPLEMENT
Use V2's bilingual copy and vocabulary as the working editorial package, adapting wording for the real action/context and correcting obvious issues while preserving meaning. Complete both languages across the homepage, story/about, collection, all actual product pages, contact, size guide, care, shipping/returns, warranty, shared navigation/footer, search, filters, modals, bag, supported checkout states, errors, success messages, accessibility labels, metadata, and affected structured data.

Preserve brand/model identities, including BATU/БАТУ. Do not introduce new product uses, materials, lineage, religious associations, performance guarantees, bespoke fitting, free services, exchange terms, discounts, stock, or shipping capabilities through translation. Prefer dependable actual product data; use V2's restrained fallback only where no reliable description is available. Keep a product-specific missing-facts list outside rendered content.

Trace reviews and determine whether they are product-specific, brand-level, incorrectly mapped, or confirmed sample content. Correct the proven issue and label scope honestly. Do not infer fabricated reviews from repetition or a one-day date shift. Verify timezone and date-only formatting. Do not manufacture defects from stale search snapshots; recheck copyright and mobile behavior.

Unify validated sizing information across views; do not invent numeric conversions. Distinguish preparation/making from transit using established operations. Translate actual support policies without silently changing eligibility, costs, deadlines, or obligations. Forms may show success only after confirmed success. Missing translations must not silently produce an English shopping experience inside Mongolian routes.

PROGRESS WITHOUT INVENTING FACTS
Do not wait for a family interview to fix independent localization, structure, accessibility, and language problems. Use the owner-confirmed family-business-since-1990 anchor and omit optional unsupported story details from the proposed version. Investigate available legitimate records. Group genuinely necessary questions by affected decision, continue independent work, and identify material transactional uncertainty precisely.

VERIFY AND FINISH
Test a representative bilingual product journey end to end, then verify the full route/catalog coverage. Inspect desktop and mobile for both languages, including Cyrillic typography, wrapping, control labels, product-to-bag continuity, fit help, contact/error states, support consistency, and search metadata. Use safe integration test facilities; do not place real orders, make payments, or send live test inquiries as routine validation.

Run required repository checks and relevant tests for the changes. Distinguish pre-existing failures from new failures. Do not stop at an architectural plan: complete the implementable scope and provide a working preview plus a reviewable diff or draft PR through the normal workflow if available.

Deliver: local repository/worktree/branch; preview URL; final architecture decisions; implemented changes; bilingual route/content coverage; checks and results; remaining fact dependencies; any specific release blockers. Mark incomplete items honestly.

Keep work local or in the normal reviewable development workflow. Production deployment is a separate final step; do not deploy production under this instruction.
```

## 11. Source record and practical limits

- Gemini's original report: supplied by Eric as `Pasted text(20261021-031732).txt`.
- Prior architecture: `Domog-Content-Blueprint-v1.md`.
- Session spot-checks: Mongolian homepage, `/mn/products/1`, `/mn/products/2`, and `/mn/size-guide`.
- Dictionary references: listed in section 3.

This package improves the audit and supplies actual editorial material and engineering instructions. It does not assert a completed native-language review, verified product specifications, a cloned repository, a running Claude session, or an implemented website. Claude's next-stage repository and preview checks supply the remaining technical evidence.
