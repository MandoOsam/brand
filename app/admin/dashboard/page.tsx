import { getDashboardStats } from "@/lib/supabase/admin-queries";
import { StatsCards } from "@/components/admin/stats-cards";
import { ViewsChart } from "@/components/admin/views-chart";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default async function DashboardOverviewPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">A live snapshot of your store.</p>
      </div>

      {!isSupabaseConfigured() && (
        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm text-muted-foreground">
          Connect Supabase to see real numbers here — right now these are all zero because the dashboard
          has nothing to read yet. See README.md.
        </div>
      )}

      <StatsCards stats={stats} />
      <ViewsChart data={stats.dailySeries} />

      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Most viewed products
        </p>
        <div className="divide-y divide-border">
          {stats.topProducts.length === 0 && (
            <p className="py-4 text-sm text-muted-foreground">No product views yet.</p>
          )}
          {stats.topProducts.map((p) => (
            <div key={p.name} className="flex items-center justify-between py-3 text-sm">
              <span className="font-medium">{p.name}</span>
              <span className="text-muted-foreground">{p.views} views · {p.likes} likes</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
