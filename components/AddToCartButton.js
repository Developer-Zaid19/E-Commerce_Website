"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({ productId, compact = false }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(productId);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
      style={{
        backgroundColor: added ? "var(--brand)" : "var(--foreground)",
        color: added ? "#fff" : "var(--background)",
        padding: compact ? "0.4rem 1rem" : "0.6rem 1.25rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {added ? "✓ Added" : "Add to cart"}
    </button>
  );
}
