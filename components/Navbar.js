"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useTheme } from "@/components/ThemeProvider";
import store from "@/data/store.json";

const navItems = [
  { href: "/",        label: "Home"     },
  { href: "/products",label: "Products" },
  { href: "/about",   label: "About"    },
  { href: "/contact", label: "Contact"  },
];

/* ── Sun icon ── */
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42
               M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );
}

/* ── Moon icon ── */
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

/* ── Cart icon ── */
function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { totals } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "var(--nav-bg)",
        borderBottom: "1px solid var(--nav-border)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setOpen(false)}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-base font-black text-white transition-transform group-hover:scale-105"
            style={{ background: "var(--brand)" }}
          >
            A
          </span>
          <span className="text-lg font-black" style={{ color: "var(--foreground)" }}>
            {store.name}
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-all"
                style={{
                  backgroundColor: active ? "var(--foreground)" : "transparent",
                  color: active ? "var(--background)" : "var(--foreground-muted)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-full transition-all hover:scale-105 active:scale-95"
            style={{
              border: "1px solid var(--border)",
              color: "var(--foreground-muted)",
              backgroundColor: "var(--background-subtle)",
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:scale-105"
            style={{
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              backgroundColor: "var(--background-card)",
            }}
          >
            <CartIcon />
            <span>{totals.count}</span>
          </Link>

          {/* Checkout CTA */}
          <Link
            href="/place-order"
            className="hidden rounded-full px-4 py-2 text-sm font-bold transition-all hover:scale-105 active:scale-95 sm:inline-flex"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--cta-text)",
            }}
          >
            Checkout
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((c) => !c)}
            className="grid h-9 w-9 place-items-center rounded-full md:hidden"
            style={{
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open
                ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="border-t px-4 py-3 md:hidden"
          style={{
            backgroundColor: "var(--background-card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold transition"
                style={{
                  color: pathname === item.href ? "var(--brand)" : "var(--foreground)",
                  backgroundColor: pathname === item.href
                    ? "var(--brand-faint)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/place-order"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-bold"
              style={{ backgroundColor: "var(--accent)", color: "var(--cta-text)" }}
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
