"use client";

import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice } from "../lib/products";

export default function ProductCard({ product }) {
  return (
    <article
      className="group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "var(--background-card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-xl)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      }}
    >
      {/* Image */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: "var(--background-subtle)" }}
      >
        <Image
          src={`/ProductsMedia/img/${product.image || "cartimg.avif"}`}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Badge */}
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm"
          style={{
            backgroundColor: "var(--background-card)",
            color: "var(--foreground)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {product.badge}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div
            className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wide"
            style={{ color: "var(--brand)" }}
          >
            <span>{product.category}</span>
            <span
              className="flex items-center gap-1"
              style={{ color: "var(--foreground-faint)" }}
            >
              ★ {product.rating}
            </span>
          </div>
          <h3
            className="text-base font-bold leading-snug"
            style={{ color: "var(--foreground)" }}
          >
            {product.name}
          </h3>
          <p
            className="line-clamp-2 text-sm leading-6"
            style={{ color: "var(--foreground-muted)" }}
          >
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-xl font-black" style={{ color: "var(--foreground)" }}>
            {formatPrice(product.price)}
          </span>
          <AddToCartButton productId={product.id} compact />
        </div>
      </div>
    </article>
  );
}
