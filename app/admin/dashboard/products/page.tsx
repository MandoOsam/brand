import Link from "next/link";
import { Plus } from "lucide-react";
import { getProducts } from "@/lib/supabase/queries";
import { formatEGP } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ProductRowActions } from "@/components/admin/product-row-actions";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} total</p>
        </div>
        <Link href="/admin/dashboard/products/new" className={buttonVariants({ variant: "gold" })}>
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Views / Likes</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="flex items-center gap-3 px-5 py-3">
                  <img src={p.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="px-5 py-3 capitalize text-muted-foreground">{p.category}</td>
                <td className="px-5 py-3">{formatEGP(p.discountPrice ?? p.price)}</td>
                <td className="px-5 py-3">
                  <span className={p.inStock ? "text-emerald-500" : "text-destructive"}>
                    {p.inStock ? "In stock" : "Out"}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{p.views} / {p.likes}</td>
                <td className="px-5 py-3">
                  <ProductRowActions id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
