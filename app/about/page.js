import Image from "next/image";
import store from "@/data/store.json";

export const metadata = {
  title: "About | Aurevia Market",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
              About us
            </p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-neutral-950 sm:text-5xl">
              A curated store for people who like practical things with polish.
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              {store.name} brings together daily-use products across home,
              travel, wellness, tech, kitchen, and style. The goal is simple:
              fewer noisy choices, better finds, and a shopping flow that feels
              calm on every screen.
            </p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-lg shadow-xl">
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

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Curated range", "Products are grouped with purpose, not dumped into endless shelves."],
            ["Clear pricing", "Every product page and cart step keeps totals easy to understand."],
            ["Responsive by design", "The experience is built for phone, tablet, and desktop from the start."],
          ].map(([title, copy]) => (
            <article key={title} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-neutral-950">{title}</h2>
              <p className="mt-3 leading-7 text-neutral-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
