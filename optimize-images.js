const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');

// Function to optimize an image
async function optimizeImage(inputPath, outputPath) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Calculate new dimensions while maintaining aspect ratio
        let width = metadata.width;
        let height = metadata.height;

        // If image is too large, resize it
        if (width > 1200) {
            height = Math.round((height * 1200) / width);
            width = 1200;
        }

        // Optimize the image
        await image
            .resize(width, height)
            .jpeg({ quality: 80, progressive: true })
            .toFile(outputPath);

        console.log(`Optimized: ${path.basename(inputPath)}`);
    } catch (error) {
        console.error(`Error optimizing ${inputPath}:`, error);
    }
}

// Process all images in the assets directory
async function processImages() {
    const files = fs.readdirSync(assetsDir);

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(assetsDir, file);
            const outputPath = path.join(assetsDir, `optimized-${file}`);

            await optimizeImage(inputPath, outputPath);

            // Replace original with optimized version
            fs.unlinkSync(inputPath);
            fs.renameSync(outputPath, inputPath);
        }
    }
}

processImages().catch(console.error); 