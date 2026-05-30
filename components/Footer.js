"use client";

import Link from "next/link";
import store from "@/data/store.json";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--background-card)",
        color: "var(--foreground)",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">

        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl text-lg font-black text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              A
            </span>
            <span className="text-xl font-black" style={{ color: "var(--foreground)" }}>
              {store.name}
            </span>
          </div>
          <p className="max-w-md text-sm leading-6" style={{ color: "var(--foreground-muted)" }}>
            {store.description}
          </p>
        </div>

        {/* Shop links */}
        <div>
          <h3
            className="mb-4 text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Shop
          </h3>
          <div className="grid gap-3 text-sm" style={{ color: "var(--foreground-muted)" }}>
            {[
              ["/products",    "Products"],
              ["/cart",        "Cart"],
              ["/place-order", "Place order"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="w-fit transition-all hover:underline"
                style={{ color: "var(--foreground-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground-muted)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3
            className="mb-4 text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Contact
          </h3>
          <div className="grid gap-3 text-sm" style={{ color: "var(--foreground-muted)" }}>
            <span>{store.supportEmail}</span>
            <span>{store.phone}</span>
            <span>{store.address}</span>
          </div>
        </div>
      </div>

      <div
        className="px-4 py-5 text-center text-xs"
        style={{
          borderTop: "1px solid var(--border)",
          color: "var(--foreground-faint)",
        }}
      >
        © 2026 {store.name}. Built for a polished ecommerce experience.
      </div>
    </footer>
  );
}
