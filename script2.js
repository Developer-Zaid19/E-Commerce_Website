const fs = require("fs");

async function generateEmbeddings(products) {
  for (const product of products) {
    try {

      product.embedding = [];

      console.log(`✓ clear: ${product.embedding}`);
    } catch (err) {
      console.error(`✗ err: ${product.embedding}`, err.message);

      product.embedding = [];
    }
  }

  return products;
}

(async () => {
  const products = JSON.parse(
    fs.readFileSync("./data/products.json", "utf8")
  );

  const updatedProducts = await generateEmbeddings(products);

  fs.writeFileSync(
    "./products3.json",
    JSON.stringify(updatedProducts, null, 2)
  );

  console.log("Done!");
})();