"use client"
import Link from "next/link";
import products from "@/data/products.json";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>
          <p className="text-gray-500">
            Manage your store products.
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="border-b bg-(--background)">
            <tr>
              <th className="px-4 py-3 text-left">
                Product
              </th>

              <th className="px-4 py-3 text-left">
                Category
              </th>

              <th className="px-4 py-3 text-left">
                Price
              </th>

              <th className="px-4 py-3 text-left">
                Rating
              </th>

              <th className="px-4 py-3 text-left">
                Stock
              </th>

              <th className="px-4 py-3 text-left">
                Badge
              </th>

              <th className="px-4 py-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b"
              >
                {/* Product */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`/ProductsMedia/img/${product.image || "cartimg.avif"}`}
                      alt={product.name}
                      className="h-14 w-14 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-medium">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-4">
                  {product.category}
                </td>

                {/* Price */}
                <td className="px-4 py-4">
                  ${product.price}
                </td>

                {/* Rating */}
                <td className="px-4 py-4">
                  ⭐ {product.rating}
                </td>

                {/* Stock */}
                <td className="px-4 py-4">
                  {product.stock}
                </td>

                {/* Badge */}
                <td className="px-4 py-4">
                  <span className="rounded-full border px-3 py-1 text-sm">
                    {product.badge}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="rounded border px-3 py-1"
                    >
                      Edit
                    </Link>

                    <button className="rounded border border-red-500 px-3 py-1 text-red-500"
                      onClick={() => setSelectedProduct(product)}>
                      Delete
                    </button>

                    {selectedProduct && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                        <div className="w-96 rounded-xl bg-(--background-card) p-6">
                          <h2 className="text-xl font-bold">
                            Delete Product
                          </h2>

                          <p className="mt-2">
                            Are you sure you want to delete
                            <strong> {selectedProduct.name}</strong> ?
                          </p>

                          <div className="mt-6 flex justify-end gap-3">
                            <button
                              onClick={() => setSelectedProduct(null)}
                              className="rounded border px-4 py-2"
                            >
                              Cancel
                            </button>

                            <button
                              className="rounded bg-red-600 px-4 py-2 text-white"
                              onClick={async () => {
                                try {
                                  const response = await fetch(
                                    `/api/products/${selectedProduct.id}`,
                                    {
                                      method: "DELETE",
                                    }
                                  );

                                  if (!response.ok) {
                                    throw new Error("Delete failed");
                                  }

                                  setSelectedProduct(null);

                                  router.refresh();
                                } catch (error) {
                                  console.error(error);
                                  alert("Failed to delete product");
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}