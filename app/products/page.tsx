import { Suspense } from "react";
import { getCategories, getProducts } from "@/lib/supabase/queries";
import { ProductFilters } from "@/components/product-filters";
import { ProductGrid } from "@/components/product-grid";
import { Product, SortKey } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

function sortProducts(products: Product[], sort: SortKey) {
  const list = [...products];
  switch (sort) {
    case "oldest":
      return list.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    case "price-asc":
      return list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    case "price-desc":
      return list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    case "views":
      return list.sort((a, b) => b.views - a.views);
    case "newest":
    default:
      return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  let filtered = products;
  if (params.category) filtered = filtered.filter((p) => p.category === params.category);
  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  filtered = sortProducts(filtered, (params.sort as SortKey) ?? "newest");

  return (
    <div className="container-px mx-auto py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Shop</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">All products</h1>
        <p className="mt-2 text-sm text-muted-foreground">{filtered.length} products</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ProductFilters categories={categories} />
          </Suspense>
        </aside>

        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
