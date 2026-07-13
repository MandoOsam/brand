import { Instagram } from "lucide-react";
import { PRODUCTS } from "@/lib/data";

export function InstagramGallery() {
  const images = PRODUCTS.flatMap((p) => p.images).slice(0, 6);

  return (
    <section className="container-px mx-auto py-16">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Community</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">@yourbrand on Instagram</h2>
        </div>
        <a
          href="https://instagram.com/yourbrand"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex"
        >
          <Instagram className="h-4 w-4" /> Follow
        </a>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {images.map((src, i) => (
          <a
            key={i}
            href="https://instagram.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl border border-border"
          >
            <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
              <Instagram className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
