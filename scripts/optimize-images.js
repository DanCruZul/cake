const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const images = [
  {
    url: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    output: "pastel-frutos-rojos",
    sizes: [300, 400, 600, 750, 828, 1080],
  },
  {
    url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
    output: "macarons",
    sizes: [300, 400, 600, 750],
  },
  {
    url: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
    output: "croissants",
    sizes: [300, 400, 600, 750],
  },
  {
    url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    output: "pastel-cumpleanos",
    sizes: [300, 400, 600, 750, 828],
  },
  {
    url: "https://images.unsplash.com/photo-1616690710400-a16d146927c5",
    output: "cupcakes",
    sizes: [300, 400, 600, 750],
  },
  {
    url: "https://images.unsplash.com/photo-1557308536-ee471ef2c390",
    output: "pasteles",
    sizes: [300, 400, 600],
  },
  {
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
    output: "chef",
    sizes: [300, 400, 600],
  },
];

async function generatePlaceholder(buffer) {
  const placeholder = await sharp(buffer)
    .resize(10, 10, { fit: "inside" })
    .toBuffer();

  return `data:image/jpeg;base64,${placeholder.toString("base64")}`;
}

async function downloadAndOptimizeImage(image) {
  try {
    const response = await fetch(image.url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generar placeholder
    const placeholder = await generatePlaceholder(buffer);

    // Guardar placeholder en un archivo JSON
    const placeholdersPath = path.join("public", "images", "placeholders.json");
    let placeholders = {};
    if (fs.existsSync(placeholdersPath)) {
      placeholders = JSON.parse(fs.readFileSync(placeholdersPath, "utf8"));
    }
    placeholders[image.output] = placeholder;
    fs.writeFileSync(placeholdersPath, JSON.stringify(placeholders, null, 2));

    for (const width of image.sizes) {
      // WebP version
      const webpFilename = `${image.output}-${width}.webp`;
      await sharp(buffer)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: "contain",
        })
        .webp({
          quality: 80,
          effort: 6,
          preset: "picture",
          smartSubsample: true,
          reductionEffort: 6,
        })
        .toFile(path.join("public", "images", webpFilename));

      // AVIF version (mejor compresión pero menor soporte)
      const avifFilename = `${image.output}-${width}.avif`;
      await sharp(buffer)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: "contain",
        })
        .avif({
          quality: 65,
          effort: 9,
        })
        .toFile(path.join("public", "images", avifFilename));

      console.log(`✅ Optimized: ${webpFilename} and ${avifFilename}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${image.output}:`, error);
  }
}

async function main() {
  // Asegurarse que existe el directorio de imágenes
  const imagesDir = path.join("public", "images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const image of images) {
    await downloadAndOptimizeImage(image);
  }
}

main().catch(console.error);
