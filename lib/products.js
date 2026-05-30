import products from "@/data/products.json";

export function getProducts() {
  return products;
}

export function getFeaturedProducts(limit = 4) {
  return products.slice(0, limit);
}

export function getCategories() {
  return ["All", ...new Set(products.map((product) => product.category))];
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
