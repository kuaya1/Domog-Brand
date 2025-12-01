'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { getOptimizedImage } from '@/lib/image-utils';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function OptimizedImage({ src, alt, className, onLoad, onError, ...props }: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Ensure src is valid before attempting optimization lookup
  if (!src || typeof src !== 'string') {
    console.error('[OptimizedImage] Invalid src:', src);
    return null;
  }

  const optimized = getOptimizedImage(src);
  
  // If no optimized data OR if we encountered an error with optimized version, use original
  if (!optimized || error) {
    if (!optimized && process.env.NODE_ENV === 'production') {
      console.error(`[OptimizedImage] No optimized data for: ${src}. Using original.`);
    }
    
    // Use the original src directly - Next.js will handle the image
    // Don't apply opacity classes to the fallback to ensure it's always visible
    return (
      <Image 
        src={src} 
        alt={alt || ''} 
        className={className}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        {...props} 
      />
    );
  }
  
  // Get available widths and sort descending
  const avifWidths = Object.keys(optimized.variants.avif).map(Number).sort((a, b) => b - a);
  const webpWidths = Object.keys(optimized.variants.webp).map(Number).sort((a, b) => b - a);
  
  // Build srcSet strings
  const avifSrcSet = avifWidths.map(w => `${optimized.variants.avif[w]} ${w}w`).join(', ');
  const webpSrcSet = webpWidths.map(w => `${optimized.variants.webp[w]} ${w}w`).join(', ');
  
  // Fallback src: largest WebP, or original if something went wrong
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
        className={cn(className, 'transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0')}
        placeholder="blur"
        blurDataURL={optimized.blurDataUrl}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          console.error('[OptimizedImage] Failed to load optimized image, falling back to original:', fallbackSrc);
          setError(true);
          setLoaded(true);
          onError?.(e);
        }}
        {...props}
      />
    </picture>
  );
}
