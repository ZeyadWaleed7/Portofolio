const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const inputDir = 'assets';
const outputDir = 'assets/optimized';
const quality = 80; // JPEG quality
const webpQuality = 85; // WebP quality

// Project images to optimize
const projectImages = [
    'project-1.png',
    'project-2.png',
    'project-3.png',
    'project-4.png',
    'project-5.png',
    'ui-1.png',
    'ui-2.png',
    'ui-3.png',
    'ui-4.png',
    'ui-5.png',
    'ui-6.png'
];

async function optimizeImage(inputPath, outputPath, format, options = {}) {
    try {
        await sharp(inputPath)
            .resize(600, 600, {
                fit: 'inside',
                withoutEnlargement: true
            })
        [format](options)
            .toFile(outputPath);

        console.log(`✓ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    } catch (error) {
        console.error(`✗ Error optimizing ${inputPath}:`, error.message);
    }
}

async function createWebP(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .resize(600, 600, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: webpQuality })
            .toFile(outputPath);

        console.log(`✓ Created WebP: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    } catch (error) {
        console.error(`✗ Error creating WebP for ${inputPath}:`, error.message);
    }
}

async function optimizeImages() {
    try {
        // Create output directory if it doesn't exist
        await fs.mkdir(outputDir, { recursive: true });

        console.log('🔄 Starting image optimization...\n');

        for (const imageName of projectImages) {
            const inputPath = path.join(inputDir, imageName);
            const baseName = path.parse(imageName).name;

            // Check if input file exists
            try {
                await fs.access(inputPath);
            } catch {
                console.log(`⚠️  Skipping ${imageName} - file not found`);
                continue;
            }

            // Create optimized PNG
            const optimizedPngPath = path.join(outputDir, `${baseName}-optimized.png`);
            await optimizeImage(inputPath, optimizedPngPath, 'png', {
                compressionLevel: 9
            });

            // Create WebP version
            const webpPath = path.join(outputDir, `${baseName}.webp`);
            await createWebP(inputPath, webpPath);

            // Create JPEG version for better compression
            const jpegPath = path.join(outputDir, `${baseName}.jpg`);
            await optimizeImage(inputPath, jpegPath, 'jpeg', {
                quality: quality,
                progressive: true
            });
        }

        console.log('\n✅ Image optimization completed!');
        console.log('\n📁 Optimized images saved to:', outputDir);
        console.log('\n💡 Next steps:');
        console.log('1. Replace original images with optimized versions');
        console.log('2. Update HTML to use WebP format with fallbacks');
        console.log('3. Consider using responsive images with srcset');

    } catch (error) {
        console.error('❌ Error during optimization:', error);
    }
}

// Run the optimization
optimizeImages(); 