"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { getWishlist } from "@/lib/client-actions";
import { getProducts } from "@/lib/supabase/queries";
import { ProductGrid } from "@/components/product-grid";
import { Product } from "@/lib/types";
import { PRODUCTS } from "@/lib/data";

export default function WishlistPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const ids = getWishlist();
    // Client-side page: use local seed data as a lightweight source for now.
    setProducts(PRODUCTS.filter((p) => ids.includes(p.id)));
    setLoaded(true);
  }, []);

  return (
    <div className="container-px mx-auto py-12">
      <div className="mb-10 flex items-center gap-3">
        <Heart className="h-6 w-6 text-gold" />
        <h1 className="font-display text-3xl font-semibold">Your wishlist</h1>
      </div>
      {loaded && <ProductGrid products={products} />}
    </div>
  );
}
