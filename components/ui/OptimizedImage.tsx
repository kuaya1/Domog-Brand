'use client';

import Image, { ImageProps } from 'next/image';
import { getOptimizedImage } from '@/lib/image-utils';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  // Ensure src is valid before attempting optimization lookup
  if (!src || typeof src !== 'string') {
    console.error('[OptimizedImage] Invalid src:', src);
    return null;
  }

  const optimized = getOptimizedImage(src);
  
  if (!optimized) {
    // Fallback to original Next/Image - this MUST always work
    if (process.env.NODE_ENV === 'production') {
      console.error(`[OptimizedImage] No optimized data for: ${src}. Using original.`);
    }
    // Use the original src directly - Next.js will handle the image
    return <Image src={src} alt={alt || ''} {...props} />;
  }
  
  // Get available widths and sort descending
  const avifWidths = Object.keys(optimized.variants.avif).map(Number).sort((a, b) => b - a);
  const webpWidths = Object.keys(optimized.variants.webp).map(Number).sort((a, b) => b - a);
  
  // Build srcSet strings
  const avifSrcSet = avifWidths.map(w => `${optimized.variants.avif[w]} ${w}w`).join(', ');
  const webpSrcSet = webpWidths.map(w => `${optimized.variants.webp[w]} ${w}w`).join(', ');
  
  // Fallback src: largest WebP
  const fallbackSrc = webpWidths.length > 0 ? optimized.variants.webp[webpWidths[0]] : src;
  
  return (
    <picture>
      {avifWidths.length > 0 && (
        <source
          type="image/avif"
          srcSet={avifSrcSet}
        />
      )}
      {webpWidths.length > 0 && (
        <source
          type="image/webp"
          srcSet={webpSrcSet}
        />
      )}
      <Image
        src={fallbackSrc}
        alt={alt}
        placeholder="blur"
        blurDataURL={optimized.blurDataUrl}
        {...props}
      />
    </picture>
  );
}
