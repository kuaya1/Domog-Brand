// @ts-ignore
import * as wcag from 'wcag-contrast';

// ... (rest of the file)

// 2. Calculate Luminance & Ratio
// wcag-contrast exports 'hex' function to get ratio between two hex codes

const PALETTE = {
  bg: {
    charcoal900: '#0A0A0A',
    cream50: '#FAF8F3',
  },
  text: {
    gold600: '#B8995A',
    warm600: '#6B6358',
    creamText: 'rgba(250, 248, 243, 0.6)', // #FAF8F3 at 60% opacity
  }
};

// Helper to parse hex to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Helper to blend RGBA over RGB background
function blendColors(fgHexOrRgba: string, bgHex: string): string {
  const bg = hexToRgb(bgHex);
  if (!bg) throw new Error(`Invalid bg color: ${bgHex}`);

  let fg = { r: 0, g: 0, b: 0, a: 1 };

  if (fgHexOrRgba.startsWith('#')) {
    const rgb = hexToRgb(fgHexOrRgba);
    if (!rgb) throw new Error(`Invalid fg color: ${fgHexOrRgba}`);
    fg = { ...rgb, a: 1 };
  } else if (fgHexOrRgba.startsWith('rgba')) {
    const match = fgHexOrRgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      fg = {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
      };
    }
  }

  // Blend formula: Result = FG * Alpha + BG * (1 - Alpha)
  const r = Math.round(fg.r * fg.a + bg.r * (1 - fg.a));
  const g = Math.round(fg.g * fg.a + bg.g * (1 - fg.a));
  const b = Math.round(fg.b * fg.a + bg.b * (1 - fg.a));

  // Return as hex for wcag-contrast library if needed, or just use the values
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// 2. Calculate Luminance & Ratio (Using wcag-contrast library or manual)
// Since we have 'wcag-contrast' installed, we can use it, but we need to blend first.

interface AuditPair {
  name: string;
  fg: string;
  bg: string;
  isLargeText?: boolean;
}

const PAIRS_TO_AUDIT: AuditPair[] = [
  { name: 'Gold on Charcoal', fg: PALETTE.text.gold600, bg: PALETTE.bg.charcoal900 },
  { name: 'Warm on Cream', fg: PALETTE.text.warm600, bg: PALETTE.bg.cream50 },
  { name: 'Cream Text (60%) on Charcoal', fg: PALETTE.text.creamText, bg: PALETTE.bg.charcoal900 },
  { name: 'Gold Text Accessible on Cream (Large Text)', fg: '#856404', bg: PALETTE.bg.cream50, isLargeText: true },
];

function runAudit() {
  console.log('🎨 Starting Color Contrast Audit (WCAG AA)...\n');
  
  let hasFailure = false;
  const results = [];

  for (const pair of PAIRS_TO_AUDIT) {
    // Blend colors to get solid hex values for comparison
    const solidFg = blendColors(pair.fg, pair.bg);
    const solidBg = pair.bg; // Backgrounds are assumed solid

    // @ts-ignore
    const ratio = wcag.hex(solidFg, solidBg);
    const threshold = pair.isLargeText ? 3.0 : 4.5;
    const passed = ratio >= threshold;

    if (!passed) hasFailure = true;

    results.push({
      'Pair Name': pair.name,
      'FG (Solid)': solidFg,
      'BG': solidBg,
      'Ratio': ratio.toFixed(2) + ':1',
      'Required': threshold + ':1',
      'Status': passed ? '✅ PASS' : '❌ FAIL'
    });
  }

  console.table(results);

  if (hasFailure) {
    console.error('\n❌ Accessibility Audit Failed: Some color pairs do not meet WCAG AA standards.');
    process.exit(1);
  } else {
    console.log('\n✅ Accessibility Audit Passed!');
  }
}

// Handle TS errors for wcag-contrast if types are missing
// @ts-ignore
runAudit();
