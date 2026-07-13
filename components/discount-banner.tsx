import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";

export function DiscountBanner() {
  return (
    <section className="container-px mx-auto py-16">
      <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-black via-neutral-900 to-black p-10 text-white sm:p-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/25 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />

        <div className="relative flex flex-col items-start gap-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">Limited time</p>
          <h3 className="max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Up to 25% off select earbuds and chargers this week.
          </h3>
          <Link
            href="/products"
            className={buttonVariants({ variant: "gold", size: "lg" })}
          >
            Shop the offer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
