"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "../lib/products";

export default function CheckoutView() {
  const { items, totals, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setPlaced(true);
    clearCart();
  }

  if (placed) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <div
          className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full text-3xl"
          style={{ backgroundColor: "var(--brand-faint)", color: "var(--brand)" }}
        >
          ✓
        </div>
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>
          Order placed
        </p>
        <h1 className="mt-3 text-4xl font-black" style={{ color: "var(--foreground)" }}>
          Thank you for shopping Aurevia.
        </h1>
        <p className="mx-auto mt-4 max-w-xl" style={{ color: "var(--foreground-muted)" }}>
          Your demo order has been received. A confirmation would normally land in your inbox within a few minutes.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex rounded-full px-6 py-3 text-sm font-bold text-(--background) transition-all hover:scale-105"
          style={{ backgroundColor: "var(--foreground)" }}
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>
          Checkout
        </p>
        <h1 className="mt-3 text-4xl font-black" style={{ color: "var(--foreground)" }}>
          Add products before placing an order.
        </h1>
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
          Secure checkout
        </p>
        <h1 className="mt-2 text-4xl font-black" style={{ color: "var(--foreground)" }}>
          Place your order
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-[1fr_380px]"
      >
        {/* Form fields */}
        <div
          className="grid gap-6 rounded-2xl p-6"
          style={{
            backgroundColor: "var(--background-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Field label="Full name"     name="name"    placeholder="Zaid Khan" />
          <Field label="Email"         name="email"   type="email" placeholder="zaid@example.com" />
          <Field label="Phone"         name="phone"   placeholder="+91 98765 43210" />
          <Field label="Street address" name="address" placeholder="42 Green Avenue" />
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="City"     name="city" placeholder="Mumbai" />
            <Field label="ZIP code" name="zip"  placeholder="400001" />
          </div>
          <label className="grid gap-2">
            <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
              Delivery note
            </span>
            <textarea
              name="note"
              rows="4"
              className="rounded-xl px-4 py-3 text-sm outline-none transition"
              style={{
                backgroundColor: "var(--background-subtle)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              }}
              placeholder="Any delivery instruction"
            />
          </label>
        </div>

        {/* Order summary sidebar */}
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
          <div className="mt-5 grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <Image
                  src={`/ProductsMedia/img/${item.image}`}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    {item.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--foreground-faint)" }}>
                    Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div
            className="mt-6 grid gap-3 pt-5 text-sm"
            style={{
              borderTop: "1px solid var(--border)",
              color: "var(--foreground-muted)",
            }}
          >
            <div className="flex justify-between">
              <span>Subtotal</span><span>{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{totals.shipping ? formatPrice(totals.shipping) : "Free"}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span><span>{formatPrice(totals.tax)}</span>
            </div>
            <div
              className="flex justify-between pt-3 text-lg font-black"
              style={{ color: "var(--foreground)" }}
            >
              <span>Total</span><span>{formatPrice(totals.total)}</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full px-5 py-3 text-sm font-black transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: "var(--accent)", color: "var(--cta-text)" }}
          >
            Confirm order
          </button>
        </aside>
      </form>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
        {label}
      </span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-xl px-4 py-3 text-sm outline-none transition"
        style={{
          backgroundColor: "var(--background-subtle)",
          border: "1px solid var(--border)",
          color: "var(--foreground)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--brand)";
          e.currentTarget.style.boxShadow = "0 0 0 3px var(--brand-faint)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </label>
  );
}
