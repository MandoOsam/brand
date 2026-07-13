"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { CATEGORIES } from "@/lib/data";
import { createProduct, updateProduct, uploadProductImage, ProductInput } from "@/lib/supabase/admin-actions";

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const [form, setForm] = React.useState<ProductInput>({
    name: product?.name ?? "",
    category: product?.category ?? CATEGORIES[0].slug,
    price: product?.price ?? 0,
    discountPrice: product?.discountPrice ?? null,
    description: product?.description ?? "",
    specs: product?.specs ?? [{ label: "", value: "" }],
    images: product?.images ?? [],
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    isNew: product?.isNew ?? true,
    bestSeller: product?.bestSeller ?? false,
  });

  const set = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadProductImage));
      set("images", [...form.images, ...urls]);
      toast.success("Image(s) uploaded");
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const cleanSpecs = form.specs.filter((s) => s.label && s.value);
      const payload = { ...form, specs: cleanSpecs };
      if (product) {
        await updateProduct(product.id, payload);
        toast.success("Product updated");
      } else {
        await createProduct(payload);
        toast.success("Product created");
      }
      router.push("/admin/dashboard/products");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Product name</label>
          <Input required value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Category</label>
          <Select value={form.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">In stock</label>
          <Select value={form.inStock ? "yes" : "no"} onChange={(e) => set("inStock", e.target.value === "yes")}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Price (EGP)</label>
          <Input
            required
            type="number"
            value={form.price}
            onChange={(e) => set("price", Number(e.target.value))}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Discount price (optional)</label>
          <Input
            type="number"
            value={form.discountPrice ?? ""}
            onChange={(e) => set("discountPrice", e.target.value ? Number(e.target.value) : null)}
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Description</label>
          <Textarea rows={4} required value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {(["featured", "isNew", "bestSeller"] as const).map((key) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form[key]}
              onChange={(e) => set(key, e.target.checked)}
              className="h-4 w-4 accent-gold"
            />
            {key === "isNew" ? "New badge" : key === "bestSeller" ? "Best seller" : "Featured"}
          </label>
        ))}
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Specifications</p>
        <div className="space-y-2">
          {form.specs.map((spec, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Label (e.g. Battery)"
                value={spec.label}
                onChange={(e) => {
                  const next = [...form.specs];
                  next[i] = { ...next[i], label: e.target.value };
                  set("specs", next);
                }}
              />
              <Input
                placeholder="Value (e.g. 7 days)"
                value={spec.value}
                onChange={(e) => {
                  const next = [...form.specs];
                  next[i] = { ...next[i], value: e.target.value };
                  set("specs", next);
                }}
              />
              <button
                type="button"
                onClick={() => set("specs", form.specs.filter((_, idx) => idx !== i))}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set("specs", [...form.specs, { label: "", value: "" }])}
            className="flex items-center gap-1.5 text-xs font-medium text-gold hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> Add spec
          </button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Images</p>
        <div className="flex flex-wrap gap-3">
          {form.images.map((src, i) => (
            <div key={src + i} className="relative h-24 w-24 overflow-hidden rounded-xl border border-border">
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => set("images", form.images.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border text-muted-foreground hover:border-gold/50 hover:text-gold">
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
            <span className="text-[10px]">Upload</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
          </label>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Uploads go straight to your Supabase Storage bucket and are ready to use immediately.
        </p>
      </div>

      <Button type="submit" variant="gold" size="lg" disabled={saving}>
        {saving ? "Saving..." : product ? "Save changes" : "Create product"}
      </Button>
    </form>
  );
}
