import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/sign-out-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isConfigured) {
    const supabase = await createServerSupabase();

    const {
      data: { user },
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

    if (!user) {
      redirect("/admin/login");
    }
  }

  return (
    <div className="container-px mx-auto grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-1">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
        >
          <LayoutDashboard className="h-4 w-4 text-gold" />
          Overview
        </Link>

        <Link
          href="/admin/dashboard/products"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
        >
          <Package className="h-4 w-4 text-gold" />
          Products
        </Link>

        <SignOutButton />
      </aside>

      <div>{children}</div>
    </div>
  );
}
