"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import store from "@/data/store.json";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totals } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-700 text-lg font-black text-white">
            A
          </span>
          <span className="text-lg font-black text-neutral-950">
            {store.name}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-neutral-950 text-white"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:border-emerald-700 hover:text-emerald-700"
          >
            Cart ({totals.count})
          </Link>
          <Link
            href="/place-order"
            className="hidden rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-neutral-950 transition hover:bg-amber-300 sm:inline-flex"
          >
            Checkout
          </Link>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="rounded-full border border-neutral-300 px-3 py-2 text-sm font-bold text-neutral-950 md:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-neutral-200 bg-white px-4 py-3 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/place-order"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-amber-400 px-3 py-3 text-sm font-bold text-neutral-950"
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
