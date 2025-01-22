const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const images = [
  {
    url: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    output: "pastel-frutos-rojos.webp",
    width: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
    output: "macarons.webp",
    width: 300,
  },
  {
    url: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
    output: "croissants.webp",
    width: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    output: "pastel-cumpleanos.webp",
    width: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1616690710400-a16d146927c5",
    output: "cupcakes.webp",
    width: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1557308536-ee471ef2c390",
    output: "pasteles.webp",
    width: 300,
  },
  {
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
    output: "chef.webp",
    width: 300,
  },
];

async function downloadAndOptimizeImage(image) {
  try {
    const response = await fetch(image.url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await sharp(buffer)
      .resize(image.width)
      .webp({
        quality: 65,
        effort: 6,
        preset: "picture",
        smartSubsample: true,
        reductionEffort: 6,
        nearLossless: true,
      })
      .toFile(path.join("public", "images", image.output));

    console.log(`✅ Optimized: ${image.output}`);
  } catch (error) {
    console.error(`❌ Error processing ${image.output}:`, error);
  }
}

async function main() {
  for (const image of images) {
    await downloadAndOptimizeImage(image);
  }
}

main().catch(console.error);
