import products from "../data/products.json"

export async function getProducts() {
    try {
      const local = products;
      return local.default ?? local;
    } catch (e) {
      // As a last resort return an empty array
      return [];
    }
  }

export async function getFeaturedProducts(limit = 4) {
  const products = await getProducts();
  return products.slice(0, limit);
}

export function getCategories(products = []) {
  return ["All", ...new Set(products.map((product) => product.category))];
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
