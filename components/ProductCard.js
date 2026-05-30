import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
          {product.badge}
        </span>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            <span>{product.category}</span>
            <span>{product.rating} rating</span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-950">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-6 text-neutral-600">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-neutral-950">
            {formatPrice(product.price)}
          </span>
          <AddToCartButton productId={product.id} compact />
        </div>
      </div>
    </article>
  );
}
