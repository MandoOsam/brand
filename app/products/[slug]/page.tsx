import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/supabase/queries";
import { ProductGallery } from "@/components/product-gallery";
import { ProductActions } from "@/components/product-actions";
import { ProductGrid } from "@/components/product-grid";
import { Badge } from "@/components/ui/badge";
import { formatEGP } from "@/lib/utils";
import { Star } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: product.images },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([getProductBySlug(slug), getProducts()]);

  if (!product) notFound();

  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.discountPrice ?? product.price,
      priceCurrency: "EGP",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.ratingCount
      ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.ratingCount }
      : undefined,
  };

  return (
    <div className="container-px mx-auto py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.ratingCount})</span>
            </div>
            {product.isNew && <Badge variant="new">New</Badge>}
            {hasDiscount && <Badge variant="sale">Sale</Badge>}
            <span className="text-xs text-muted-foreground">{product.views} views</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold gold-text">
              {formatEGP(hasDiscount ? product.discountPrice! : product.price)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">{formatEGP(product.price)}</span>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {product.specs.length > 0 && (
            <dl className="mt-8 divide-y divide-border rounded-2xl border border-border">
              {product.specs.map((s) => (
                <div key={s.label} className="flex items-center justify-between px-5 py-3">
                  <dt className="text-sm text-muted-foreground">{s.label}</dt>
                  <dd className="font-mono text-sm">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8">
            <ProductActions product={product} />
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            {product.inStock ? "In stock — ships within 24h" : "Currently unavailable"}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-8 font-display text-2xl font-semibold">You might also like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
