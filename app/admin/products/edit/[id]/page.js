"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import products from "@/data/products.json";

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const [embedding, setEmbedding] = useState([]);
    const [embeddingLoading, setEmbeddingLoading] = useState(false);
    const [embeddingError, setEmbeddingError] = useState("");

    const categories = [
        ...new Set(products.map((p) => p.category)),
    ].sort();

    useEffect(() => {
        const product = products.find(
            (item) => item.id === id
        );

        if (product) {
            setFormData(product);
            setEmbedding(product.embedding || []);
        }
    }, [id]);


    function handleImageChange(e) {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
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
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Embedding failed"
                );
            }

            setEmbedding(data.embedding || []);
        } catch (error) {
            setEmbeddingError(error.message);
        } finally {
            setEmbeddingLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            let imageName = formData.image;

            if (imageFile) {
                const uploadForm = new FormData();

                uploadForm.append(
                    "file",
                    imageFile
                );

                const uploadResponse =
                    await fetch("/api/upload", {
                        method: "POST",
                        body: uploadForm,
                    });

                const uploadData =
                    await uploadResponse.json();

                if (!uploadResponse.ok) {
                    throw new Error(
                        uploadData.message
                    );
                }

                imageName =
                    uploadData.fileName;
            }

            const response = await fetch(
                `/api/products/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        image: imageName,
                        embedding,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message
                );
            }

            alert(
                "Product updated successfully"
            );

            router.push(
                "/admin/products"
            );
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            let imageName = formData.image;

            if (imageFile) {
                const uploadForm = new FormData();

                uploadForm.append(
                    "file",
                    imageFile
                );

                const uploadResponse =
                    await fetch("/api/upload", {
                        method: "POST",
                        body: uploadForm,
                    });

                const uploadData =
                    await uploadResponse.json();

                if (!uploadResponse.ok) {
                    throw new Error(
                        uploadData.message
                    );
                }

                imageName =
                    uploadData.fileName;
            }

            const response = await fetch(
                `/api/products/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        image: imageName,
                        embedding,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message
                );
            }

            alert(
                "Product updated successfully"
            );

            router.push(
                "/admin/products"
            );
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    if (!formData) {
        return (
            <div
                style={{
                    color: "var(--foreground-muted)",
                }}
            >
                Loading product...
            </div>
        );
    }

    return (
        <div className="max-w-5xl">
            {/* Header */}
            <div className="mb-8">
                <h1
                    className="text-3xl font-bold"
                    style={{
                        color: "var(--foreground)",
                    }}
                >
                    Edit Product
                </h1>

                <p
                    className="mt-2"
                    style={{
                        color: "var(--foreground-muted)",
                    }}
                >
                    Update product information.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl p-6"
                style={{
                    background: "var(--background-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)",
                }}
            >
                {/* ID */}
                <div>
                    <label
                        className="mb-2 block font-medium"
                        style={{
                            color: "var(--foreground)",
                        }}
                    >
                        Product ID
                    </label>

                    <input
                        type="text"
                        value={formData.id}
                        disabled
                        className="w-full rounded-lg p-3"
                        style={{
                            background: "var(--background-subtle)",
                            border: "1px solid var(--border)",
                            color: "var(--foreground-muted)",
                        }}
                    />
                </div>

                {/* Name */}
                <div>
                    <label
                        className="mb-2 block font-medium"
                        style={{
                            color: "var(--foreground)",
                        }}
                    >
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-lg p-3"
                        style={{
                            background: "var(--background)",
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                        }}
                    />
                </div>

                {/* Category */}
                <div>
                    <label
                        className="mb-2 block font-medium"
                        style={{
                            color: "var(--foreground)",
                        }}
                    >
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
                    >
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
                        <label
                            className="mb-2 block font-medium"
                            style={{
                                color: "var(--foreground)",
                            }}
                        >
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3"
                            style={{
                                background: "var(--background)",
                                border: "1px solid var(--border)",
                                color: "var(--foreground)",
                            }}
                        />
                    </div>

                    <div>
                        <label
                            className="mb-2 block font-medium"
                            style={{
                                color: "var(--foreground)",
                            }}
                        >
                            Rating
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3"
                            style={{
                                background: "var(--background)",
                                border: "1px solid var(--border)",
                                color: "var(--foreground)",
                            }}
                        />
                    </div>
                </div>

                {/* Stock + Badge */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label
                            className="mb-2 block font-medium"
                            style={{
                                color: "var(--foreground)",
                            }}
                        >
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3"
                            style={{
                                background: "var(--background)",
                                border: "1px solid var(--border)",
                                color: "var(--foreground)",
                            }}
                        />
                    </div>

                    <div>
                        <label
                            className="mb-2 block font-medium"
                            style={{
                                color: "var(--foreground)",
                            }}
                        >
                            Badge
                        </label>

                        <input
                            type="text"
                            name="badge"
                            value={formData.badge}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3"
                            style={{
                                background: "var(--background)",
                                border: "1px solid var(--border)",
                                color: "var(--foreground)",
                            }}
                        />
                    </div>
                </div>

                {/* Image */}
                <div>
                    <label
                        className="mb-2 block font-medium"
                        style={{
                            color: "var(--foreground)",
                        }}
                    >
                        Product Image
                    </label>

                    <div className="mb-4">
                        <Image
                            src={
                                previewUrl ||
                                `/ProductsMedia/img/${formData.image}`
                            }
                            alt={formData.name}
                            width={200}
                            height={200}
                            className="rounded-xl object-cover"
                        />
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        className="mb-2 block font-medium"
                        style={{
                            color: "var(--foreground)",
                        }}
                    >
                        Description
                    </label>

                    <textarea
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-lg p-3"
                        style={{
                            background: "var(--background)",
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                        }}
                    />
                </div>

                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={generateEmbedding}
                        disabled={embeddingLoading}
                        className="rounded-lg px-4 py-2"
                        style={{
                            background: "var(--brand)",
                            color: "#fff",
                        }}
                    >
                        {embeddingLoading
                            ? "Generating..."
                            : "Generate Embedding"}
                    </button>

                    {embeddingError && (
                        <p className="text-red-500">
                            {embeddingError}
                        </p>
                    )}

                    {embedding.length > 0 && (
                        <div
                            className="rounded-lg p-4"
                            style={{
                                background:
                                    "var(--background-subtle)",
                            }}
                        >
                            <strong>
                                Embedding Preview
                            </strong>

                            <pre className="mt-2 overflow-auto text-xs">
                                {JSON.stringify(
                                    embedding.slice(0, 20),
                                    null,
                                    2
                                )}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="rounded-lg px-5 py-3 font-medium"
                        style={{
                            background: "var(--brand)",
                            color: "#fff",
                        }}
                    >
                        Save Changes
                    </button>

                    <button
                        type="button"
                        className="rounded-lg px-5 py-3"
                        style={{
                            background: "var(--background-subtle)",
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}