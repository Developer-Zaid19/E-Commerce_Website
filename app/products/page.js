import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/products";

export const metadata = {
  title: "Products | Aurevia Market",
};

export default function ProductsPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Collection
          </p>
          <h1 className="mt-2 text-4xl font-black text-neutral-950">
            Products for better everyday living
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
            Randomly generated ecommerce inventory stored in JSON, displayed as
            a clean responsive product grid.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-bold text-neutral-700"
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
