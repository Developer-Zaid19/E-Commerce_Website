"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/products";

export default function CartView() {
  const { items, totals, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>
          Your cart
        </p>
        <h1 className="mt-3 text-4xl font-black" style={{ color: "var(--foreground)" }}>
          Cart is waiting for something good.
        </h1>
        <p className="mx-auto mt-4 max-w-xl" style={{ color: "var(--foreground-muted)" }}>
          Add a few products from the collection and your order summary will appear here.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105"
          style={{ backgroundColor: "var(--foreground)" }}
        >
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>
          Your cart
        </p>
        <h1 className="mt-2 text-4xl font-black" style={{ color: "var(--foreground)" }}>
          Review your picks
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-2xl p-4 sm:grid-cols-[140px_1fr_auto] transition-all"
              style={{
                backgroundColor: "var(--background-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={140}
                height={140}
                className="aspect-square w-full rounded-xl object-cover sm:w-[140px]"
              />
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>
                  {item.category}
                </p>
                <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                  {item.name}
                </h2>
                <p className="text-sm leading-6" style={{ color: "var(--foreground-muted)" }}>
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-bold transition hover:opacity-70"
                  style={{ color: "#ef4444" }}
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <span className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                  {formatPrice(item.price * item.quantity)}
                </span>
                {/* Qty controls */}
                <div
                  className="flex items-center overflow-hidden rounded-full"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-10 w-10 text-lg font-bold transition"
                    style={{ color: "var(--foreground)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--background-subtle)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    aria-label={`Decrease ${item.name}`}
                  >
                    −
                  </button>
                  <span
                    className="grid h-10 w-10 place-items-center text-sm font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-10 w-10 text-lg font-bold transition"
                    style={{ color: "var(--foreground)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--background-subtle)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    aria-label={`Increase ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Order summary */}
        <aside
          className="h-fit rounded-2xl p-6"
          style={{
            backgroundColor: "var(--background-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <h2 className="text-xl font-black" style={{ color: "var(--foreground)" }}>
            Order summary
          </h2>
          <div className="mt-6 grid gap-4 text-sm">
            <SummaryLine label="Subtotal"      value={formatPrice(totals.subtotal)} />
            <SummaryLine label="Shipping"      value={totals.shipping ? formatPrice(totals.shipping) : "Free"} />
            <SummaryLine label="Estimated tax" value={formatPrice(totals.tax)} />
            <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <SummaryLine label="Total" value={formatPrice(totals.total)} strong />
            </div>
          </div>
          <Link
            href="/place-order"
            className="mt-6 flex w-full justify-center rounded-full px-5 py-3 text-sm font-black transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: "var(--accent)", color: "var(--cta-text)" }}
          >
            Place order
          </Link>
        </aside>
      </div>
    </section>
  );
}

function SummaryLine({ label, value, strong = false }) {
  return (
    <div
      className="flex items-center justify-between gap-4"
      style={{
        color: strong ? "var(--foreground)" : "var(--foreground-muted)",
        fontWeight: strong ? 900 : 400,
        fontSize: strong ? "1.1rem" : "0.875rem",
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
