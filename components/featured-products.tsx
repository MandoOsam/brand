import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

export function FeaturedProducts({ products, title, eyebrow, viewAllHref }: {
  products: Product[];
  title: string;
  eyebrow: string;
  viewAllHref: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="container-px mx-auto py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
        </div>
        <Link href={viewAllHref} className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 8).map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}
