import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedProducts } from "@/components/featured-products";
import { DiscountBanner } from "@/components/discount-banner";
import { ReviewsSection } from "@/components/reviews-section";
import { InstagramGallery } from "@/components/instagram-gallery";
import { BrandAdvantages } from "@/components/brand-advantages";
import { getCategories, getProducts } from "@/lib/supabase/queries";
import { REVIEWS } from "@/lib/data";

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const featured = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.bestSeller);
  const newArrivals = [...products].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={featured} eyebrow="Curated" title="Featured products" viewAllHref="/products" />
      <DiscountBanner />
      <FeaturedProducts products={bestSellers} eyebrow="Loved by customers" title="Best sellers" viewAllHref="/products?sort=views" />
      <FeaturedProducts products={newArrivals} eyebrow="Just landed" title="New arrivals" viewAllHref="/products?sort=newest" />
      <BrandAdvantages />
      <ReviewsSection reviews={REVIEWS} />
      <InstagramGallery />
    </>
  );
}
