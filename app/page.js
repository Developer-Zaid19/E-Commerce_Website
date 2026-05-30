import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import store from "@/data/store.json";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 opacity-45">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
            alt="Curated ecommerce store interior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl content-end gap-8 px-4 pb-14 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
              {store.tagline}
            </p>
            <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              {store.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-100">
              Shop well-made home goods, travel tools, wellness essentials, and
              everyday tech from one clean, modern storefront.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="rounded-full bg-amber-400 px-6 py-3 text-center text-sm font-black text-neutral-950 transition hover:bg-amber-300"
              >
                Shop collection
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white hover:text-neutral-950"
              >
                Our story
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {store.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur"
              >
                <p className="text-2xl font-black text-amber-300">{stat.value}</p>
                <p className="mt-1 text-sm text-neutral-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-black text-neutral-950">
              Fresh picks for the week
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-black text-neutral-950 underline decoration-amber-400 decoration-4 underline-offset-4"
          >
            View all products
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ["Fast delivery", "Free shipping starts at $120 with transparent delivery estimates."],
            ["Quality first", "Every product is chosen for useful design, durable materials, and daily value."],
            ["Easy checkout", "Cart and order flows stay quick, clean, and mobile friendly."],
          ].map(([title, copy]) => (
            <div key={title} className="border-l-4 border-emerald-600 pl-5">
              <h3 className="text-xl font-black text-neutral-950">{title}</h3>
              <p className="mt-3 leading-7 text-neutral-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
