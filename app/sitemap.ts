import { MetadataRoute } from "next";
import { getProducts } from "@/lib/supabase/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://your-domain.vercel.app";
  const products = await getProducts();

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/products`, lastModified: new Date() },
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(p.createdAt),
    })),
  ];
}
