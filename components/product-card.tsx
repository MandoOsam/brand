"use client";

import Link from "next/link";
import * as React from "react";
import { Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { Badge } from "./ui/badge";
import { formatEGP, cn } from "@/lib/utils";
import { isWishlisted, toggleWishlist } from "@/lib/client-actions";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [wished, setWished] = React.useState(false);

  React.useEffect(() => {
    setWished(isWishlisted(product.id));
  }, [product.id]);

  const onWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(toggleWishlist(product.id));
  };

  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-black/5"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && <Badge variant="new">New</Badge>}
          {hasDiscount && <Badge variant="sale">Sale</Badge>}
        </div>

        <button
          onClick={onWishlist}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm transition-transform hover:scale-110"
        >
          <Heart className={cn("h-4 w-4 transition-colors", wished ? "fill-red-500 text-red-500" : "text-foreground")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
        <h3 className="font-display text-sm font-semibold leading-snug">{product.name}</h3>

        <div className="mt-1 flex items-center gap-2">
          <span className="font-display text-base font-semibold">
            {formatEGP(hasDiscount ? product.discountPrice! : product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">{formatEGP(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
