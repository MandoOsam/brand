import { Star } from "lucide-react";
import { Review } from "@/lib/types";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="container-px mx-auto py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Testimonials</p>
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">What customers say</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r) => (
          <div key={r.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < r.rating ? "fill-gold text-gold" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">"{r.text}"</p>
            <div className="mt-auto pt-2">
              <p className="text-sm font-semibold">{r.author}</p>
              {r.product && <p className="text-xs text-muted-foreground">{r.product}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
