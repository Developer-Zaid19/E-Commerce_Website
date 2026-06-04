import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import store from "@/data/store.json";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="absolute inset-0" style={{ opacity: 0.45 }}>
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
            alt="Curated ecommerce store interior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Gradient fade bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--background))",
          }}
        />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl content-end gap-8 px-4 pb-14 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p
              className="mb-4 inline-flex rounded-full px-4 py-2 text-sm font-bold backdrop-blur-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}
            >
              {store.tagline}
            </p>
            <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
              {store.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-200">
              Shop well-made home goods, travel tools, wellness essentials, and
              everyday tech from one clean, modern storefront.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="rounded-full px-6 py-3 text-center text-sm font-black transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: "var(--accent)", color: "var(--cta-text)" }}
              >
                Shop collection
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-bold text-white transition-all hover:bg-white hover:text-neutral-950"
              >
                Our story
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-3 sm:grid-cols-3">
            {store.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <p className="text-2xl font-black" style={{ color: "var(--accent)" }}>
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-neutral-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ────────────────────────────────────── */}
      <section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "var(--brand)" }}
            >
              Featured
            </p>
            <h2
              className="mt-2 text-3xl font-black"
              style={{ color: "var(--foreground)" }}
            >
              Fresh picks for the week
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-black underline decoration-4 underline-offset-4"
            style={{
              color: "var(--foreground)",
              textDecorationColor: "var(--accent)",
            }}
          >
            View all products →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--background-card)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ["🚚  Fast delivery",   "Free shipping starts at $120 with transparent delivery estimates."],
            ["✦  Quality first",    "Every product is chosen for useful design, durable materials, and daily value."],
            ["⚡  Easy checkout",   "Cart and order flows stay quick, clean, and mobile friendly."],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-2xl p-6"
              style={{
                borderLeft: "3px solid var(--brand)",
                backgroundColor: "var(--background-subtle)",
              }}
            >
              <h3 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                {title}
              </h3>
              <p className="mt-3 leading-7" style={{ color: "var(--foreground-muted)" }}>
                {copy}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
