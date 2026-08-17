const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

async function optimizeImages() {
  const files = glob.sync(`${imagesDir}/**/*.{jpg,jpeg,png}`);
  console.log(`Found ${files.length} images to optimize.`);
  
  let totalSaved = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const tempFile = file + '.tmp';
    
    try {
      const originalSize = fs.statSync(file).size;
      
      let sharpInstance = sharp(file).resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
      });

      if (ext === '.jpg' || ext === '.jpeg') {
        sharpInstance = sharpInstance.jpeg({ quality: 75, progressive: true });
      } else if (ext === '.png') {
        sharpInstance = sharpInstance.png({ compressionLevel: 8, adaptiveFiltering: true });
      }

      await sharpInstance.toFile(tempFile);
      
      const newSize = fs.statSync(tempFile).size;
      
      if (newSize < originalSize) {
        fs.renameSync(tempFile, file);
        totalSaved += (originalSize - newSize);
        console.log(`Optimized: ${path.basename(file)} (-${Math.round((originalSize - newSize) / 1024)} KB)`);
      } else {
        fs.unlinkSync(tempFile);
      }
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err.message);
    }
  }

  console.log(`Optimization complete. Total saved: ${Math.round(totalSaved / 1024 / 1024)} MB`);
}

optimizeImages();
