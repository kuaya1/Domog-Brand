# Bilingual coverage map

Branch `content/domog-bilingual-blueprint`. Checked against a production build (`next build && next start`), English and Mongolian, desktop and 375px mobile.

## Routes

| Route (`/en`, `/mn`) | Where the text lives | Mongolian | Metadata and structured data | Notes |
|---|---|---|---|---|
| Home `/` | `messages.home` (v2 H01–H05) | Complete | Own canonical, hreflang en/mn/x-default | Family section no longer sits on an AI-generated "workshop" image |
| Collection `/shop` | `messages.collection`, `categories` | Complete | `shop/layout.tsx` | Honours `?category=` and `?search=`; filters come from the catalog |
| Product `/products/[id]` (×15) | `messages.product`, `lib/products.ts` | Complete (names 7–15 are drafts) | Product schema: name, image, price, USD, availability. Breadcrumb | Fallback description; personalization panel hidden; support links |
| Our story `/about` | `messages.story` | Complete | Breadcrumb | Short, owner-confirmed facts only |
| Visit & contact `/contact` | `messages.contact` | Complete | `contact/layout.tsx` | Prefills from the bag (`?inquiry=order`) and products (`?product=`); fails honestly without delivery |
| Size guide `/size-guide` | `messages.fit`, `lib/sizing.ts` | Complete | Breadcrumb | Same chart and calculator as the product modal |
| Care `/care` | Co-located `{en, mn}` in `CareContent.tsx` | Complete (draft) | Breadcrumb | Instructions kept; unverified claims removed |
| Shipping & returns `/shipping` | Co-located in `page.tsx` | Complete | Breadcrumb | Figures unchanged; production vs transit labelled |
| Warranty `/warranty` | Co-located in `page.tsx` | Complete | Breadcrumb | Terms unchanged; Mongolian corrections |
| Bag `/cart` | `messages.bag` | Complete | `noindex` | Reads the real cart |
| Privacy, Terms | Co-located, shared `LegalPage` | Complete | Breadcrumb | Text unchanged; dates and address localized |
| Not found | `messages.notFound` | Complete | — | `app/[locale]/not-found.tsx` |

Automated check: the server-rendered HTML of all 26 Mongolian routes contains no Latin-script words except brand and system tokens (DOMOG, EU/US/UK, USD, Instagram/Facebook, the "English" toggle, the email address, and the care products' brand names). Client-only UI was checked in the browser: drawer, search, size modal, offer notice, toasts, mobile menu, bag, and contact states.

## Shared components

All read from `messages/*.json` through `useMessages()`:
- Navigation (desktop and mobile)
- Footer
- LanguageSwitcher (keeps query and hash)
- SmartSearch (matches both languages)
- CartDrawer and promo codes
- OfferNotice
- ProductCard, ProductGrid, ProductFilters, ProductSort
- ProductRecommendations
- ImageGallery, SizeSelector, QuantitySelector, SizeGuide modal
- ToastProvider
- ProductGridErrorFallback

Accessible names, `alt` text and error states are localized too.

## Where the Mongolian comes from

- **From v2, used as written:**
  - home `H01`–`H05`;
  - nav `collection`/`story`/`contact`/`bag`;
  - search placeholder, action and empty result;
  - collection title, all, filter, sort and sort options, price;
  - product view, new, size & fit, size guide, choose size, size required, quantity, increase/decrease, add to bag, ask, related, image controls, fallback description;
  - fit title, intro, chart, calculate, help, foot length, the five measuring steps;
  - bag title, empty states, continue, remove, subtotal, shipping, total;
  - contact field labels, optional, send, sending, success;
  - footer column titles and descriptor;
  - category labels;
  - close, retry, generic error, skip link, "Home".
- **Adapted from v2:**
  - `categories.heritage` uses "Өв уламжлалын" (adjectival, like the other labels) instead of "Өв уламжлал";
  - `contact.errorUnavailable` uses v2's failure wording but points to email and phone, since retrying cannot work yet;
  - the Our Story page is assembled from v2's home sentences.
- **Existing site Mongolian, corrected:**
  - shipping, warranty (buckle "горхи", suffix spacing), privacy and terms text;
  - terms §2 now limits non-cancellation to custom orders, as the English does.
- **Claude drafts, needing review:** every other key in `messages/mn.json`, including all of `meta`, `offer`, `notFound` and the toasts and validation messages; the whole care page; and Mongolian names for products 7–15.
