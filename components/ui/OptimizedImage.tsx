'use client';

import Image, { ImageProps } from 'next/image';
import { getOptimizedImage } from '@/lib/image-manifest';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  const optimized = getOptimizedImage(src);
  
  if (!optimized) {
    // Fallback to original
    return <Image src={src} alt={alt} {...props} />;
  }
  
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`
          ${optimized.sources.avif.sm} 384w,
          ${optimized.sources.avif.md} 640w,
          ${optimized.sources.avif.lg} 960w,
          ${optimized.sources.avif.xl} 1920w
        `}
      />
      <source
        type="image/webp"
        srcSet={`
          ${optimized.sources.webp.sm} 384w,
          ${optimized.sources.webp.md} 640w,
          ${optimized.sources.webp.lg} 960w,
          ${optimized.sources.webp.xl} 1920w
        `}
      />
      <Image
        src={optimized.sources.webp.lg}
        alt={alt}
        placeholder="blur"
        blurDataURL={optimized.blur}
        {...props}
      />
    </picture>
  );
}
