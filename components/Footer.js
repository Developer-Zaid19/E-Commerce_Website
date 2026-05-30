import Link from "next/link";
import store from "@/data/store.json";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500 text-lg font-black text-neutral-950">
              A
            </span>
            <span className="text-xl font-black">{store.name}</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-neutral-300">
            {store.description}
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-amber-300">
            Shop
          </h3>
          <div className="grid gap-3 text-sm text-neutral-300">
            <Link href="/products" className="hover:text-white">Products</Link>
            <Link href="/cart" className="hover:text-white">Cart</Link>
            <Link href="/place-order" className="hover:text-white">Place order</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-amber-300">
            Contact
          </h3>
          <div className="grid gap-3 text-sm text-neutral-300">
            <span>{store.supportEmail}</span>
            <span>{store.phone}</span>
            <span>{store.address}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-neutral-400">
        2026 {store.name}. Built for a polished ecommerce experience.
      </div>
    </footer>
  );
}
