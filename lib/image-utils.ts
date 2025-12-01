export interface OptimizedImageVariant {
  [width: number]: string;
}

export interface OptimizedImageEntry {
  originalPath: string;
  sanitizedId: string;
  blurDataUrl: string;
  variants: {
    webp: OptimizedImageVariant;
    avif: OptimizedImageVariant;
  };
}

// Dynamically load manifest to avoid build-time errors
let manifest: Record<string, OptimizedImageEntry> = {};

// Only load in browser/Node runtime, not during build type-checking
if (typeof window !== 'undefined' || typeof process !== 'undefined') {
  try {
    // Use require for Node.js compatibility
    manifest = require('./generated/image-manifest.json');
  } catch (e) {
    console.warn('Image manifest not found. Run `npm run optimize` to generate it.');
  }
}

/**
 * Retrieves the optimized image data for a given source path.
 * 
 * @param src - The original source path (e.g., "/images/PNG images/my-image.png")
 * @returns The optimized image entry or null if not found.
 */
export function getOptimizedImage(src: string): OptimizedImageEntry | null {
  if (!src) return null;

  // Decode URL-encoded paths (e.g., %20 -> space)
  const decodedSrc = decodeURIComponent(src);

  // Extract filename to match sanitized ID logic
  // Logic must match scripts/optimize-images.ts
  const filename = decodedSrc.split('/').pop()?.split('.')[0] || '';
  
  const sanitizedId = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9-]/g, '');

  const entry = manifest[sanitizedId];
  
  if (!entry && process.env.NODE_ENV === 'production') {
    console.warn('[getOptimizedImage] Cache miss:', { src, sanitizedId, availableKeys: Object.keys(manifest).slice(0, 5) });
  }

  return entry || null;
}

/**
 * Helper to get the best available source for an `img` tag or `NextImage` src
 * Defaults to the largest WebP if available
 */
export function getFallbackImageSrc(entry: OptimizedImageEntry): string {
  const webpSizes = Object.keys(entry.variants.webp).map(Number).sort((a, b) => b - a);
  if (webpSizes.length > 0) {
    return entry.variants.webp[webpSizes[0]];
  }
  return entry.originalPath; // Fallback to original if something went wrong
}
