import Image from "next/image";
import store from "@/data/store.json";

export const metadata = {
  title: "About | Aurevia Market",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Intro ── */}
      <section style={{ backgroundColor: "var(--background-card)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "var(--brand)" }}
            >
              About us
            </p>
            <h1
              className="mt-2 text-4xl font-black leading-tight sm:text-5xl"
              style={{ color: "var(--foreground)" }}
            >
              A curated store for people who like practical things with polish.
            </h1>
            <p className="mt-6 text-lg leading-8" style={{ color: "var(--foreground-muted)" }}>
              {store.name} brings together daily-use products across home,
              travel, wellness, tech, kitchen, and style. The goal is simple:
              fewer noisy choices, better finds, and a shopping flow that feels
              calm on every screen.
            </p>
          </div>
          <div
            className="relative min-h-[360px] overflow-hidden rounded-2xl"
            style={{ boxShadow: "var(--shadow-xl)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
              alt="Modern curated store workspace"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Values grid ── */}
      <section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["✦  Curated range",     "Products are grouped with purpose, not dumped into endless shelves."],
            ["◎  Clear pricing",     "Every product page and cart step keeps totals easy to understand."],
            ["⬡  Responsive design", "The experience is built for phone, tablet, and desktop from the start."],
          ].map(([title, copy]) => (
            <article
              key={title}
              className="rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{
                backgroundColor: "var(--background-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h2 className="text-xl font-black" style={{ color: "var(--foreground)" }}>
                {title}
              </h2>
              <p className="mt-3 leading-7" style={{ color: "var(--foreground-muted)" }}>
                {copy}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
