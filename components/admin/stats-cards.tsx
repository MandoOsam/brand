import { Eye, Heart, MessageCircle, Package, ShoppingBag, AlertTriangle } from "lucide-react";
import { DashboardStats } from "@/lib/supabase/admin-queries";

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const items = [
    { label: "Products", value: stats.totalProducts, icon: Package },
    { label: "Page views (site)", value: stats.totalPageViews, icon: Eye },
    { label: "Product views", value: stats.totalViews, icon: Eye },
    { label: "Likes", value: stats.totalLikes, icon: Heart },
    { label: "WhatsApp clicks", value: stats.totalWhatsAppClicks, icon: MessageCircle },
    { label: "Orders logged", value: stats.totalOrders, icon: ShoppingBag },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{item.label}</p>
            <item.icon className="h-4 w-4 text-gold" />
          </div>
          <p className="mt-3 font-display text-3xl font-semibold">{item.value.toLocaleString()}</p>
        </div>
      ))}
      {stats.lowStock > 0 && (
        <div className="col-span-full flex items-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4" /> {stats.lowStock} product(s) marked out of stock.
        </div>
      )}
    </div>
  );
}
