# Product facts and missing fields

Internal record. Nothing in this file is rendered on the site.

**What the site shows now.** Each product page shows its name, style, price (USD), EU sizes, images, and v2's restrained fallback description: "Explore {model}. Check the size options and contact us…" in both languages. The prior descriptions were removed because none of their claims is confirmed. The verbatim prior text is in git at `525ec25:lib/products.ts`.

**What each product still needs before its page is complete:**
- Confirmation that the product is current.
- Materials (upper, lining, sole).
- Construction and where the work is done.
- Use or occasion.
- Availability (in stock, made after order, or custom).
- Real photos.

Each prior claim below should be confirmed, corrected, or dropped.

## Products 1–6 (named models)

| ID | Model (en / mn) | Style | Price | Sizes (EU) | Images | Claims removed from the page |
|---|---|---|---|---|---|---|
| 1 | TENGER / ТЭНГЭР | Riding | $290 | 40–45 | 4, present | Triple-reinforced leather soles; grip at −40°; hand-felted wool lining; "our founder tested these across 400 km of steppe" |
| 6 | NAADAM / НААДАМ | Festival | $380 | 38–43 | 4, present | Flexible sole for wrestling and archery; "sacred" upturned toe; "Olympic champions have trusted these"; zero break-in |
| 2 | ALTAN / АЛТАН | Luxury | $420 | 40–44 | 1 photo repeated 4× | 40-hour build; gold thread in constellation patterns; single-hide calf leather; "only twelve pairs a year" |
| 4 | ALTAI / АЛТАЙ | Winter | $320 | 38–42 | 4, present | Double-walled construction; yak-wool insulation; soles flex at −40°; embroidery "of mountain spirits" |
| 3 | ANU / АНУ | Ceremonial | $450 | 39–44 | 4, present | Vegetable-tanned cowhide; techniques "unchanged for eight generations"; silver inlay of the "eternal flame"; worn by presidents and heads of state |
| 5 | BATU / БАТУ | Luxury | $520 | 39–44 | 4, present | Named for the mountain where Temüjin became Genghis Khan; hand-tooled peaks; "blessed by a local shaman before shipping"; ancient mineral curing |

## Products 7–15 (descriptive names)

These have English descriptive names and no Mongolian copy before this pass. **The Mongolian names below are drafts.** Six of them reference image files that do not exist in the repository, so their images are broken on the live site today.

| ID | Model (en / draft mn) | Style | Price | Sizes (EU) | Image | Claims removed from the page |
|---|---|---|---|---|---|---|
| 7 | Gobi Desert Boot / Говь цөлийн гутал | Everyday | $340 | 38–44 | **Missing file** | Breathability; resists Gobi temperature swings; reinforced stitching |
| 8 | Tuul River Boot / Туул голын гутал | Everyday | $310 | 38–43 | **Missing file** | Wave stitching "channels moisture away" |
| 9 | Tsagaan Sar Celebration Boot / Цагаан сарын баярын гутал | Ceremonial | $390 | 38–43 | Present (AI-generated file name) | White leather symbolism; silver embroidery of "three precious gifts" |
| 10 | Khövsgöl Lake Boot / Хөвсгөл нуурын гутал | Heritage | $360 | 39–44 | **Missing file** | Water-resistant "family formula passed down for five generations" |
| 11 | Ger Artisan Boot / Гэрийн урлаачийн гутал | Everyday | $275 | 38–45 | Reuses TENGER's photo | Triple-stitched seams; hand-lasted soles; "decades, not seasons" |
| 12 | Morin Khuur Performer Boot / Морин хуурчийн гутал | Heritage | $410 | 38–43 | Reuses ALTAI's photo | "Designed in collaboration with masters of the horsehead fiddle"; posture heel |
| 13 | Takhi Wild Horse Boot / Тахь адууны гутал | Riding | $380 | 39–45 | **Missing file** | Coat-pattern leather; "tested by professional riders" |
| 14 | Darkhad Shaman Boot / Дархад бөөгийн гутал | Ceremonial | $480 | 39–43 | **Missing file** | "Created with the guidance" of the Darkhad people; protection symbols; "grows stronger with ritual use"; made only to order |
| 15 | Orkhon Valley Heritage Boot / Орхоны хөндийн өв уламжлалт гутал | Heritage | $440 | 39–44 | **Missing file** (shares #8's) | "Historical precision" reproduction of Mongol Empire administrators' boots; brass hardware; cognac leather |

Notes:
- **Product 14's name needs a culture-sensitivity check** (v2 §3). The name is kept unchanged because model identity is preserved.
- **Every product is flagged "in stock".** The shipping page and terms describe work as made to order (4–6 or 4–8 weeks). That needs one answer.
- `npm test` reports the missing image files as a TODO on every run until real photos are added.
