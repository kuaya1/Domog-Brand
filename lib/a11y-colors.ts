export const accessibleColors = {
  // Text colors
  text: {
    primary: '#0A0A0A', // charcoal-900
    secondary: '#44403C', // stone-700 (darkened from stone-400 for contrast)
    muted: '#57534E', // stone-600 (accessible on white/cream)
    inverse: '#FAF8F3', // cream-50
  },
  // Brand colors optimized for accessibility
  brand: {
    gold: {
      DEFAULT: '#C9A961', // gold-500
      accessible: '#A1823D', // Darkened for use on light backgrounds
      text: '#C9A961', // Good on dark backgrounds
    },
    cognac: {
      DEFAULT: '#8B6F47',
      accessible: '#6B5435', // Darkened to pass 4.5:1 on cream
    },
    cream: {
      DEFAULT: '#FAF8F3',
      dim: '#EBE5D9', // Darker cream for borders/backgrounds
    },
    charcoal: {
      DEFAULT: '#0A0A0A',
      light: '#1C1917', // stone-900
    }
  },
  // Semantic colors
  status: {
    error: '#DC2626', // red-600
    success: '#16A34A', // green-600
    warning: '#CA8A04', // yellow-600
  }
};
