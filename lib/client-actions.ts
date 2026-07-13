"use client";

import { createClient, isSupabaseConfigured } from "./supabase/client";

const LIKED_KEY = "aeon_liked_products";
const WISHLIST_KEY = "aeon_wishlist";
const VIEWED_KEY = "aeon_viewed_products";

function readSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return new Set();
  }
}

function writeSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
}

export function isLiked(productId: string) {
  return readSet(LIKED_KEY).has(productId);
}

export function isWishlisted(productId: string) {
  return readSet(WISHLIST_KEY).has(productId);
}

export function getWishlist(): string[] {
  return Array.from(readSet(WISHLIST_KEY));
}

export async function toggleLike(productId: string): Promise<{ liked: boolean }> {
  const liked = readSet(LIKED_KEY);
  const nowLiked = !liked.has(productId);
  if (nowLiked) liked.add(productId);
  else liked.delete(productId);
  writeSet(LIKED_KEY, liked);

  const supabase = createClient();
  if (supabase) {
    await supabase.rpc("adjust_product_likes", {
      p_id: productId,
      delta: nowLiked ? 1 : -1,
    });
  }

  return { liked: nowLiked };
}

export function toggleWishlist(productId: string): boolean {
  const set = readSet(WISHLIST_KEY);
  const now = !set.has(productId);
  if (now) set.add(productId);
  else set.delete(productId);
  writeSet(WISHLIST_KEY, set);
  return now;
}

export async function registerView(productId: string) {
  const viewed = readSet(VIEWED_KEY);
  if (viewed.has(productId)) return;
  viewed.add(productId);
  writeSet(VIEWED_KEY, viewed);

  const supabase = createClient();
  if (supabase) {
    await supabase.rpc("increment_product_views", { p_id: productId });
  }
}

export async function logPageView(path: string) {
  if (!isSupabaseConfigured()) return;
  const supabase = createClient();
  if (!supabase) return;
  await supabase.from("analytics_events").insert({ event_type: "page_view", path });
}

export async function logWhatsAppClick(path: string) {
  if (!isSupabaseConfigured()) return;
  const supabase = createClient();
  if (!supabase) return;
  await supabase.from("analytics_events").insert({ event_type: "whatsapp_click", path });
}
