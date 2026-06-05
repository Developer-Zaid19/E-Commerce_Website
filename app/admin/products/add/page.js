"use client";

import { useState } from "react";
import products from "@/data/products.json";

export default function AddProductPage() {

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [embedding, setEmbedding] = useState([]);
  const [embeddingLoading, setEmbeddingLoading] = useState(false);
  const [embeddingError, setEmbeddingError] = useState("");

  const categories = [
    ...new Set(products.map((p) => p.category))
  ].sort();

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    rating: "",
    stock: "",
    badge: "",
    image: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function generateEmbedding() {
    try {
      setEmbeddingLoading(true);
      setEmbeddingError("");

      const text = `
      ${formData.name}
      ${formData.category}
      ${formData.description}
    `.trim();

      const response = await fetch("/api/embed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to generate embedding"
        );
      }

      const data = await response.json();

      setEmbedding(data.embedding || []);
    } catch (error) {
      console.error(error);

      setEmbeddingError(
        "Failed to generate embedding"
      );
    } finally {
      setEmbeddingLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let imageName = "";

      // Upload image first
      if (imageFile) {
        const uploadForm = new FormData();

        uploadForm.append("file", imageFile);

        const uploadResponse = await fetch(
          "/api/upload",
          {
            method: "POST",
            body: uploadForm,
          }
        );

        const uploadData =
          await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(
            uploadData.message ||
            "Image upload failed"
          );
        }

        imageName = uploadData.fileName;
      }

      // Save product
      const response = await fetch(
        "/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...formData,
            image: imageName,
            price: Number(formData.price),
            rating: Number(formData.rating),
            stock: Number(formData.stock),

            // embedding state use karo agar generate hui ho
            embedding:
              embedding.length > 0
                ? embedding
                : [],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to add product"
        );
      }

      alert("Product added successfully!");

      setFormData({
        id: "",
        name: "",
        category: "",
        price: "",
        rating: "",
        stock: "",
        badge: "",
        image: "",
        description: "",
      });

      setImageFile(null);
      setPreviewUrl("");
      setEmbedding([]);

      console.log(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new product for your store.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border p-6"
      >
        {/* Product ID */}
        <div>
          <label className="mb-2 block font-medium">
            Product ID
          </label>

          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="aur-1037"
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="mb-2 block font-medium">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Wireless Keyboard"
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg p-3"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            required
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price + Rating */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="99"
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Rating
            </label>

            <input
              type="number"
              step="0.1"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
              className="w-full rounded-lg border p-3"
              required
            />
          </div>
        </div>

        {/* Stock + Badge */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="100"
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Badge
            </label>

            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="Best Seller"
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="mb-2 block font-medium">
            Image URL
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-40 w-40 rounded-xl object-cover"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Product description..."
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* embedding preview */}
        {embedding.length > 0 && (
          <div
            className="rounded-xl p-4"
            style={{
              background:
                "var(--background-subtle)",
            }}
          >
            <h3>
              Embedding Preview
            </h3>

            <pre>
              {JSON.stringify(
                embedding.slice(0, 20),
                null,
                2
              )}
            </pre>
          </div>
        )}

        {embeddingError && (
          <p
            style={{
              color: "#dc2626",
            }}
          >
            {embeddingError}
          </p>
        )}

        {/* embedding */}
        <button
          type="button"
          onClick={generateEmbedding}
        >
          Generate Embedding
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}