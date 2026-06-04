"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

const EMBED_ENDPOINT = "/api/embed";

export default function ProductSearch({ products }) {
  const [query, setQuery] = useState("");
  const [rankedProducts, setRankedProducts] = useState(products);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const hasEmbeddings = useMemo(
    () => products.some((product) => Array.isArray(product.embedding)),
    [products],
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const text = query.trim();

    if (!text) {
      setRankedProducts(products);
      setStatus("idle");
      setMessage("");
      return;
    }
    console.log(text, "mai hun jyan")

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(EMBED_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      console.log(text, "mai hun jyan")

      if (!response.ok) {
        throw new Error(`Embedding API returned ${response.status}`);
      }

      const payload = await response.json();
      const queryEmbedding = extractEmbedding(payload);

      if (!Array.isArray(queryEmbedding) || queryEmbedding.length === 0) {
        throw new Error("Embedding API response did not include an embedding array");
      }

      const ranked = products
        .map((product) => ({
          ...product,
          similarity: cosineSimilarity(queryEmbedding, product.embedding),
        }))
        .filter((product) => Number.isFinite(product.similarity))
        .sort((a, b) => b.similarity - a.similarity);

      setRankedProducts(ranked);
      setStatus("success");
      setMessage(`Showing ${ranked.length} semantic matches for "${text}".`);
    } catch (error) {
      setRankedProducts(products);
      setStatus("error");
      setMessage(error.message || "Vector search failed. Please try again.");
    }
  }

  function resetSearch() {
    setQuery("");
    setRankedProducts(products);
    setStatus("idle");
    setMessage("");
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 rounded-2xl p-4 sm:grid-cols-[1fr_auto_auto]"
        style={{
          backgroundColor: "var(--background-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products with vector search..."
          className="min-h-12 rounded-full px-5 text-sm font-semibold outline-none transition"
          style={{
            backgroundColor: "var(--background-subtle)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
          aria-label="Search products"
        />
        <button
          type="submit"
          disabled={status === "loading" || !hasEmbeddings}
          className="min-h-12 rounded-full px-6 text-sm font-black transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--cta-text)",
          }}
        >
          {status === "loading" ? "Searching..." : "Search"}
        </button>
        <button
          type="button"
          onClick={resetSearch}
          className="min-h-12 rounded-full px-6 text-sm font-bold transition-all hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "var(--background-subtle)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        >
          Reset
        </button>
      </form>

      {message ? (
        <p
          className="text-sm font-semibold"
          style={{
            color: status === "error" ? "var(--danger, #dc2626)" : "var(--foreground-muted)",
          }}
        >
          {message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rankedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function extractEmbedding(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.embedding)) return payload.embedding;
  if (Array.isArray(payload?.data?.embedding)) return payload.data.embedding;
  if (Array.isArray(payload?.data?.[0]?.embedding)) return payload.data[0].embedding;
  if (Array.isArray(payload?.result?.embedding)) return payload.result.embedding;
  return null;
}

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return Number.NEGATIVE_INFINITY;

  const length = Math.min(a.length, b.length);
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let index = 0; index < length; index += 1) {
    const left = Number(a[index]);
    const right = Number(b[index]);

    if (!Number.isFinite(left) || !Number.isFinite(right)) {
      continue;
    }

    dot += left * right;
    normA += left * left;
    normB += right * right;
  }

  if (normA === 0 || normB === 0) {
    return Number.NEGATIVE_INFINITY;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
