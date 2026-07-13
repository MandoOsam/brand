import { notFound } from "next/navigation";
import { getProducts } from "@/lib/supabase/queries";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-semibold">Edit product</h1>
      <ProductForm product={product} />
    </div>
  );
}
