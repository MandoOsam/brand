"use client";

import * as React from "react";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import { Product } from "@/lib/types";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";
import { isLiked, isWishlisted, registerView, toggleLike, toggleWishlist, logWhatsAppClick } from "@/lib/client-actions";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export function ProductActions({ product }: { product: Product }) {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(product.likes);
  const [wished, setWished] = React.useState(false);

  React.useEffect(() => {
    setLiked(isLiked(product.id));
    setWished(isWishlisted(product.id));
    registerView(product.id);
  }, [product.id]);

  const price = product.discountPrice ?? product.price;
  const url = typeof window !== "undefined" ? window.location.href : "";

  const onLike = async () => {
    const { liked: nowLiked } = await toggleLike(product.id);
    setLiked(nowLiked);
    setLikeCount((c) => c + (nowLiked ? 1 : -1));
  };

  const onShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <a
        href={buildWhatsAppOrderLink({ productName: product.name, price, url })}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => logWhatsAppClick(`/products/${product.slug}`)}
        className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }), "w-full")}
      >
        <MessageCircle className="h-5 w-5" /> Order now on WhatsApp
      </a>

      <div className="flex items-center gap-3">
        <button
          onClick={onLike}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium transition-colors hover:border-gold/50"
        >
          <Heart className={cn("h-4 w-4", liked ? "fill-red-500 text-red-500" : "")} />
          {likeCount} likes
        </button>
        <button
          onClick={() => setWished(toggleWishlist(product.id))}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium transition-colors hover:border-gold/50"
        >
          <Heart className={cn("h-4 w-4", wished ? "fill-gold text-gold" : "")} />
          Wishlist
        </button>
        <button
          onClick={onShare}
          aria-label="Share"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold/50"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
