# DOMOG BRAND — SEO ARCHITECTURE DOCUMENTATION

## 🎯 SEO Strategy Overview

### The Luxury SEO Paradox
Domog Brand requires **qualified traffic, not maximum traffic**. Our SEO strategy targets collectors, diplomats, cultural patrons, and discerning buyers seeking authentic Mongolian heritage footwear—not bargain hunters.

**Core Principle:** *Every page should feel like it deserves to be found.*

---

## 📊 Technical SEO Implementation Status

### ✅ Completed

#### Site Architecture
- **URL Structure:** Clean, locale-prefixed paths (`/en/products/1`, `/mn/about`)
- **Hierarchy:** Home → Shop/About/Care/Contact → Products
- **Internal Linking:** Navigation, footer, product recommendations, breadcrumbs

#### Indexability
- **robots.txt:** Configured with sitemap reference, bot-specific rules
- **XML Sitemap:** Auto-generated with locale alternates for all pages
- **Canonical URLs:** Set via Next.js metadata `alternates.canonical`
- **Hreflang:** Properly configured for en/mn with x-default

#### Page Speed (Estimated)
- Server-side rendering for all public pages
- Dynamic imports for non-critical components (CartDrawer, SmartSearch, NewsletterPopup)
- Image optimization via AVIF format
- Font optimization with `display: swap`

#### Structured Data (JSON-LD)
- **Organization Schema:** Company info, founding date, awards, social profiles
- **LocalBusiness Schema:** Atelier location with coordinates, hours, contact
- **Website Schema:** With SearchAction for site search
- **Product Schema:** Full product details with offers, shipping, returns
- **BreadcrumbList Schema:** On all pages
- **FAQPage Schema:** On Care page
- **AboutPage Schema:** On Heritage page

---

## 🔑 Keyword Strategy

### Primary Keywords (High Intent, Lower Volume)

| Keyword | Est. Monthly Search | Intent | Target Page |
|---------|---------------------|--------|-------------|
| Mongolian boots | 500-1000 | Transactional | Shop |
| handcrafted Mongolian boots | 50-100 | Transactional | Homepage, Shop |
| traditional Mongolian footwear | 100-200 | Informational | About |
| Mongolian leather boots | 200-400 | Transactional | Shop |
| Монгол гутал | 2000+ (MN) | Transactional | Shop (mn) |

### Secondary Keywords (Long-tail, High Quality)

| Keyword | Intent | Target Page |
|---------|--------|-------------|
| luxury Mongolian boots | Transactional | Homepage |
| Mongolian riding boots | Transactional | Shop (Category) |
| traditional Mongolian craftsman | Informational | About |
| how to care for Mongolian leather boots | Informational | Care |
| Mongolian bootmaker Ulaanbaatar | Local | Contact |
| custom Mongolian boots | Transactional | Contact, Products |
| vegetable tanned leather boots Mongolia | Transactional | Products |
| heritage footwear Mongolia | Brand Awareness | About |
| Mongolian ceremonial boots | Transactional | Shop (Category) |
| buy traditional Mongolian boots online | Transactional | Shop |

### Branded Keywords

- Domog Brand
- Домог Брэнд
- Domog boots
- Domog Mongolia

### Competitor-Adjacent Keywords

- John Lobb alternatives
- Berluti competitors
- Edward Green vs (positioning content)
- artisan bootmakers similar to Gaziano & Girling

---

## 📄 On-Page SEO Implementation

### Title Tag Templates

**Homepage:**
```
Domog Brand | Handcrafted Mongolian Boots Since 1990
```

**Shop Page:**
```
Shop Traditional Mongolian Boots | Handcrafted Heritage Footwear | Domog
```

**Product Pages:**
```
{Product Name} - {Category} Boots | Handcrafted in Mongolia | Domog
```

**About:**
```
Our Heritage | 35 Years of Mongolian Bootmaking | Domog Brand
```

**Care:**
```
Leather Boot Care Guide | How to Care for Mongolian Boots | Domog
```

**Contact:**
```
Visit Our Atelier | Contact Domog Brand | Ulaanbaatar, Mongolia
```

### Meta Description Best Practices

- 150-160 characters
- Include primary keyword naturally
- Add emotional/value hook
- Include call-to-action where appropriate
- For products: Include price range for qualified intent

### Heading Structure (Audit Checklist)

✅ Each page has exactly one H1
✅ H1 contains primary keyword
✅ H2-H6 follow logical hierarchy
✅ Headings describe content accurately

---

## 📝 Content SEO Roadmap

### Existing Content Optimization

| Page | Current Status | Recommended Action |
|------|----------------|-------------------|
| Homepage | Good | Add heritage story section with keywords |
| Shop | Basic | Add category intro text above products |
| Products | Good | Ensure craft story is keyword-rich |
| About | Good | Add more craft process details |
| Care | Excellent | Consider adding video content |
| Contact | Basic | Add "Why Visit" content section |

### Content Gap Opportunities

#### High Priority (Create These Pages)

1. **Size Guide Page** (`/size-guide`)
   - Current: Modal component
   - Recommended: Dedicated page with comprehensive fitting guidance
   - Keywords: "Mongolian boot sizing", "how to measure feet for boots"

2. **Our Craft Page** (`/craft`)
   - Deep dive into 40+ hour creation process
   - Keywords: "Mongolian bootmaking process", "vegetable tanning leather Mongolia"
   - Include video/photo content

3. **Materials Page** (`/materials`)
   - Detailed material sourcing story
   - Keywords: "Mongolian leather quality", "where do Mongolian boots come from"

4. **FAQ Page** (`/faq`)
   - Consolidate common questions
   - Structured data for featured snippets
   - Keywords: Various question-based queries

#### Medium Priority (Blog/Content Hub)

**Editorial Calendar Framework (First 6 Months):**

| Month | Topic | Keywords Target |
|-------|-------|-----------------|
| 1 | "The Art of Mongolian Bootmaking: A 35-Year Journey" | Mongolian bootmaking, traditional craftsmanship |
| 2 | "Understanding Vegetable-Tanned Leather" | vegetable tanned leather, leather types boots |
| 3 | "How Mongolian Nomadic Culture Shaped Our Boots" | Mongolian nomadic boots, steppe culture footwear |
| 4 | "Care Guide: Making Your Boots Last Generations" | leather boot care, how to maintain leather boots |
| 5 | "The Presidents and Champions Who Wear Domog" | (PR/Social Proof) |
| 6 | "Riding Boots vs. Ceremonial Boots: A Guide" | Mongolian riding boots, ceremonial boots Mongolia |

---

## 🔗 Off-Page SEO Strategy

### Link Building Prospects

#### Tier 1: Heritage & Craft Publications
- Permanent Style (menswear/shoes)
- The Rake (luxury lifestyle)
- Hodinkee (collectors/craftsmanship)
- Craftsmanship Magazine
- Heddels (heritage brands)

**Outreach Angle:** "35-year family-run Mongolian atelier making boots for presidents—story pitch for heritage craft feature"

#### Tier 2: Travel & Culture
- National Geographic Traveler
- Condé Nast Traveler
- Atlas Obscura
- Culture Trip

**Outreach Angle:** "The last traditional bootmakers of Mongolia—cultural preservation story"

#### Tier 3: Fashion/Luxury
- Mr. Porter Journal
- Styleforum
- Die Workwear
- Put This On

**Outreach Angle:** "Why collectors are looking to Mongolia for the next John Lobb"

### Local SEO Checklist

- [ ] Google Business Profile for Ulaanbaatar atelier
- [ ] Yelp listing (if applicable)
- [ ] TripAdvisor listing (cultural experience angle)
- [ ] Mongolia tourism directory listings
- [ ] Local business directories in Ulaanbaatar
- [ ] NAP consistency across all listings

### Social Proof & PR

- Customer testimonials with photos (with permission)
- Celebrity/dignitary mentions (appropriate attribution)
- Press mentions and features
- Awards and recognitions display

---

## 📈 Measurement Framework

### Key Performance Indicators (KPIs)

#### Visibility Metrics
| Metric | Baseline | 3-Month Target | 6-Month Target |
|--------|----------|----------------|----------------|
| Organic Sessions | TBD | +30% | +60% |
| Keyword Rankings (Top 10) | TBD | 10 keywords | 25 keywords |
| Impressions | TBD | +50% | +100% |
| Click-Through Rate | TBD | 3%+ | 4%+ |

#### Engagement Metrics
| Metric | Target |
|--------|--------|
| Avg. Session Duration | > 2 minutes |
| Pages per Session | > 2.5 |
| Bounce Rate | < 45% |
| Return Visitor Rate | > 20% |

#### Conversion Metrics (Luxury = Long Consideration)
| Metric | Target |
|--------|--------|
| Newsletter Signups | 5% of organic traffic |
| Contact Form Submissions | 2% of organic traffic |
| Product Page Views | 40% reach /shop or /products |
| Cart Additions | Track qualified interest |

### Google Search Console Setup Checklist

- [ ] Verify domain ownership
- [ ] Submit XML sitemap
- [ ] Set preferred domain (with/without www)
- [ ] Set international targeting if needed
- [ ] Enable email alerts for critical issues
- [ ] Monitor Core Web Vitals

### Google Analytics 4 Events to Track

```javascript
// Custom events for luxury buyer journey
gtag('event', 'view_product', { product_name, product_id, price });
gtag('event', 'view_craft_story', { product_id });
gtag('event', 'size_guide_open', { product_id });
gtag('event', 'contact_form_start', {});
gtag('event', 'newsletter_signup', { source });
gtag('event', 'add_to_cart', { product_id, value });
```

### Search Console Monitoring Schedule

| Frequency | Check For |
|-----------|-----------|
| Daily | Critical errors, indexing issues |
| Weekly | New keywords ranking, CTR changes |
| Monthly | Full performance review, content audit |
| Quarterly | Technical audit, competitor analysis |

---

## 🚨 Technical Recommendations (Pending)

### High Priority

1. **Create dedicated Size Guide page** for SEO capture
2. **Add blog/content section** for editorial SEO
3. **Implement GA4 tracking** with custom events
4. **Set up Google Search Console** and submit sitemap

### Medium Priority

1. **Create /craft deep-dive page**
2. **Add customer testimonials section** with structured data
3. **Implement breadcrumb navigation UI** (schema exists)
4. **Create product schema for category pages**

### Low Priority (Nice to Have)

1. **Video content** for Care page
2. **360° product views** with alt text
3. **Customer photo gallery** with UGC

---

## 📋 File Reference

### SEO Library Files

- `lib/seo/index.ts` - Central export
- `lib/seo/structured-data.ts` - JSON-LD schemas
- `lib/seo/metadata.ts` - Metadata generators

### Integration Points

- `app/[locale]/layout.tsx` - Global Organization/Website schema
- `app/[locale]/about/page.tsx` - About page schema + metadata
- `app/[locale]/care/page.tsx` - Care page FAQ schema + metadata
- `app/[locale]/contact/layout.tsx` - Contact page schema + metadata
- `app/[locale]/products/[id]/page.tsx` - Product schema + metadata

---

*Document Version: 1.0*
*Last Updated: Session Date*
*Next Review: After Search Console data available*
