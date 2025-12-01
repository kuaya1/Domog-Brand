import type { Config } from "tailwindcss";

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
                // Luxury Charcoal Palette
                charcoal: {
                    800: "#1A1816",
                    900: "#0A0A0A",
                },
                // Primary Palette
                black: {
                    DEFAULT: "#0A0A0A",
                    rich: "#1A1816",
                    soft: "#2C2824",
                },
                // Refined Cream Tones
                cream: {
                    50: "#FAF8F3",
                    100: "#F5F2E9",
                    200: "#EDE9DF",
                    DEFAULT: "#FAF8F3",
                    sand: "#F5F2E9",
                    warm: "#EDE8DD",
                },
                // Warm Neutral Scale
                warm: {
                    50: "#FAF8F3",
                    100: "#F5F2E9",
                    200: "#EDE9DF",
                    500: "#8B8378",
                    600: "#6B6358",
                    700: "#5A5654",
                },
                // Accent Colors
                cognac: {
                    DEFAULT: "#8B6F47",
                    light: "#A68B5B",
                    dark: "#6B5535",
                },
                burgundy: {
                    700: "#6B2737",
                    DEFAULT: "#6B2737",
                    light: "#8B3347",
                    dark: "#4B1727",
                },
                gold: {
                    500: "#D4AF77",
                    600: "#C9A961",
                    700: "#B8995A",
                    DEFAULT: "#C9A961",
                    light: "#D9C081",
                    dark: "#A98941",
                    muted: "rgba(201, 169, 97, 0.2)",
                },
                // Neutral Grays
                stone: {
                    warm: "#5A5654",
                    light: "#8A8684",
                    muted: "#B8B4B0",
                },
                // Legacy support
                primary: "#8B0000",
                secondary: "#B8860B",
                background: "#FAF8F3",
                text: "#2C2C2C",
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "Georgia", "serif"],
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            fontSize: {
                "display-xl": ["7rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
                "display-lg": ["5.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
                "display-md": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
                "display-sm": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
            },
            spacing: {
                "18": "4.5rem",
                "22": "5.5rem",
                "26": "6.5rem",
                "30": "7.5rem",
            },
            boxShadow: {
                "luxury": "0 8px 30px rgba(0, 0, 0, 0.12)",
                "luxury-lg": "0 12px 50px rgba(0, 0, 0, 0.15)",
                "elegant": "0 4px 20px rgba(0, 0, 0, 0.08)",
                "gold": "0 4px 20px rgba(201, 169, 97, 0.25)",
                "3xl": "0 35px 120px rgba(0, 0, 0, 0.35)",
                "card-warm": "0 4px 20px rgba(139, 111, 71, 0.08)",
                "card-warm-hover": "0 8px 30px rgba(139, 111, 71, 0.15)",
            },
            dropShadow: {
                "product": "0 10px 25px rgba(0, 0, 0, 0.15)",
                "heritage-gold": "0 25px 50px rgba(201, 169, 97, 0.3)",
            },
            filter: {
                "product-enhance": "contrast(1.05) saturate(1.08)",
                "heritage-enhance": "contrast(1.1) saturate(1.08)",
            },
            transitionDuration: {
                "400": "400ms",
                "600": "600ms",
            },
            transitionTimingFunction: {
                "luxury": "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
    },
    plugins: [],
};
export default config;
