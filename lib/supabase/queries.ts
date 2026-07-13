import { createServerSupabase } from "./server";
import { CATEGORIES, PRODUCTS } from "../data";
import { Category, Product } from "../types";

// Server-side reads. Falls back to local seed data if Supabase isn't configured yet,
// so the storefront always works — even before you run the SQL schema.

export async function getProducts(): Promise<Product[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return PRODUCTS;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return PRODUCTS;

  return data.map(mapDbProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createServerSupabase();
  if (!supabase) return PRODUCTS.find((p) => p.slug === slug) ?? null;

  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (error || !data) return PRODUCTS.find((p) => p.slug === slug) ?? null;

  return mapDbProduct(data);
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return CATEGORIES;

  const { data, error } = await supabase.from("categories").select("*").eq("hidden", false).order("sort_order");
  if (error || !data || data.length === 0) return CATEGORIES;

  return data.map((c: any) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description ?? "",
    image: c.image ?? "",
  }));
}

function mapDbProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    discountPrice: row.discount_price ? Number(row.discount_price) : null,
    description: row.description ?? "",
    specs: row.specs ?? [],
    images: row.images ?? [],
    inStock: row.in_stock ?? true,
    featured: row.featured ?? false,
    isNew: row.is_new ?? false,
    bestSeller: row.best_seller ?? false,
    rating: Number(row.rating ?? 0),
    ratingCount: row.rating_count ?? 0,
    views: row.views ?? 0,
    likes: row.likes ?? 0,
    createdAt: row.created_at,
  };
}
