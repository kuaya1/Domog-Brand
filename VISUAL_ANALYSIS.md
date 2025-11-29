# Visual Analysis: Domog Brand vs. Furlan Marri Standards

## 1. Homepage Hero Section
**The Issue:**
The current hero uses a "Split Layout" (Text Left / Image Right) on a white background. This is a standard e-commerce pattern (safe, functional) but lacks the "cinematic universe" feel of luxury brands like Furlan Marri. It feels like a catalog page, not a brand statement.

**Furlan Marri Standard:**
Furlan Marri uses **Full-Screen Immersive Media**. The image/video covers 100% of the viewport (`100vh`). Text is overlaid on the image (usually bottom-left or centered), creating a poster-like effect. The user is "inside" the world immediately.

**Exact Tailwind Fix:**
Change the `<section>` and inner containers to:
```tsx
// Container
<section className="relative h-screen w-full overflow-hidden bg-charcoal-900">
  
  // Background Image (Full Bleed)
  <div className="absolute inset-0">
    <Image 
      src="/images/hero-image.jpg" 
      className="h-full w-full object-cover opacity-90" 
    />
    // Gradient Overlay for Text Readability
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
  </div>

  // Content (Bottom Aligned, White Text)
  <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
    <h1 className="font-serif text-6xl lg:text-8xl text-white leading-[0.9] tracking-tight mb-6">
      {t.hero_title}
    </h1>
    <p className="text-cream-100 text-lg max-w-xl mb-8 font-light tracking-wide">
      {t.hero_description}
    </p>
    // CTA
    <Link className="inline-flex items-center px-8 py-4 bg-white text-black hover:bg-cream-200 transition-colors duration-500 uppercase tracking-[0.2em] text-xs font-bold">
      {t.cta_button}
    </Link>
  </div>
</section>
```

## 2. Product Cards
**The Issue:**
Current cards use `shadow-lg` which is a standard, diffuse "fuzzy" shadow. It looks "digital". The white card on white background lacks definition. The hover lift (`-translate-y-1`) is good but needs a sharper shadow to sell the "lift".

**Furlan Marri Standard:**
Luxury shadows are **sharp, directional, and ambient**. They often use a "hard" light source feel. Cards often have generous padding or a very subtle off-white background (`bg-cream-50`) to stand out from a white page.

**Exact Tailwind Fix:**
Update `ProductCard.tsx`:
```tsx
<article className="
    group relative bg-cream-50 
    transition-all duration-700 ease-out
    hover:-translate-y-2 hover:shadow-luxury-lg
">
    // Image Aspect Ratio (Taller is more elegant for boots)
    <div className="relative aspect-[4/5] overflow-hidden">
       <Image className="... transition-transform duration-1000 group-hover:scale-105" />
    </div>

    // Typography & Spacing
    <div className="p-6 text-center">
        <h3 className="font-serif text-2xl text-charcoal-900 mb-2">{product.name}</h3>
        <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone-500 mb-4">{product.category}</p>
        <span className="font-serif text-xl text-charcoal-900 border-b border-gold/30 pb-1">
            ${product.price}
        </span>
    </div>
</article>
```

## 3. Typography
**The Issue:**
Current headers are `text-5xl lg:text-6xl`. While large, they don't reach "Display" sizes.
Letter spacing on labels is standard.

**Furlan Marri Standard:**
**Massive Contrast.** Headlines are huge (`text-8xl`+), labels are tiny (`text-xs`) with massive tracking (`tracking-[0.25em]`). This contrast creates elegance.

**Exact Tailwind Fix:**
*   **Headlines:** `text-6xl lg:text-[7rem] leading-[0.9] -tracking-[0.03em]`
*   **Labels (Eyebrows):** `text-[10px] lg:text-xs uppercase tracking-[0.25em] font-medium text-gold-600`
*   **Body:** `text-base lg:text-lg leading-[1.8] font-light text-stone-warm`

## 4. Spacing & Rhythm
**The Issue:**
`py-24` (6rem) is too tight for luxury. It feels rushed.

**Furlan Marri Standard:**
**Radical Whitespace.** Sections often have `py-32` or `py-40` (8rem - 10rem). This "waste" of space signals luxury.

**Exact Tailwind Fix:**
*   **Section Padding:** `py-32 lg:py-40`
*   **Grid Gaps:** `gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-24` (More vertical space between rows).

## 5. Contrast & Depth
**The Issue:**
The site is predominantly white/cream. It lacks the "moody" dark sections that anchor a luxury site.

**Furlan Marri Standard:**
**Rhythmic Contrast.** Light Hero -> Dark Story Section -> Light Product Grid -> Dark Footer.

**Exact Tailwind Fix:**
*   **Heritage Section:** Change background to `bg-charcoal-900`.
*   **Text in Dark Section:** `text-cream-100` (not pure white, too harsh).
*   **Images in Dark Section:** Reduce opacity slightly `opacity-90` or add a subtle vignette.
