interface ColorPair {
  name: string;
  foreground: string;
  background: string;
  usage: string;
  minRatio: number; // 4.5 for normal text, 3 for large text
}

const colorPairs: ColorPair[] = [
  {
    name: 'Footer body text',
    foreground: 'rgba(250, 248, 243, 0.6)', // cream/60
    background: '#0A0A0A', // charcoal-900
    usage: 'Body text in footer',
    minRatio: 4.5,
  },
  {
    name: 'Gold accent on dark',
    foreground: '#C9A961', // gold-500
    background: '#0A0A0A', // charcoal-900
    usage: 'Labels and accents',
    minRatio: 4.5,
  },
  {
    name: 'Muted price text',
    foreground: '#9CA3AF', // stone-400 equivalent
    background: '#FFFFFF',
    usage: 'USD label on product cards',
    minRatio: 4.5,
  },
  {
    name: 'Primary text on cream',
    foreground: '#0A0A0A', // charcoal-900
    background: '#FAF8F3', // cream-50
    usage: 'Main content text',
    minRatio: 4.5,
  },
  {
    name: 'Cognac accent on cream',
    foreground: '#8B6F47', // cognac
    background: '#FAF8F3', // cream-50
    usage: 'Links and accents',
    minRatio: 4.5,
  }
];

function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function parseColor(color: string) {
  if (color.startsWith('#')) {
    return hexToRgb(color);
  }
  if (color.startsWith('rgba')) {
    // Very basic parsing for the specific case in the array
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      // If alpha is present, we need to blend with background. 
      // For simplicity in this script, we'll assume black background for the footer case if alpha is used
      // or just ignore alpha for luminance calculation if it's high enough, but strictly we should blend.
      // Let's just return the RGB values.
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
      };
    }
  }
  return null;
}

function getContrastRatio(fg: string, bg: string) {
  const fgRgb = parseColor(fg);
  const bgRgb = parseColor(bg);

  if (!fgRgb || !bgRgb) return 0;

  // Handle alpha blending for foreground if needed (assuming bg is opaque)
  let finalFgRgb = fgRgb;
  if ('a' in fgRgb && fgRgb.a !== undefined && fgRgb.a < 1) {
    finalFgRgb = {
      r: Math.round((1 - fgRgb.a) * bgRgb.r + fgRgb.a * fgRgb.r),
      g: Math.round((1 - fgRgb.a) * bgRgb.g + fgRgb.a * fgRgb.g),
      b: Math.round((1 - fgRgb.a) * bgRgb.b + fgRgb.a * fgRgb.b)
    };
  }

  const l1 = getLuminance(finalFgRgb.r, finalFgRgb.g, finalFgRgb.b);
  const l2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function auditContrast() {
  console.log('🔍 Starting WCAG Color Contrast Audit...');
  
  const results = colorPairs.map(pair => {
    const ratio = getContrastRatio(pair.foreground, pair.background);
    const passes = ratio >= pair.minRatio;
    
    return {
      ...pair,
      ratio: ratio.toFixed(2),
      passes,
      recommendation: passes ? null : suggestFix(pair),
    };
  });
  
  console.table(results.map(({ name, ratio, passes, minRatio }) => ({
    name,
    ratio: `${ratio}:1`,
    required: `${minRatio}:1`,
    status: passes ? '✅ PASS' : '❌ FAIL'
  })));
  
  // Generate fix recommendations
  results
    .filter(r => !r.passes)
    .forEach(r => {
      console.log(`\n❌ ${r.name}: ${r.ratio}:1 (needs ${r.minRatio}:1)`);
      if (r.recommendation) {
        console.log(`   Recommendation: ${r.recommendation}`);
      }
    });
    
  console.log('\n✨ Audit complete.');
}

function suggestFix(pair: ColorPair): string {
  // Simple suggestion logic
  if (pair.background === '#0A0A0A') {
    return 'Increase opacity or lightness of foreground color';
  }
  if (pair.background === '#FFFFFF' || pair.background === '#FAF8F3') {
    return 'Darken foreground color';
  }
  return 'Adjust colors to increase contrast';
}

auditContrast();
