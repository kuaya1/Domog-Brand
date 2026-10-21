# Domog bilingual update — architecture decisions

**Branch:** `content/domog-bilingual-blueprint`, built on `fix/live-site-blockers` (PR kuaya1/Domog-Brand#1)
**Inputs:** Handoff v2 (§8 decisions), Blueprint v1, repository evidence. Gemini's original audit file was not available locally; v2's summary of it is the record.

Each decision records the evidence and the choice. "Owner" items are listed in `OPEN-QUESTIONS.md`.

## Reproduced before deciding

| v2 finding | What the repository and rendered pages show | Cause |
|---|---|---|
| Mongolian product pages render English | `/mn/products/*`: entire body, purchase UI, metadata and JSON-LD in English | `ProductDetails` and the product page take no locale; they print `product.name` and `product.description` and hardcoded English. Localized fields existed for products 1–6 but were never read on that page |
| Category labels inconsistent | mn labels `Унах` (bare verb), `Өвөл` (noun) next to adjectival `Баярын`, `Ёслолын` | Hand-written per product in `lib/products.ts` |
| Filters and footer categories differ from product badges | Filters and footer offer Traditional, Daily Wear; products use Riding, Winter, Luxury, Heritage, Everyday | Both were written for the retired 6-product catalog in `lib/data.ts` and never updated. Filtering by them returns nothing |
| Same reviews on several products | Every product showed the same five reviews | `generateMockReviews()` in a block labelled "Mock Data Generator" (added 2025-11-25). Confirmed sample data, already removed in PR #1 |
| Review date differs by one day | `'2024-01-15'` rendered "Jan 14, 2024" locally | Date-only string parsed as UTC midnight, then formatted in local time. A timezone bug, not evidence about authenticity |
| Copyright year differs | Live raw HTML says © 2025; browsers show © 2026 after load | Year computed in the browser on a page whose HTML was generated at build time (Dec 2025) → hydration mismatch |
| Duplicate mobile links | Static HTML contains both desktop and mobile menus; the closed mobile menu is `invisible` and `aria-hidden` | Hidden UI, not a visible duplicate. No change needed beyond labels |
| Size guide "settings" language | `тохиргоо` used for fit on the size page; modal entirely English | Literal translation |
| Contact/workshop labels confusing | mn nav item "Бидний тухай" (About us) links to /contact; "Урлан" (workshop) links to /shop | Mislabelled dictionary entries |

## Decisions

**AD-1 Locale flow.** Keep the existing path-prefixed `/[locale]` routes and middleware. Server components read `params.locale`; client components read it from the path (`useLocale`). `next-intl` is installed but unused; adopting it would be a migration with no customer benefit.

**AD-2 One store for interface and page copy.** `messages/en.json` and `messages/mn.json` hold all shared UI and page copy (navigation, footer, search, collection, product, size and fit, bag, contact, home, story, metadata, errors). `lib/dictionaries.ts` is folded in and deleted. Access is `getMessages(locale)` on the server and `useMessages()` on the client, with `format()` for `{placeholders}` and `plural()` for counts. The Mongolian file is type-checked against the English one, and a test rejects empty strings and mismatched placeholders. There is no silent English fallback: a missing Mongolian key fails the typecheck and the test.

**AD-3 Policy pages keep co-located bilingual text.** Care, shipping, warranty, privacy and terms already hold both languages side by side in the page file. They are edited in place so each policy line can be reviewed with its translation. Policy numbers, eligibility and obligations are unchanged.

**AD-4 Product identity.** `lib/products.ts` stays the catalog. IDs, prices, sizes, images, flags and the English model names are unchanged. Every product now requires a Mongolian name and a category ID. The theatrical descriptions are removed from rendering and from code. Product pages show v2's restrained fallback until verified details exist. The prior claims are kept in `PRODUCT-FACTS.md` for the family to check. Mongolian names for products 7–15 are drafts.

**AD-5 Taxonomy from data.** One category list (`riding`, `festival`, `luxury`, `winter`, `ceremonial`, `heritage`, `everyday`) with labels from the message files, using v2's vocabulary. Filters, footer links, search and badges derive from the categories products actually use. The shop honours `?category=` and `?search=`.

**AD-6 One size source.** `lib/sizing.ts` holds one chart and one calculator, used by the size-guide page and the product modal. The data is the standalone guide's existing chart, pending owner confirmation; no new conversions were generated. Removed: the modal's conflicting chart, its ±0.3 cm "fit preference" offsets, the per-category fit tips, and the unused third system (`lib/fitting.ts`, `FitConfidenceDisplay`). The calculator returns no size outside the chart and points to sizing help.

**AD-7 One bag.** The bag page and nav badge now read the cart that add-to-bag writes (`lib/stores/cart-store.ts`). The legacy `lib/store.ts` and `lib/data.ts` are deleted. Totals come only from the store, so the bag shows the same figures the drawer already showed customers ($25 shipping under $500, 8.75% tax). Whether those figures are right is an owner question. Bag lines show localized names by product ID. The bag's final button says what it does: it opens the contact form with the order prefilled.

**AD-8 Hide non-functional or false commerce UI.**
- Personalization panel hidden: selections never reached the cart, and the services are unconfirmed.
- Newsletter popup kept as a notice of the existing WELCOME10 code, which works in the bag. The fake email capture ("sent to your inbox", email kept only in the browser) is removed.
- Footer newsletter form removed: it had no submit handler.

**AD-9 Metadata and structured data match visible facts.**
- One `SITE_URL` (`https://www.domogbrand.com`, the host production serves). Every page builds its title, description, canonical and `en`/`mn`/`x-default` alternates through one helper.
- Structured data limited to the organization's name, contact details, address and hours as displayed, plus product name, image, price, currency and availability.
- Removed: awards, "presidents/Olympic", the founder placeholder, payment and currency claims, shipping and returns details, the care FAQ, and the AboutPage date.
- The sitemap lists every public page.

**AD-10 Copyright year.** The year is still computed at runtime, but marked `suppressHydrationWarning`, so the visible year is current and React no longer reports a mismatch. Static HTML carries the year of the last deploy.

**AD-11 Tests proportionate to the structural changes.** `npm test` (Node test runner via tsx) covers:
- message parity, empty strings and placeholders;
- catalog localization and category validity;
- sizing data consistency and calculator bounds.

It runs before every build.

**AD-12 Removed dead or public scaffolding.** `component-demo` route, `page-luxury.tsx`, `lib/dictionaries.ts`, `lib/store.ts`, `lib/data.ts`, `lib/fitting.ts`, `FitConfidenceDisplay.tsx`, and `NewsletterPopup.tsx` (replaced by the offer notice). Git history keeps all of them. `ProductCustomization.tsx` is kept, unrendered, in case the services are confirmed.

**AD-13 Size-calculator ties go to the larger size.** The old page rounded ties down while telling customers to size up when between sizes. The shared calculator follows the advice.

## Defects found during verification (pre-existing on the live site, fixed here)

| Defect | Cause | Fix |
|---|---|---|
| Mobile menu opens as an invisible 80px strip; phone visitors cannot navigate. Confirmed on www.domogbrand.com | The menu was inside the `<nav>` bar, whose `backdrop-filter` makes it the containing block for `position: fixed` children | Menu moved outside the bar (`Navigation.tsx`) |
| Primary buttons render with no visible label | `tailwind-merge` read the custom `text-label-lg` size as a colour and dropped `text-cream-50` | `cn()` taught the custom font sizes (`lib/utils.ts`), with a regression test |
| Breadcrumb and bag/shop headers hidden behind the fixed navigation | No offset for the 80px fixed bar on those pages | Top padding on those headers |
| Product card images could stay transparent when no optimized variant existed | The card's fade-in waited for a load event it never received | `onLoad` wired through |

Not fixable without the family: six products reference image files that are not in the repository (`PRODUCT-FACTS.md`). `npm test` reports them as a TODO.

## Verification

- `npx tsc --noEmit`: 0 errors.
- `next lint`: one pre-existing warning in the unused `PatronPassage.tsx`.
- `npm test`: 18 pass, 0 fail, 1 TODO (missing product images). Also runs in `prebuild`.
- `next build`: 59 static pages.
- Production build (`next start`):
  - every route in both languages returns 200;
  - automated scan finds no stray English on any Mongolian route;
  - canonical and hreflang are correct;
  - the sitemap lists 50 URLs on www;
  - the API returns 503 for a valid message and 400 for invalid input;
  - an unknown product ID gets a localized 404.
- Mongolian journey in the browser: size modal → add to bag (toast) → drawer → bag page → "Contact us to order" → order prefilled in the contact form → honest failure with email and phone. Search, filters, footer category links, offer notice and mobile menu were also checked.
- Visual checks at 375px and desktop in both languages, covering the home hero and family section, product page, size guide, story page and mobile menu.
