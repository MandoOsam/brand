import { createServerSupabase } from "./server";

export type DashboardStats = {
  totalProducts: number;
  totalViews: number;
  totalLikes: number;
  totalWhatsAppClicks: number;
  totalPageViews: number;
  totalOrders: number;
  lowStock: number;
  dailySeries: { date: string; views: number }[];
  topProducts: { name: string; views: number; likes: number }[];
};

const EMPTY_STATS: DashboardStats = {
  totalProducts: 0,
  totalViews: 0,
  totalLikes: 0,
  totalWhatsAppClicks: 0,
  totalPageViews: 0,
  totalOrders: 0,
  lowStock: 0,
  dailySeries: [],
  topProducts: [],
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createServerSupabase();
  if (!supabase) return EMPTY_STATS;

  const [{ data: products }, { count: pageViewCount }, { count: waCount }, { count: orderCount }] =
    await Promise.all([
      supabase.from("products").select("name, views, likes, in_stock"),
      supabase.from("analytics_events").select("*", { count: "exact", head: true }).eq("event_type", "page_view"),
      supabase.from("analytics_events").select("*", { count: "exact", head: true }).eq("event_type", "whatsapp_click"),
      supabase.from("orders").select("*", { count: "exact", head: true }),
    ]);

  const list = products ?? [];
  const totalViews = list.reduce((sum, p: any) => sum + (p.views ?? 0), 0);
  const totalLikes = list.reduce((sum, p: any) => sum + (p.likes ?? 0), 0);
  const lowStock = list.filter((p: any) => p.in_stock === false).length;
  const topProducts = [...list]
    .sort((a: any, b: any) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 5)
    .map((p: any) => ({ name: p.name, views: p.views ?? 0, likes: p.likes ?? 0 }));

  const since = new Date();
  since.setDate(since.getDate() - 14);
  const { data: events } = await supabase
    .from("analytics_events")
    .select("created_at")
    .eq("event_type", "page_view")
    .gte("created_at", since.toISOString());

  const byDay: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    byDay[d.toISOString().slice(0, 10)] = 0;
  }
  (events ?? []).forEach((e: any) => {
    const day = e.created_at.slice(0, 10);
    if (day in byDay) byDay[day] += 1;
  });

  return {
    totalProducts: list.length,
    totalViews,
    totalLikes,
    totalWhatsAppClicks: waCount ?? 0,
    totalPageViews: pageViewCount ?? 0,
    totalOrders: orderCount ?? 0,
    lowStock,
    dailySeries: Object.entries(byDay).map(([date, views]) => ({ date: date.slice(5), views })),
    topProducts,
  };
}
