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
      className={`rounded-full bg-neutral-950 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
        compact ? "px-4 py-2" : "px-5 py-3"
      }`}
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
