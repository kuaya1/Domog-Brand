import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';

const INPUT_DIR = 'public/images';
const OUTPUT_DIR = 'public/images/optimized';
const MANIFEST_PATH = 'lib/generated/image-manifest.json';

const SIZES = [640, 960, 1280, 1920];
const FORMATS = ['webp', 'avif'] as const;

interface ManifestEntry {
  originalPath: string;
  sanitizedId: string;
  blurDataUrl: string;
  variants: {
    [format in typeof FORMATS[number]]: {
      [width: number]: string;
    };
  };
}

async function main() {
  console.log('🚀 Starting Image Optimization Pipeline...');

  // Ensure directories exist
  await fs.ensureDir(OUTPUT_DIR);
  await fs.ensureDir(path.dirname(MANIFEST_PATH));

  // Load existing manifest if available to skip processed images
  let manifest: Record<string, ManifestEntry> = {};
  if (await fs.pathExists(MANIFEST_PATH)) {
    try {
      manifest = await fs.readJSON(MANIFEST_PATH);
    } catch (e) {
      console.warn('⚠️ Could not read existing manifest, starting fresh.');
    }
  }

  // Find all images (png, jpg, jpeg)
  // Excluding already optimized folder to avoid recursion if it's inside public/images
  const files = await glob(`${INPUT_DIR}/**/*.{png,jpg,jpeg}`, {
    ignore: [`${OUTPUT_DIR}/**`]
  });

  console.log(`📸 Found ${files.length} images to process.`);

  let totalSavedBytes = 0;
  let processedCount = 0;

  for (const file of files) {
    const relativePath = path.relative(INPUT_DIR, file);
    const filename = path.basename(file, path.extname(file));
    
    // Sanitize ID: kebab-case, remove special chars
    const sanitizedId = filename
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '')
      .replace(/[^a-z0-9-]/g, '');

    // Check if already processed and source hasn't changed (simple check)
    // In a real pipeline we might check mtime, but here we'll rely on manifest existence
    if (manifest[sanitizedId]) {
      // console.log(`⏩ Skipping ${filename} (already in manifest)`);
      continue;
    }

    console.log(`⚙️ Processing: ${filename} -> ${sanitizedId}`);

    try {
      const imageBuffer = await fs.readFile(file);
      const originalSize = imageBuffer.length;
      const sharpImage = sharp(imageBuffer);
      const metadata = await sharpImage.metadata();

      // Generate Blur Placeholder
      const blurBuffer = await sharpImage
        .resize(10, 10, { fit: 'inside' })
        .toFormat('png')
        .toBuffer();
      const blurDataUrl = `data:image/png;base64,${blurBuffer.toString('base64')}`;

      const variants: ManifestEntry['variants'] = {
        webp: {},
        avif: {}
      };

      // Generate sizes and formats
      for (const format of FORMATS) {
        for (const width of SIZES) {
          // Don't upscale if original is smaller
          if (metadata.width && metadata.width < width) continue;

          const outName = `${sanitizedId}-${width}.${format}`;
          const outPath = path.join(OUTPUT_DIR, outName);

          const pipeline = sharpImage.clone().resize(width);
          
          if (format === 'webp') {
            pipeline.webp({ quality: 80 });
          } else {
            pipeline.avif({ quality: 75 });
          }

          await pipeline.toFile(outPath);
          
          // Store relative path for frontend use
          variants[format][width] = `/images/optimized/${outName}`;
        }
      }

      // Calculate savings (comparing original to largest AVIF as an example approximation)
      // This is rough estimation
      const largestAvif = variants.avif[1920] || variants.avif[1280] || variants.avif[960] || variants.avif[640];
      if (largestAvif) {
        const optimizedPath = path.join('public', largestAvif);
        if (await fs.pathExists(optimizedPath)) {
            const optSize = (await fs.stat(optimizedPath)).size;
            totalSavedBytes += Math.max(0, originalSize - optSize);
        }
      }

      // Update manifest
      manifest[sanitizedId] = {
        originalPath: relativePath,
        sanitizedId,
        blurDataUrl,
        variants
      };

      processedCount++;

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }

  // Write Manifest
  await fs.writeJSON(MANIFEST_PATH, manifest, { spaces: 2 });

  const mbSaved = (totalSavedBytes / (1024 * 1024)).toFixed(2);
  console.log(`\n✅ Optimization Complete!`);
  console.log(`   Processed: ${processedCount} new images`);
  console.log(`   Total Manifest Entries: ${Object.keys(manifest).length}`);
  console.log(`   Estimated Savings: ${mbSaved} MB`);
}

main().catch(console.error);
