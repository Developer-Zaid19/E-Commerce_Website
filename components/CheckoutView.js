"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/products";

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
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
          Order placed
        </p>
        <h1 className="mt-3 text-4xl font-black text-neutral-950">
          Thank you for shopping Aurevia.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-neutral-600">
          Your demo order has been received. A confirmation would normally land
          in your inbox within a few minutes.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
          Checkout
        </p>
        <h1 className="mt-3 text-4xl font-black text-neutral-950">
          Add products before placing an order.
        </h1>
        <Link
          href="/products"
          className="mt-8 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
        >
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
          Secure checkout
        </p>
        <h1 className="mt-2 text-4xl font-black text-neutral-950">
          Place your order
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <Field label="Full name" name="name" placeholder="Zaid Khan" />
          <Field label="Email" name="email" type="email" placeholder="zaid@example.com" />
          <Field label="Phone" name="phone" placeholder="+1 555 123 4567" />
          <Field label="Street address" name="address" placeholder="42 Green Avenue" />
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="City" name="city" placeholder="Seattle" />
            <Field label="ZIP code" name="zip" placeholder="98101" />
          </div>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-neutral-800">Delivery note</span>
            <textarea
              name="note"
              rows="4"
              className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              placeholder="Any delivery instruction"
            />
          </label>
        </div>

        <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-neutral-950">Order summary</h2>
          <div className="mt-5 grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-neutral-950">{item.name}</p>
                  <p className="text-xs text-neutral-500">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-neutral-950">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 border-t border-neutral-200 pt-5 text-sm text-neutral-700">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(totals.subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{totals.shipping ? formatPrice(totals.shipping) : "Free"}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatPrice(totals.tax)}</span></div>
            <div className="flex justify-between pt-3 text-lg font-black text-neutral-950">
              <span>Total</span><span>{formatPrice(totals.total)}</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-neutral-950 hover:bg-amber-300"
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
      <span className="text-sm font-bold text-neutral-800">{label}</span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}
