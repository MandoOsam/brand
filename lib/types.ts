export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug
  price: number;
  discountPrice?: number | null;
  description: string;
  specs: { label: string; value: string }[];
  images: string[];
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  bestSeller: boolean;
  rating: number;
  ratingCount: number;
  views: number;
  likes: number;
  createdAt: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  product?: string;
};

export type SortKey = "newest" | "oldest" | "price-asc" | "price-desc" | "rating" | "views";
