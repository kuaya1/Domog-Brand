# Domog — Implementation Readiness Report

> **Historical baseline (2026-10-20).** This report records the site before implementation. What was implemented, and why, is in [ARCHITECTURE-DECISIONS.md](ARCHITECTURE-DECISIONS.md), [CONTENT-COVERAGE.md](CONTENT-COVERAGE.md) and [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md). Items B1, B5, B6, B8, B9, B10, B11 and B12 are resolved on this branch. B2 is resolved as an honest failure until email delivery is set up. B3, B4 and B7 are partly resolved; see the open questions.

**Date:** 2026-10-20 · **Stage:** Blueprint v1 received; no reconciled bilingual package yet
**Branch:** `content/domog-bilingual-blueprint` (worktree, nothing committed) · **Source blueprint:** [Domog-Content-Blueprint-v1.md](Domog-Content-Blueprint-v1.md)

No customer-facing code has changed. This document maps the blueprint to the codebase, records existing promises, and lists what blocks implementation.

---

## 1. Environment

| Item | Value |
|---|---|
| Repository | `github.com/kuaya1/Domog-Brand` (public), default branch `main` |
| Production link (verified) | Vercel project `domog-brand` → `www.domogbrand.com` (apex redirects to www). Latest prod deploy = `main@525ec25`, same commit this branch starts from |
| Main checkout | `C:\Users\Kuaya\Work\domog\Domog-Brand` (on `main`, untouched) |
| Worktree | `C:\Users\Kuaya\Work\domog\worktrees\content-domog-bilingual-blueprint` |
| Stack | Next.js 14.2.3 App Router, React 18, Tailwind 3, Zustand, TypeScript; npm (`package-lock.json`); Node 20 locally, 22.x on Vercel |
| Install | `npm ci` — OK (448 packages; `npm audit` reports 28 advisories, untouched) |
| Lint | `npm run lint` OK · `next lint` OK, 1 warning (`components/PatronPassage.tsx:91`, dead file) |
| Typecheck | `npx tsc --noEmit` — OK, 0 errors |
| Build | `npm run build` — OK, 61 static pages. `prebuild` rewrites `lib/generated/image-manifest.json` line endings only; restored |
| Tests | None exist in the repo |
| Dev server | `npm run dev` → **http://localhost:3000/en** and **/mn** — all 28 localized routes + `/api/contact` return 200 |
| Repo instructions | None (no CLAUDE.md/AGENTS.md/CONTRIBUTING). README is the create-next-app default. Root `*.md` files are earlier design notes, not rules |
| Secrets | No `.env` files; only commented-out `RESEND_API_KEY`/`SENDGRID_API_KEY` references |

---

## 2. Release blockers already live on the site (independent of new copy)

These exist on production today (same commit). None were changed. They bear directly on the blueprint's customer-flow and "actions work according to their labels" criteria, so each needs an owner decision before the content pass can be called release-ready.

| # | Problem | Evidence | Customer impact |
|---|---|---|---|
| B1 | **The bag page is always empty.** Add-to-cart writes `lib/stores/cart-store.ts`; `/cart` and the nav badge read the legacy `lib/store.ts` | [cart/page.tsx:7](../../app/[locale]/cart/page.tsx), [Navigation.tsx:6](../../components/Navigation.tsx) vs [ProductDetails.tsx:5](../../app/[locale]/products/[id]/ProductDetails.tsx). Reproduced locally: drawer shows TENGER $340.38, `/en/cart` shows "The Workshop Awaits" | The only path from the bag to an order inquiry is unreachable with items in it |
| B2 | **Contact form reports success without delivering anything.** API validates, `console.log`s, returns a fake `DOM-…` reference. No email, no storage | [api/contact/route.ts:69,115](../../app/api/contact/route.ts) | Every inquiry (including orders) only lands in short-lived Vercel runtime logs while the page promises a reply within 24 hours |
| B3 | **No checkout or payment exists.** "Complete Your Commission" links to `/contact?inquiry=order`; cart contents are not carried into the form | [cart/page.tsx:197](../../app/[locale]/cart/page.tsx) | The bag shows tax, promo codes, and totals for a purchase that cannot happen |
| B4 | **Two different totals for one cart.** Drawer: $25 flat shipping + 8.75% tax. Bag page: $45 flat, no tax. Shipping page: regional table ($0–$55). Product JSON-LD: $0 | `cart-store.ts:123-125`, `cart/page.tsx:20`, `shipping/page.tsx:160-188` | Contradictory charges at the order decision |
| B5 | **Personalization charges are dropped.** Engraving (+$35), gift wrap, express (+$45) never reach the cart | `ProductDetails.tsx:54-82` | Customer selects a paid option that is silently discarded |
| B6 | **Fabricated reviews.** The same five named "Verified Purchase" reviews (with a "Domog Team" reply) render on every product; JSON-LD claims 4.9★ from 127 reviews on every product | [ProductReviews.tsx:49-125](../../components/ProductReviews.tsx), [products/[id]/page.tsx:168-174](../../app/[locale]/products/[id]/page.tsx) | Misleading to customers; violates Google's review-snippet policy and US FTC rules on fake reviews (2024) |
| B7 | **Newsletter popup claims the WELCOME10 code "has been sent to your inbox."** Email is stored only in the visitor's browser. Footer newsletter form has no handler | `NewsletterPopup.tsx:183-232`, `Footer.tsx:123-135` | False confirmation; no subscriber list exists |
| B8 | **BATU ($520) is hidden from the default collection view.** Price filter defaults to max $500 | `shop/page.tsx:30` — verified: 14 of 15 products shown | One real product is invisible unless the visitor moves the slider |
| B9 | **Size-guide modal blocks add-to-bag.** It passes `"EU 42"` where the product expects `"42"`; no size highlights and the cart rejects the add (`cart-store.ts:184`). Verified locally: modal path → 0 items; size button → 1 item. Availability check also offers EU 36/37 on TENGER (sizes 40–45) via substring match | `SizeGuide.tsx:226-251,392` | A customer who uses fit help cannot add the pair |
| B10 | **Search and category links go nowhere.** Footer links to `?category=Traditional`/`Daily Wear` (not real categories); shop ignores `?category` and `?search` | `Footer.tsx:55-59`, `SmartSearch.tsx:227` | Dead navigation |
| B11 | **Canonicals point to the home page** for shop, cart, shipping, warranty, privacy, terms, size-guide (inherited from layout). All URLs use apex `domogbrand.com`, production serves `www` | `app/[locale]/layout.tsx:128-135` | Search engines may drop these pages; blueprint §15 requires stable, correct canonicals |
| B12 | **Public demo route** `/en/component-demo`, `/mn/component-demo` | `app/[locale]/component-demo/page.tsx` | Internal page indexable |

---

## 3. How text is stored today (what the content package must target)

Three localization mechanisms coexist. The blueprint says to use the existing approach, not add a library (`next-intl` is installed but unused).

| Mechanism | Used by | Notes |
|---|---|---|
| `messages/en.json` + `messages/mn.json` via `lib/i18n/translations.ts` `getNamespace()` | Home, About, Shop hero, Contact, Bag page | `mn` typed as `typeof en`. **No per-key fallback:** a key missing in mn renders blank. Namespaces `common`, `navigation`, `product`, `cart`, `footer` are unused. mn-only `products` namespace is unused and differs from the mn copy in `lib/products.ts` |
| `lib/dictionaries.ts` (typed interfaces) | Navigation, Footer, CartDrawer, ProductCard | Passed from `app/[locale]/layout.tsx` |
| Inline `locale === 'mn' ? … : …` / `{en, mn}` objects | Care, Size guide, Shipping, Warranty, Privacy, Terms, layout metadata, breadcrumbs | Mongolian is present but embedded in JSX |
| **Hardcoded English only** | **Entire product page** (`ProductDetails.tsx`, `products/[id]/page.tsx`, metadata), ProductGrid (shop cards), ProductFilters, ProductSort, ProductRecommendations, SmartSearch, SizeGuide modal, ProductCustomization, ProductReviews, NewsletterPopup, CartDrawer toasts, shop empty state, cart-store errors, "Skip to main content", all JSON-LD | `/mn/products/*` is fully English today (verified in browser) |

**Locale facts:** codes `en` (default) and `mn`; Cyrillic only; path-prefixed routes; middleware redirects by `Accept-Language`. Fonts load Latin + Cyrillic subsets; Cyrillic renders cleanly at 375px (checked `/mn`). This matches the blueprint's working assumption (§12): modern Cyrillic, no new locales.

**Recommended landing format for the reconciled package** (no new library):
- **Page and UI copy** → `messages/{en,mn}.json`, one namespace per route (`home`, `family`, `shop`, `product`, `contact`, `sizeFit`, `care`, `shipping`, `warranty`, `bag`, `legal`), keys derived from the package's stable IDs (`home.hero.title` → `home.hero_title`). Support pages move from inline ternaries into messages as their copy is replaced, which costs nothing extra since every string is being rewritten anyway.
- **Shared chrome** (nav, footer, drawer, card) → keep `lib/dictionaries.ts`; its typed interfaces already enforce en/mn parity at compile time.
- **Product facts** → `lib/products.ts`. The `Product` type needs new localized fields for the blueprint §10 table (materials, construction, height/fit, use, availability state, timing, care, cultural note); today it has only name, description, category, price, sizes, `inStock`, `isNew`.
- **Add a parity check** (script or build step) so a missing mn key fails the build instead of rendering blank. This satisfies blueprint §13 ("a missing translation must not silently become a placeholder").

---

## 4. Route map

All blueprint routes already exist; no new routes are required (§6).

| Blueprint page | Route | Files | Text source | MN today | Blueprint § |
|---|---|---|---|---|---|
| Home | `/[locale]` | `app/[locale]/page.tsx` | messages `home` | Complete | 8 |
| Collection | `/[locale]/shop` | `shop/page.tsx`, `ProductGrid`, `ProductFilters`, `ProductSort` | messages `shop` + hardcoded | Hero only; cards, filters, sort, empty state English | 10 |
| Product | `/[locale]/products/[id]` (ids 1–15) | `products/[id]/page.tsx`, `ProductDetails.tsx`, `SizeGuide`, `ProductCustomization`, `ProductReviews`, `ProductRecommendations`, `lib/products.ts` | Hardcoded + product data | **None** | 10, 11 |
| Our Family | `/[locale]/about` | `about/page.tsx`, `lib/seo/metadata.ts:226` | messages `about` | Complete (1 English line) | 9 |
| Visit & Contact | `/[locale]/contact` | `contact/page.tsx`, `contact/layout.tsx`, `api/contact/route.ts` | messages `contact` + hardcoded address | Mostly; address English | 11 |
| Size & Fit | `/[locale]/size-guide` | `size-guide/SizeGuideContent.tsx`; modal `components/SizeGuide.tsx` | Inline / modal hardcoded | Page complete; modal none | 11 |
| Care | `/[locale]/care` | `care/CareContent.tsx` | Inline | Complete (one meaning error, §6) | 11 |
| Shipping & Returns | `/[locale]/shipping` | `shipping/page.tsx` | Inline | Complete | 11 |
| Warranty | `/[locale]/warranty` | `warranty/page.tsx` | Inline | Complete, weak wording (e.g. "тоолуур" for buckle) | 11 |
| Bag | `/[locale]/cart` + drawer | `cart/page.tsx`, `CartDrawer.tsx`, `lib/stores/cart-store.ts` | messages `cartPage` + dictionaries `cart` | Partial ("reserved" English; "pairs reserved reserved" bug) | 6, 7 |
| Privacy / Terms | `/[locale]/privacy`, `/terms` | `privacy/page.tsx`, `terms/page.tsx` | Inline | Partial (date, address English) | 6 |
| Shared chrome | all | `Navigation.tsx`, `Footer.tsx`, `LanguageSwitcher.tsx`, `NewsletterPopup.tsx`, `layout.tsx` | dictionaries + hardcoded | Visible labels yes; popup none | 5, 8 (H08) |
| Metadata / JSON-LD | all | `layout.tsx`, `lib/seo/metadata.ts`, `lib/seo/structured-data.ts`, `products/[id]/page.tsx`, `app/sitemap.ts`, `public/robots.txt` | Inline | Titles partly; JSON-LD English only | 15 |

---

## 5. Blueprint content IDs → implementation locations

### Homepage (§8)

| ID | Blueprint section | Current equivalent | Location | Gap |
|---|---|---|---|---|
| H01 | Introduction: eyebrow, H1, body, 2 CTAs, real image | Hero: `tagline`, `hero_title`, `hero_description`, one CTA → shop | `page.tsx:35-89`; `messages.home` | Needs a second CTA → `/about` (small layout change). Hero image is an AI-generated file (`Generated Image November 23, 2025…png`) |
| H02 | Collection: heading, 1 sentence, real cards, `View details` | Featured grid, first 6 of `products` | `page.tsx:92-120`; `ProductCard.tsx`; `dictionaries.productCard.view_details` ("Study This Pair") | `collection_description` exists in JSON but is not rendered. Card shows name, category, price; blueprint wants one distinguishing fact per pair (new product field) |
| H03 | The family: names, contributions, named portrait | Dark "heritage" section: `heritage_*` | `page.tsx:123-219` | Background images are AI-generated "workshop atmosphere". Needs family facts (§19 Q1–3) and a real photo |
| H04 | How the work is done: 3 confirmed modules | "Promise" pillars `pillar_1..3` | `page.tsx:222-275` | Structure fits (3 modules). Keep out of publishable draft until process facts arrive (§8 rule) |
| H05 | Boots in use | — | — | New section; optional; needs documented photo + permission |
| H06 | Choosing & ordering (3 steps) | — | — | New section; blocked on ordering-path decision (D1) |
| H07 | Care & continued use | — | — | New section; links to `/care` |
| H08 | Contact & footer | Footer + newsletter popup | `Footer.tsx`, `dictionaries.footer`, `NewsletterPopup.tsx`, layout mount `layout.tsx:179` | Footer descriptor, verified contact, support links exist. Newsletter and discount popup blocked on D5/D8 |

### Our Family (§9)
Current page (`about/page.tsx`, `messages.about`, 31 keys) is a six-part manifesto: steppe vs. Italian ateliers, Furlan Marri (a real third-party watch brand), "My Father's Hands", lifetime promise, invitation. **The mother does not appear anywhere on the site.** The blueprint's 7-part narrative replaces the content; the existing section components (label/title/paragraphs/image) can carry it. Fixed image heights (`h-[650px]`, `h-[468px]`/`h-[510px]`) and a `lg:w-2/5` display-size title need checking against longer Mongolian copy. Images at `about/page.tsx:60,82,186` are AI-generated files.

### Collection & product (§10)
- 15 products in `lib/products.ts`. **Ids 1–6** (TENGER, NAADAM, ALTAN, ALTAI, ANU, BATU) have en/mn names and descriptions. **Ids 7–15** (Gobi Desert, Tuul River, Tsagaan Sar, Khövsgöl Lake, Ger Artisan, Morin Khuur, Takhi, Darkhad Shaman, Orkhon Valley) have English only, mostly AI-generated or reused images (id 11 reuses TENGER's photo, id 12 reuses ALTAI's), and claims such as "blessed by a local shaman" and "family formula for five generations." **The family needs to confirm which products are real** before any copy is written (blueprint §10: "do not create an appearance of stock, variety, or demand").
- Categories: 7 defined (`productCategories`), with marketing descriptions. Footer and filters also reference legacy categories from `lib/data.ts` (old 6-product catalog, otherwise dead).
- All products `inStock: true`; availability has no "made after order"/"custom" state.
- `productCard` CTA "Study This Pair", product CTA "Commission This Pair" (adds to bag). Blueprint vocabulary: `View details` / `Add to bag` or `Ask about this pair`, depending on D1.

### Support pages (§11)
Size guide, care, shipping, warranty: content is inline; each will be rewritten from the fact record. Sizing has **two conflicting charts and two calculators** (page vs. modal disagree by 1–1.5 US sizes above EU 39; a 24.0 cm foot gets EU 39 on the page, EU 38 in the modal). Neither says men's/women's. `lib/fitting.ts` and `FitConfidenceDisplay.tsx` are a third, unused system.

### UI vocabulary (§5)
| Purpose | Current EN / MN | Location |
|---|---|---|
| Nav: Collection · Our Family · Visit & Contact | Shop / Урлан · Heritage / Өв Соёл · Atelier / **Бидний Тухай** (means "About us" but links to /contact) | `dictionaries.ts:107-120, 186-199` |
| Card CTA | Study This Pair / Дэлгэрэнгүй | `dictionaries.productCard.view_details`; ProductGrid hardcodes it at `:59` |
| Product action | Commission This Pair (hardcoded) | `ProductDetails.tsx:203` |
| Sizing | Find Your Fit / Size Guide (hardcoded) | `ProductDetails.tsx:154,161` |
| Bag action | Complete Your Commission / Захиалгаа баталгаажуулах | `dictionaries.cart.checkout`, `messages.cartPage.checkout` |

---

## 6. Record of current public promises (preserve before rewriting)

Per blueprint §3 and §11, these are what the live site currently tells customers. Contradictions are marked ⚠.

| Claim | What the site says | Where |
|---|---|---|
| C01 Founding | Father opened a workshop in Ulaanbaatar in 1990; "35 years" (stale since 2026) | `messages/*.json about.master_*`; `metadata.ts:230,234,339`; `structured-data.ts:28+`; founder schema name is placeholder "Master Craftsman" |
| C02 Craft | 40 hours per pair; hand-lasted, hand-stitched; three inspection stages; vegetable-tanned. ⚠ Care page EN "tanned over weeks, not hours" vs MN "not weeks but months/years" (`CareContent.tsx:49-50`) | home pillars, shop hero, `ProductDetails.tsx:231`, `shipping/page.tsx:127` |
| C03 Customers | "Presidents have worn our work. Champions have competed in it." ⚠ Metadata/schema escalate to "Olympic champions"; schema "awards" | `messages home.heritage_p3`, `about.master_p3`; `metadata.ts:234`; `structured-data.ts:28,66-69` |
| C04 Lineage | "eight generations" (ANU), shaman blessing (BATU), Italian/Swiss (Furlan Marri) influence; EN-only apprenticeship claim | `lib/products.ts`; `messages about.*` |
| C05 Durability | −40° performance (TENGER, ALTAI); "last forty years"; zero break-in (NAADAM). ⚠ Break-in: "brief" / "60–90 days" / "years" | `lib/products.ts`; `shipping:127`; `SizeGuide:55`; `fitting.ts:15` |
| C06 Timing | Production 4–6 wks, bespoke 6–8 wks (shipping) vs 4–8 wks (terms). ⚠ Product JSON-LD: handling 5–10 days, transit 7–14, US only. Express "2–3 business days" (+$45) vs regional express table | `shipping:112-120`; `terms:72`; `products/[id]/page.tsx:145-166` |
| C06 Shipping cost | Free over $500; regional table (Mongolia free … RoW $55). ⚠ Drawer $25 + 8.75% tax; bag $45; schema $0 | see B4 |
| C07 Returns | 30 days, unworn; free size exchanges; full refund; bespoke/worn/sale excluded. No start date for the 30 days. ⚠ Schema says free returns, US only | `shipping:217-237`; `cartPage.returns_note`; `structured-data.ts:235` |
| C07 Warranty | "Lifetime craftsmanship warranty." ⚠ About page: "If a sole wears through, we replace it" vs warranty page excludes sole wear and charges $85–120 resoling, $150–200 refurbishment; 48-hour claim review; prepaid label | `about.promise_*`; `warranty/page.tsx:41,137,159-192` |
| C08 Reviews | See B6 | |
| C09 Sizing | EU sold; "if between sizes, size up" (page) vs per-category tips (modal) | `SizeGuideContent.tsx:180`; `SizeGuide.tsx:48-60` |
| C10 Contact | Khan-Uul District, 15th Khoroo, Ulaanbaatar; +976 9919-9462; domogbrand@gmail.com; Mon–Fri 09–18, Sat 10–15 (⚠ schema 16:00); visits by appointment; "reply within 24 hours"; payment "cards and bank transfer" (⚠ none implemented); USD only | `contact/page.tsx:110-124`; `Footer.tsx:93-97`; `structured-data.ts:41-116`; `terms:74-83` |

Git history preserves the full prior text; this table is the working summary.

---

## 7. Decisions needed before implementation

Blueprint §19 lists six family questions. The codebase adds these, roughly in order of what blocks the most work:

| ID | Decision | Blocks |
|---|---|---|
| D1 | **Real ordering path:** inquiry-first (`Ask about this pair` → working contact) or a real checkout (needs a payment provider, out of scope for a content pass). Today's UI implies checkout but ends in an inquiry. | Product action label, bag page, H06, shipping/tax display, B1/B3/B4 |
| D2 | **Where inquiries should go** (e.g. email to domogbrand@gmail.com via Resend; needs Eric's API key as a Vercel env var), or an alternative channel to show instead of a form | Contact page, B2, every "ask" CTA |
| D3 | **Which of the 15 products are real**, with names, prices, sizes, availability | Collection, product pages, H02, sitemap |
| D4 | Remove fabricated reviews and the 4.9/127 rating until real ones exist? | Product pages, JSON-LD |
| D5 | Keep the WELCOME10 popup and hardcoded promo codes (WELCOME10, HOLIDAY25, FREESHIP, VIP50)? | H08, bag |
| D6 | Actual shipping rates, whether tax applies (8.75% looks like a placeholder US rate), currency (USD only? MNT for local customers?) | Bag, shipping page, product timing block |
| D7 | One size system (and men's/women's) | Size & Fit page, modal, product options |
| D8 | Is there a real newsletter? | Footer, popup |
| D9 | Canonical host: `www.domogbrand.com` (what production serves) | All metadata, sitemap, robots |
| D10 | Family photos to replace AI-generated hero, heritage, and about images (blueprint §14) | H01, H03, Our Family |

---

## 8. What can proceed without final copy

Reversible and invisible to customers; each needs Eric's go-ahead because it changes code:

1. **Parity guard** for `messages/*.json` and `dictionaries.ts` (build fails on a missing mn key).
2. **String extraction:** move the hardcoded English UI strings listed in §3 into messages/dictionaries with current English values unchanged, and wire the `locale` prop through the product page, shop grid, filters, sort, modal, drawer, and popup. This produces the exact list of UI strings Gemini must translate.
3. **Product schema extension:** add optional localized fields for the §10 product table, with no rendering change until data arrives.

Functional fixes for B1–B12 change live behavior and touch money flows, so they need a plan and approval. They should land on their own branch, ahead of or alongside the content release, not mixed into copy commits.

## 9. Implementation sequence once the package arrives

Matches blueprint §18 stage 5:
1. Home + Our Family + one representative product (TENGER, id 1), en/mn, desktop + mobile check.
2. Collection + remaining confirmed products.
3. Support pages (size & fit, care, shipping & returns, warranty), one consistent fact set.
4. Transactional UI (bag, drawer, contact states, errors, success) per D1/D2.
5. Metadata, JSON-LD, sitemap per D9; remove unsupported claims (ratings, awards, "Olympic").
6. Verification: lint, typecheck, build, full en/mn journeys at 375px and desktop, no placeholders rendered, route/content-ID coverage table.

No production deploy under this branch.
