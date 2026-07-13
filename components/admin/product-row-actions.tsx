"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProduct } from "@/lib/supabase/admin-actions";

export function ProductRowActions({ id }: { id: string }) {
  const router = useRouter();

  const onDelete = async () => {
    if (!confirm("Delete this product? This can't be undone.")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Delete failed");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/dashboard/products/${id}/edit`}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-gold/50"
      >
        <Pencil className="h-3.5 w-3.5" />
      </Link>
      <button
        onClick={onDelete}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-destructive/50 hover:text-destructive"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
