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
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
          Your cart
        </p>
        <h1 className="mt-3 text-4xl font-black text-neutral-950">
          Cart is waiting for something good.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-neutral-600">
          Add a few products from the collection and your order summary will
          appear here.
        </p>
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
          Your cart
        </p>
        <h1 className="mt-2 text-4xl font-black text-neutral-950">
          Review your picks
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm sm:grid-cols-[140px_1fr_auto]"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={140}
                height={140}
                className="aspect-square w-full rounded-lg object-cover sm:w-[140px]"
              />
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                  {item.category}
                </p>
                <h2 className="text-xl font-bold text-neutral-950">
                  {item.name}
                </h2>
                <p className="text-sm leading-6 text-neutral-600">
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-bold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <span className="text-lg font-black text-neutral-950">
                  {formatPrice(item.price * item.quantity)}
                </span>
                <div className="flex items-center overflow-hidden rounded-full border border-neutral-300">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-10 w-10 text-lg font-bold hover:bg-neutral-100"
                    aria-label={`Decrease ${item.name}`}
                  >
                    -
                  </button>
                  <span className="grid h-10 w-10 place-items-center text-sm font-bold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-10 w-10 text-lg font-bold hover:bg-neutral-100"
                    aria-label={`Increase ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-neutral-950">Order summary</h2>
          <div className="mt-6 grid gap-4 text-sm">
            <SummaryLine label="Subtotal" value={formatPrice(totals.subtotal)} />
            <SummaryLine label="Shipping" value={totals.shipping ? formatPrice(totals.shipping) : "Free"} />
            <SummaryLine label="Estimated tax" value={formatPrice(totals.tax)} />
            <div className="border-t border-neutral-200 pt-4">
              <SummaryLine
                label="Total"
                value={formatPrice(totals.total)}
                strong
              />
            </div>
          </div>
          <Link
            href="/place-order"
            className="mt-6 flex w-full justify-center rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-neutral-950 hover:bg-amber-300"
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
      className={`flex items-center justify-between gap-4 ${
        strong ? "text-lg font-black text-neutral-950" : "text-neutral-700"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
