import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-semibold">Add product</h1>
      <ProductForm />
    </div>
  );
}
