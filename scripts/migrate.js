const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const http = require('http');

const prisma = new PrismaClient();

const WP_API_URL = "http://vicards.local/wp-json/wc/store/products?per_page=100";
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Helper to download an image
async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(IMAGES_DIR, filename);
    if (fs.existsSync(dest)) {
      console.log(`Image already exists: ${filename}`);
      return resolve(`/images/${filename}`);
    }
    const file = fs.createWriteStream(dest);
    http.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(`/images/${filename}`));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Function to clean filename
function getFilenameFromUrl(url) {
  const parts = url.split('/');
  return `${Date.now()}-${parts[parts.length - 1]}`;
}

async function migrate() {
  console.log("Fetching products from WP API...");
  try {
    const response = await fetch(WP_API_URL);
    const products = await response.json();
    console.log(`Found ${products.length} products to import.`);

    for (const wpProduct of products) {
      console.log(`\nImporting: ${wpProduct.name}`);

      // 1. Handle Category
      let categoryId = null;
      if (wpProduct.categories && wpProduct.categories.length > 0) {
        const catName = wpProduct.categories[0].name;
        let category = await prisma.category.findFirst({ where: { name: catName } });
        if (!category) {
          const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          category = await prisma.category.create({ data: { name: catName, slug, image: "/images/placeholder.jpg" } });
          console.log(`Created Category: ${catName}`);
        }
        categoryId = category.id;
      }

      // If no category could be determined, assign to a default one
      if (!categoryId) {
        let category = await prisma.category.findFirst({ where: { name: "Sin Categoría" } });
        if (!category) {
          category = await prisma.category.create({ data: { name: "Sin Categoría", slug: "sin-categoria", image: "/images/placeholder.jpg" } });
        }
        categoryId = category.id;
      }

      // 2. Handle Price
      let priceStr = wpProduct.prices?.price || "0";
      // WooCommerce prices in API are often in minor units (cents) or as exact strings.
      // Wait, in the JSON sample it was "0". The API docs for `price` say it's integer in minor units for Store API,
      // but in the example `currency_minor_unit` was 0, meaning it's the exact integer.
      // We will parse it to float.
      const price = parseFloat(priceStr) || 0;

      // 3. Handle Images
      let mainImagePath = "/images/placeholder.jpg";
      const galleryPaths = [];

      if (wpProduct.images && wpProduct.images.length > 0) {
        for (let i = 0; i < wpProduct.images.length; i++) {
          const wpImg = wpProduct.images[i];
          const filename = getFilenameFromUrl(wpImg.src);
          console.log(`Downloading image: ${wpImg.src}`);
          try {
            const localPath = await downloadImage(wpImg.src, filename);
            if (i === 0) {
              mainImagePath = localPath;
            } else {
              galleryPaths.push(localPath);
            }
          } catch (e) {
            console.error(`Failed to download image ${wpImg.src}: ${e.message}`);
          }
        }
      }

      // 4. Save to Database
      // Check if product exists (by name to avoid duplicates)
      let product = await prisma.product.findFirst({ where: { name: wpProduct.name } });
      if (product) {
        console.log(`Product already exists, skipping creation: ${wpProduct.name}`);
      } else {
        product = await prisma.product.create({
          data: {
            name: wpProduct.name,
            price: price,
            categoryId: categoryId,
            image: mainImagePath
          }
        });
        console.log(`Created Product: ${product.name}`);

        // Add gallery images
        for (const galleryPath of galleryPaths) {
          await prisma.productImage.create({
            data: {
              url: galleryPath,
              productId: product.id
            }
          });
          console.log(`Added gallery image for ${product.name}`);
        }
      }
    }
    console.log("\nMigration completed successfully!");
  } catch (err) {
    console.error("Error during migration:", err);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
