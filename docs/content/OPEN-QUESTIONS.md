# Open questions for Eric and the family

Each question names what it blocks. Everything else in this pass is implemented.

## 1. Ordering and money (blocks a confident order journey)

| # | Question | Today on this branch |
|---|---|---|
| 1.1 | What should the bag charge? It shows $25 shipping under $500 and 8.75% tax, which is what the drawer has always shown. The shipping page lists regional rates ($0–$55), and the old bag page said $45. | Store figures unchanged, labelled as estimates confirmed before payment |
| 1.2 | How do customers pay? The terms say "full payment at order, major credit cards and bank transfers". The site takes no payment: the bag leads to the contact form. | Bag button says "Contact us to order" and prefills the order |
| 1.3 | Is WELCOME10 (10% off a first order) a real offer? HOLIDAY25, FREESHIP and VIP50 also work in the bag. | The popup now shows WELCOME10 as a plain notice (no fake email signup) |
| 1.4 | Are engraving (+$35), gift boxes ($15/$30/$50) and express shipping (+$45, "2–3 business days") real services? | Panel hidden: selections never reached the bag |
| 1.5 | Contact-form delivery (fix 3b in PR #1's plan): which inbox, and will you set up Resend? | Form shows "could not be sent" with your email and phone |

## 2. Catalog (blocks product pages)

| # | Question | Today |
|---|---|---|
| 2.1 | Which of the 15 products are current? Products 7–15 have descriptive English names and AI-generated or reused images. Six have **no image file at all** (IDs 7, 8, 10, 13, 14, 15), so they show broken images on the live site today. | All 15 kept; missing images show "Image unavailable" |
| 2.2 | For each real product: materials, construction, use, availability, and real photos. | Fallback description on every product page; see `PRODUCT-FACTS.md` |
| 2.3 | Are products in stock or made to order? All are flagged in stock; shipping and terms say made to order in 4–8 weeks. | Unchanged |
| 2.4 | Confirm the Mongolian names for products 7–15 (drafts), and whether "Darkhad Shaman Boot" / "Дархад бөөгийн гутал" is appropriate. | Drafts shown |
| 2.5 | Category labels. Is "Luxury" / "Дээд зэрэглэлийн" the right positioning? Is "Heritage" different from "Everyday" and "Ceremonial"? | v2 vocabulary; "Өв уламжлалын" chosen for Heritage so it matches the adjectival form of the other labels |

## 3. Sizing (blocks fit guidance)

| # | Question | Today |
|---|---|---|
| 3.1 | Is the size chart right? The product modal and the size page used to disagree by 1–1.5 US sizes. Both now use the size page's chart. | One chart site-wide, labelled approximate |
| 3.2 | Are the US and UK columns men's, women's or unisex? | Not stated |
| 3.3 | Keep "if between sizes, choose the larger size"? The calculator adds 0.5 cm and rounds ties up to match it. | Kept (existing advice) |

## 4. Policies with conflicts (blocks policy consistency)

| # | Conflict | Today |
|---|---|---|
| 4.1 | The old Our Story page said "If a sole wears through, we replace it." The warranty page excludes sole wear and charges $85–120 for resoling. | Story page no longer makes the promise; warranty page unchanged |
| 4.2 | "Lifetime craftsmanship warranty": whose lifetime, and does it transfer to a new owner? | Unchanged |
| 4.3 | Production time is 4–6 weeks (standard) and 6–8 weeks (bespoke) on the shipping page, but 4–8 weeks in the terms. | Both kept as published |
| 4.4 | When does the 30-day return window start (delivery or dispatch)? | Not stated |
| 4.5 | Saturday 10:00–15:00: by appointment (contact page) or open (footer)? Are visits by appointment only? | Both kept as published |
| 4.6 | Keep "We respond within 24 hours"? The contact form cannot deliver yet. | Kept |
| 4.7 | "Over 50 countries", "insured shipping, full coverage", "free exchanges for sizing", "prepaid label for warranty repairs": all confirmed? | Kept as published |
| 4.8 | The English terms said custom orders can't be cancelled once production starts. The Mongolian version said *all* orders. | Mongolian now matches the English (custom orders) |

## 5. Story and images (blocks a fuller family story)

Blueprint §19, questions 1–6, still apply:
1. Your parents' names.
2. How the business began in 1990.
3. Who does what now.
4. Which work the family does itself.
5. Who buys most often.
6. The real ordering path.

Also needed: real family and product photos. The current hero, home-section and previous About images are AI-generated files; the hero is kept as a product visual only.

## 6. Language review (blocks release of the Mongolian side)

Gemini or the family should review the Mongolian strings in [MN-REVIEW-PACKET.md](MN-REVIEW-PACKET.md), which includes instructions for the reviewer. That covers interface strings v2 did not supply, the rewritten care page, warranty corrections, product names 7–15, and policy-page edits. v2's own Mongolian was used as written.
