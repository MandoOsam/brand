"use client";

import { createClient } from "@/lib/supabase/client";
import { Product } from "@/lib/types";
import { slugify } from "@/lib/utils";

export type ProductInput = {
  name: string;
  category: string;
  price: number;
  discountPrice: number | null;
  description: string;
  specs: { label: string; value: string }[];
  images: string[];
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  bestSeller: boolean;
};

export async function createProduct(input: ProductInput) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase.from("products").insert({
    slug: `${slugify(input.name)}-${Math.random().toString(36).slice(2, 6)}`,
    name: input.name,
    category: input.category,
    price: input.price,
    discount_price: input.discountPrice,
    description: input.description,
    specs: input.specs,
    images: input.images,
    in_stock: input.inStock,
    featured: input.featured,
    is_new: input.isNew,
    best_seller: input.bestSeller,
  });

  if (error) throw error;
}

export async function updateProduct(id: string, input: ProductInput) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from("products")
    .update({
      name: input.name,
      category: input.category,
      price: input.price,
      discount_price: input.discountPrice,
      description: input.description,
      specs: input.specs,
      images: input.images,
      in_stock: input.inStock,
      featured: input.featured,
      is_new: input.isNew,
      best_seller: input.bestSeller,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file: File): Promise<string> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const path = `${Date.now()}-${slugify(file.name)}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}
