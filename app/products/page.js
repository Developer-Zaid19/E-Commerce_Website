import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/products";

export const metadata = {
  title: "Products | Aurevia Market",
};

export default function ProductsPage() {
  const products   = getProducts();
  const categories = getCategories();

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: "var(--brand)" }}
          >
            Collection
          </p>
          <h1 className="mt-2 text-4xl font-black" style={{ color: "var(--foreground)" }}>
            Products for better everyday living
          </h1>
          <p className="mt-4 max-w-2xl leading-7" style={{ color: "var(--foreground-muted)" }}>
            Randomly generated ecommerce inventory stored in JSON, displayed as
            a clean responsive product grid.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full px-4 py-2 text-sm font-bold transition"
              style={{
                backgroundColor: "var(--background-card)",
                border: "1px solid var(--border)",
                color: "var(--foreground-muted)",
              }}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
