'use client';

import Image, { ImageProps } from 'next/image';
import { getOptimizedImage } from '@/lib/image-utils';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  const optimized = getOptimizedImage(src);
  
  if (!optimized) {
    // Fallback to original Next/Image for dev mode or non-optimized images
    if (process.env.NODE_ENV === 'production') {
      console.error(`[OptimizedImage] Missing optimized data for: ${src}`);
    }
    return <Image src={src} alt={alt} {...props} />;
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
