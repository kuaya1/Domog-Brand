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
        ink: {
          DEFAULT: '#2B2B2B',
          deep: '#1F1F1F',
          soft: '#4A4A4A',
        },
        rice: '#F7F4EF',
        clay: '#C9A876',
        crimson: '#8B3A3A',
        jade: '#4A5D5A',
        bronze: '#8B7355',
        pure: '#FDFDFB',
        silk: '#F5F2ED',
        shadow: '#E8E5DF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.8', letterSpacing: '0.2em' }],
        sm: ['0.8125rem', { lineHeight: '1.9', letterSpacing: '0.15em' }],
        base: ['0.9375rem', { lineHeight: '2', letterSpacing: '0.08em' }],
        lg: ['1.125rem', { lineHeight: '1.9', letterSpacing: '0.08em' }],
        xl: ['1.375rem', { lineHeight: '1.8', letterSpacing: '0.06em' }],
        '2xl': ['1.75rem', { lineHeight: '1.6', letterSpacing: '0.05em' }],
        '3xl': ['2.125rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
        '4xl': ['2.75rem', { lineHeight: '1.25', letterSpacing: '0.03em' }],
        '5xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '0.02em' }],
        '6xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0.015em' }],
        '7xl': ['5.5rem', { lineHeight: '1', letterSpacing: '0.01em' }],
        'hero': ['7rem', { lineHeight: '1', letterSpacing: '0.08em' }],
      },
      letterSpacing: {
        capsule: '0.25em',
        seal: '0.18em',
      },
      boxShadow: {
        sumi: '0 20px 60px -20px rgba(0,0,0,0.12)',
        card: '0 8px 20px -10px rgba(43,43,43,0.15)',
      },
      borderRadius: {
        subtle: '0.125rem',
        sharp: '0.0625rem',
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
        slow: '600ms',
        softer: '800ms',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'line-grow': {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 0.8s ease-out forwards',
        'line-grow': 'line-grow 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
