import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';

interface ImageConfig {
  inputDir: string;
  outputDir: string;
  formats: ('webp' | 'avif' | 'jpg')[];
  sizes: { width: number; suffix: string }[];
  quality: { webp: number; avif: number; jpg: number };
}

const config: ImageConfig = {
  inputDir: 'public/images/PNG images',
  outputDir: 'public/images/optimized',
  formats: ['webp', 'avif'],
  sizes: [
    { width: 384, suffix: '-sm' },
    { width: 640, suffix: '-md' },
    { width: 960, suffix: '-lg' },
    { width: 1920, suffix: '-xl' },
  ],
  quality: { webp: 82, avif: 75, jpg: 85 },
};

interface ManifestEntry {
  id: string;
  originalName: string;
  blur: string;
  sources: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

async function optimizeImage(inputPath: string): Promise<ManifestEntry> {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const sanitizedName = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9-]/g, '');
  
  // Generate blur placeholder
  const blurBuffer = await sharp(inputPath)
    .resize(10)
    .webp({ quality: 20 })
    .toBuffer();
  const blurDataUrl = `data:image/webp;base64,${blurBuffer.toString('base64')}`;
  
  const sources: any = {
    webp: {},
    avif: {},
    jpg: {}
  };

  // Generate responsive sizes in multiple formats
  for (const size of config.sizes) {
    for (const format of config.formats) {
      const outputFilename = `${sanitizedName}${size.suffix}.${format}`;
      const outputPath = path.join(config.outputDir, outputFilename);
      
      await sharp(inputPath)
        .resize(size.width, null, { withoutEnlargement: true })
        [format]({ quality: config.quality[format] })
        .toFile(outputPath);
        
      sources[format][size.suffix.replace('-', '')] = `/images/optimized/${outputFilename}`;
    }
  }
  
  // Return manifest entry
  return {
    id: sanitizedName,
    originalName: filename,
    blur: blurDataUrl,
    sources
  };
}

async function main() {
  console.log('🚀 Starting image optimization pipeline...');
  
  // Ensure output directory exists
  await fs.ensureDir(config.outputDir);
  
  // Find all PNG images
  const images = await glob(`${config.inputDir}/**/*.png`);
  console.log(`Found ${images.length} images to optimize.`);
  
  const manifest: Record<string, ManifestEntry> = {};
  let savedBytes = 0;
  
  for (const imagePath of images) {
    try {
      console.log(`Processing: ${path.basename(imagePath)}`);
      const originalSize = (await fs.stat(imagePath)).size;
      
      const entry = await optimizeImage(imagePath);
      manifest[entry.id] = entry;
      
      // Calculate savings (approximate, comparing original to largest WebP)
      const optimizedPath = path.join(config.outputDir, `${entry.id}-lg.webp`);
      if (await fs.pathExists(optimizedPath)) {
        const optimizedSize = (await fs.stat(optimizedPath)).size;
        savedBytes += Math.max(0, originalSize - optimizedSize);
      }
    } catch (error) {
      console.error(`Error processing ${imagePath}:`, error);
    }
  }
  
  // Write manifest
  await fs.writeJSON(path.join(config.outputDir, 'manifest.json'), manifest, { spaces: 2 });
  
  console.log('✅ Image optimization complete!');
  console.log(`💾 Estimated space savings: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
