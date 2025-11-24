import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#0A0A0A',
          rich: '#1A1816',
        },
        cream: {
          DEFAULT: '#FAF8F3',
          light: '#FFFFFF',
          sand: '#F5F2E9',
        },
        cognac: {
          DEFAULT: '#8B6F47',
          light: '#A68A61',
          dark: '#6B5436',
        },
        burgundy: {
          DEFAULT: '#6B2737',
          light: '#8B3A4A',
          dark: '#4A1A25',
        },
        gold: {
          DEFAULT: '#C9A961',
          light: '#D9BC7F',
          dark: '#9F8248',
        },
        forest: '#2C4A3E',
        gray: {
          warm: '#5A5654',
          light: '#8A8682',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        sm: ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        base: ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],
        lg: ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],
        xl: ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      boxShadow: {
        'luxury': '0 20px 60px -15px rgba(10, 10, 10, 0.3)',
        'elegant': '0 10px 40px -10px rgba(10, 10, 10, 0.2)',
        'refined': '0 4px 20px -4px rgba(10, 10, 10, 0.15)',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
      },
      spacing: {
        18: '4.5rem',
        20: '5rem',
        28: '7rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
