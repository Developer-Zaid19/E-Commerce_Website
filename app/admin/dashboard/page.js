import products from "@/data/products.json";

export default function DashboardPage() {
  const totalProducts = products.length;

  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const averageRating =
    products.length > 0
      ? (
          products.reduce(
            (sum, product) => sum + product.rating,
            0
          ) / products.length
        ).toFixed(1)
      : 0;

  const recentProducts = [...products]
    .reverse()
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your e-commerce products and search system.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border p-5">
          <h3 className="text-sm text-gray-500">
            Total Products
          </h3>
          <p className="mt-2 text-3xl font-bold">
            {totalProducts}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="text-sm text-gray-500">
            Categories
          </h3>
          <p className="mt-2 text-3xl font-bold">
            {totalCategories}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="text-sm text-gray-500">
            Total Stock
          </h3>
          <p className="mt-2 text-3xl font-bold">
            {totalStock}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="text-sm text-gray-500">
            Average Rating
          </h3>
          <p className="mt-2 text-3xl font-bold">
            ⭐ {averageRating}
          </p>
        </div>
      </div>

      {/* Recent Products */}
      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Products
        </h2>

        <div className="space-y-4">
          {recentProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-3 last:border-b-0"
            >
              <div>
                <h3 className="font-medium">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.category}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ${product.price}
                </p>

                <p className="text-sm text-gray-500">
                  Stock: {product.stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vector Search Status */}
      <div className="rounded-xl border p-6">
        <h2 className="mb-2 text-xl font-semibold">
          Vector Search
        </h2>

        <p className="text-gray-600">
          Embeddings are enabled for product search.
        </p>

        <p className="mt-2 font-medium text-green-600">
          ✓ Semantic Search Ready
        </p>
      </div>
    </div>
  );
}