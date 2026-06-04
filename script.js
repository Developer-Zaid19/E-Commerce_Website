const fs = require("fs");

async function generateEmbeddings(products) {
  for (const product of products) {
    const text = `
${product.name}
${product.category}
${product.description}
`.trim();

    try {
      const response = await fetch("http://localhost:8000/api/embed/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      product.embedding = data.embedding;

      console.log(`✓ Embedded: ${product.name}`);
    } catch (err) {
      console.error(`✗ Failed: ${product.name}`, err.message);

      product.embedding = null;
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
    "./products-with-embeddings.json",
    JSON.stringify(updatedProducts, null, 2)
  );

  console.log("Done!");
})();