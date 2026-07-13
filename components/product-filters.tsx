"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Category, SortKey } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const [q, setQ] = React.useState(params.get("q") ?? "");

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/products?${next.toString()}`);
  };

  React.useEffect(() => {
    const t = setTimeout(() => update("q", q), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const activeCategory = params.get("category") ?? "";

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => update("category", "")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
            !activeCategory ? "border-gold bg-gold/10 text-gold-dark dark:text-gold-light" : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => update("category", c.slug)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              activeCategory === c.slug ? "border-gold bg-gold/10 text-gold-dark dark:text-gold-light" : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Select
          defaultValue={params.get("sort") ?? "newest"}
          onChange={(e) => update("sort", e.target.value as SortKey)}
          className="max-w-[220px]"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="views">Most Viewed</option>
        </Select>
      </div>
    </div>
  );
}
