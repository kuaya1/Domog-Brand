import manifestData from './generated/image-manifest.json';

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

// Type assertion for the imported JSON
const manifest = manifestData as Record<string, OptimizedImageEntry>;

/**
 * Retrieves the optimized image data for a given source path.
 * 
 * @param src - The original source path (e.g., "/images/PNG images/my-image.png")
 * @returns The optimized image entry or null if not found.
 */
export function getOptimizedImage(src: string): OptimizedImageEntry | null {
  if (!src) return null;

  // Extract filename to match sanitized ID logic
  // Logic must match scripts/optimize-images.ts
  const filename = src.split('/').pop()?.split('.')[0] || '';
  
  const sanitizedId = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9-]/g, '');

  return manifest[sanitizedId] || null;
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
