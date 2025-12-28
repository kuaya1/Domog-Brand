import type { Config } from "tailwindcss";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * DOMOG BRAND — TAILWIND DESIGN TOKENS
 * Aligned with BRAND_AESTHETIC_IDENTITY.md v1.0
 * "Does your screen feel like that room?"
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // Safelist dynamically generated classes
    safelist: [
        'opacity-0',
        'opacity-100',
        'translate-y-0',
        'translate-y-4',
        '-translate-y-2',
        'scale-100',
        'scale-105',
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        extend: {
            colors: {
                /**
                 * ═══════════════════════════════════════════════════════════════
                 * PRIMARY COLORS — The Foundation
                 * Color Ratio: 60% cream / 30% charcoal
                 * ═══════════════════════════════════════════════════════════════
                 */
                
                // Charcoal — "The carbon of aged leather. Seriousness without severity."
                // Workshop origin: The iron of tools. The shadow side of leather.
                charcoal: {
                    800: "#1A1816",  // Rich charcoal for subtle variation
                    900: "#0A0A0A",  // Primary text, dark sections (NOT pure black)
                    DEFAULT: "#0A0A0A",
                },
                
                // Cream — "What white becomes when you add 35 years of sunlight"
                // Workshop origin: Afternoon light. Unbleached canvas. Natural wood tone.
                cream: {
                    50: "#FAF8F3",   // Primary background — the canvas
                    100: "#F5F2E9",  // Subtle variation
                    200: "#EDE9DF",  // Card backgrounds, subtle sections
                    300: "#DDD8CE",  // Borders, dividers
                    400: "#B8B4AE",  // Muted text, icons
                    500: "#8A8680",  // Secondary text
                    600: "#6B6760",  // Body text on light
                    700: "#4A4740",  // Strong text
                    800: "#2A2825",  // Near-black
                    DEFAULT: "#FAF8F3",
                    sand: "#F5F0E8", // Alternate backgrounds, subtle section breaks
                },
                
                /**
                 * ═══════════════════════════════════════════════════════════════
                 * SECONDARY COLORS — The Accents
                 * Color Ratio: 8% cognac+stone
                 * ═══════════════════════════════════════════════════════════════
                 */
                
                // Gold — "The Sacred Accent" — Emphasis, not decoration
                // Workshop origin: Brass fittings. Tool edges worn to shine.
                // THE GOLD RULE: Must be earned. <2% of any page.
                gold: {
                    400: "#D9C081",  // Light (hover states)
                    500: "#D4AF77",  // Medium
                    600: "#C9A961",  // Primary — dividers, significant moments
                    700: "#B8995A",  // Dark
                    DEFAULT: "#C9A961",
                    muted: "rgba(201, 169, 97, 0.2)",
                },
                
                // Cognac — "The Working Accent" — Gold's practical sibling
                // Workshop origin: Mid-toned leather. Stain on the workbench.
                cognac: {
                    50: "#FAF7F2",
                    100: "#F0E8DC",
                    200: "#D9C9B0",
                    300: "#B8A07A",
                    400: "#A68B5B",
                    500: "#8B6F47",  // Base
                    600: "#6B5535",
                    700: "#5A4830",
                    800: "#4A3A28",
                    DEFAULT: "#8B6F47",
                },
                
                /**
                 * ═══════════════════════════════════════════════════════════════
                 * SUPPORTING COLORS
                 * Color Ratio: 2% gold+burgundy (sacred accents)
                 * ═══════════════════════════════════════════════════════════════
                 */
                
                // Burgundy — "Power held back" — Reserved for special moments
                // Use: Cart badges, error states (warm, not alarming), rare emphasis
                // Rule: Appears less than 1% of the time
                burgundy: {
                    50: "#FDF5F7",
                    100: "#F8E8EB",
                    200: "#EBCCD2",
                    300: "#D4949F",
                    400: "#B05C6A",
                    500: "#8B3347",
                    600: "#6B2737",
                    700: "#6B2737",
                    DEFAULT: "#6B2737",
                },
                
                // Stone — "Workshop shadows" — Secondary text, hierarchy softening
                stone: {
                    warm: "#78716C",   // Per spec: #78716C for stone-warm
                    light: "#8A8684",
                    muted: "#B8B4B0",
                    DEFAULT: "#78716C",
                },
                
                /**
                 * ═══════════════════════════════════════════════════════════════
                 * ACCESSIBILITY COLORS
                 * WCAG 2.1 AA compliant alternatives
                 * ═══════════════════════════════════════════════════════════════
                 */
                "gold-accessible": "#A1823D",
                "gold-text-accessible": "#856404",
                "cognac-accessible": "#6B5435",
                
                /**
                 * ═══════════════════════════════════════════════════════════════
                 * SEMANTIC ALIASES (for clarity)
                 * ═══════════════════════════════════════════════════════════════
                 */
                background: "#FAF8F3",  // cream-50
                foreground: "#0A0A0A",  // charcoal-900
                
                // FORBIDDEN: Pure white (#FFFFFF) and pure black (#000000)
                // These are intentionally NOT defined to prevent accidental use
            },
            /**
             * ═══════════════════════════════════════════════════════════════
             * TYPOGRAPHY — Type as Voice
             * "A declaration made quietly. Not a whisper—whispers are uncertain.
             * Not a shout—shouts are desperate."
             * ═══════════════════════════════════════════════════════════════
             */
            fontFamily: {
                // Serif — Playfair Display: Editorial gravitas, confident, slightly romantic
                serif: ["var(--font-playfair)", "Georgia", "serif"],
                // Sans — Inter: Clear, honest, quietly confident  
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            
            /**
             * TYPE SCALE — 1.25 ratio (Major Third)
             * Warm, readable, not dramatic
             * 
             * Display: Headlines, hero text (tight line-height: 1.1-1.2)
             * Body: Reading text (generous line-height: 1.7)
             * Label: Functional UI (moderate line-height: 1.3)
             */
            fontSize: {
                // Display sizes — The visual anchors
                "display-xl": ["5.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],   // 88px — Homepage hero only
                "display-lg": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],   // 72px — Page heroes
                "display-md": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],  // 56px — Section titles
                "display-sm": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }], // 44px — Subsection titles
                "display-xs": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],  // 36px — Card headlines
                
                // Heading sizes — Component and section headings (bridge between display and body)
                "heading-xl": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],     // 32px
                "heading-lg": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],  // 24px
                "heading-md": ["1.25rem", { lineHeight: "1.3", letterSpacing: "0" }],        // 20px
                
                // Body sizes — Reading text (line-height: 1.7 for unhurried reading)
                "body-lg": ["1.125rem", { lineHeight: "1.7", letterSpacing: "0" }],  // 18px — Pull quotes, lead paragraphs
                "body-md": ["1rem", { lineHeight: "1.7", letterSpacing: "0" }],      // 16px — Standard reading
                "body-sm": ["0.875rem", { lineHeight: "1.7", letterSpacing: "0" }],  // 14px — Captions, secondary info
                "body-xs": ["0.75rem", { lineHeight: "1.6", letterSpacing: "0" }],   // 12px — Fine print, legal
                
                // Label sizes — Functional UI (uppercase, tracked)
                "label-lg": ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.15em" }],  // 13px — Navigation
                "label-md": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.2em" }],   // 11px — Category labels
                "label-sm": ["0.625rem", { lineHeight: "1.3", letterSpacing: "0.25em" }],   // 10px — Tags
            },
            
            /**
             * ═══════════════════════════════════════════════════════════════
             * SPACING — The Luxury of Emptiness
             * Base unit: 8px — Everything derives from 8
             * "Space is not absence. Space is the most expensive material."
             * ═══════════════════════════════════════════════════════════════
             */
            spacing: {
                // Extended spacing scale (8px base)
                "18": "4.5rem",   // 72px
                "22": "5.5rem",   // 88px
                "26": "6.5rem",   // 104px
                "30": "7.5rem",   // 120px
                "34": "8.5rem",   // 136px
                "38": "9.5rem",   // 152px
                "42": "10.5rem",  // 168px
            },
            
            /**
             * CONTAINER WIDTHS
             * Max 1280px — Beyond this, the eye must travel too far
             */
            maxWidth: {
                "container": "80rem",     // 1280px — Maximum content width
                "wide": "70rem",          // 1120px — Standard page content
                "readable": "48rem",      // 768px — Long-form text, optimal reading
                "narrow": "40rem",        // 640px — Focused content, forms
                "tight": "30rem",         // 480px — Modals, centered callouts
            },
            
            /**
             * ═══════════════════════════════════════════════════════════════
             * SHADOWS — Digital Tactility
             * Warm (charcoal-based), soft (multi-layer), never cool
             * "Shadows are how we create depth. They should feel like natural light."
             * ═══════════════════════════════════════════════════════════════
             */
            boxShadow: {
                // Domog Shadow Scale — Warm, multi-layer
                "sm": "0 1px 2px 0 rgba(10, 10, 10, 0.03), 0 1px 3px 0 rgba(10, 10, 10, 0.06)",
                "md": "0 4px 6px -1px rgba(10, 10, 10, 0.05), 0 2px 4px -2px rgba(10, 10, 10, 0.05)",
                "lg": "0 10px 15px -3px rgba(10, 10, 10, 0.08), 0 4px 6px -4px rgba(10, 10, 10, 0.05)",
                "xl": "0 20px 25px -5px rgba(10, 10, 10, 0.10), 0 8px 10px -6px rgba(10, 10, 10, 0.08)",
                
                // Legacy/specialty shadows
                "luxury": "0 8px 30px rgba(10, 10, 10, 0.12)",
                "luxury-lg": "0 12px 50px rgba(10, 10, 10, 0.15)",
                "elegant": "0 4px 20px rgba(10, 10, 10, 0.08)",
                "gold": "0 4px 20px rgba(201, 169, 97, 0.25)",
                "card": "0 4px 20px rgba(10, 10, 10, 0.06)",
                "card-hover": "0 8px 30px rgba(10, 10, 10, 0.12)",
                
                // None (explicit)
                "none": "none",
            },
            
            dropShadow: {
                "product": "0 10px 25px rgba(10, 10, 10, 0.15)",
                "heritage-gold": "0 25px 50px rgba(201, 169, 97, 0.3)",
            },
            
            /**
             * ═══════════════════════════════════════════════════════════════
             * BORDER RADIUS
             * Default: 4px (0.25rem) — "Subtle softness"
             * "Not sharp, not round. The gentle wear of used tools."
             * ═══════════════════════════════════════════════════════════════
             */
            borderRadius: {
                "none": "0",
                "sm": "0.125rem",   // 2px
                "DEFAULT": "0.25rem", // 4px — The Domog standard
                "md": "0.375rem",   // 6px
                "lg": "0.5rem",     // 8px
                "xl": "0.75rem",    // 12px
                "full": "9999px",
            },
            
            /**
             * ═══════════════════════════════════════════════════════════════
             * MOTION — Movement as Craft
             * "Motion should feel like a door opening slowly, not a pop-up ad."
             * 
             * Tempo: Slow. Nothing snaps into place.
             * Feel: Like breathing. In... out. Ease... release.
             * ═══════════════════════════════════════════════════════════════
             */
            transitionDuration: {
                "fast": "200ms",       // Hover states
                "DEFAULT": "300ms",    // Most transitions  
                "medium": "400ms",     // Page transitions, menu
                "slow": "500ms",       // Scroll reveals
                "slower": "700ms",     // Dramatic reveals
            },
            
            transitionTimingFunction: {
                // ease-out — Default. Things arrive and settle.
                "DEFAULT": "cubic-bezier(0, 0, 0.2, 1)",
                // ease-in-out — For reversible actions (open/close)
                "symmetric": "cubic-bezier(0.4, 0, 0.2, 1)",
                // Linear — Only for continuous animations (loading)
                "linear": "linear",
                // Legacy alias
                "luxury": "cubic-bezier(0.4, 0, 0.2, 1)",
                // FORBIDDEN: bounce, elastic — Too playful/trendy
            },
            
            /**
             * ═══════════════════════════════════════════════════════════════
             * KEYFRAME ANIMATIONS
             * ═══════════════════════════════════════════════════════════════
             */
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-down": {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in-right": {
                    "0%": { opacity: "0", transform: "translateX(10px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "slide-in-left": {
                    "0%": { opacity: "0", transform: "translateX(-10px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.98)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "pulse-subtle": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.7" },
                },
            },
            
            animation: {
                "fade-in": "fade-in 300ms ease-out forwards",
                "fade-up": "fade-up 500ms ease-out forwards",
                "fade-down": "fade-down 500ms ease-out forwards",
                "slide-in-right": "slide-in-right 300ms ease-out forwards",
                "slide-in-left": "slide-in-left 300ms ease-out forwards",
                "scale-in": "scale-in 300ms ease-out forwards",
                "pulse-subtle": "pulse-subtle 2000ms linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
