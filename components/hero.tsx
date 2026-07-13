"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-gold/20 blur-[160px]" />

      <div className="container-px relative mx-auto grid min-h-[86vh] items-center gap-12 py-24 lg:grid-cols-2 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold-dark dark:text-gold-light">
            New season, considered gear
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Everyday tech,
            <br />
            <span className="gold-text">precisely made.</span>
          </h1>

          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Watches, earbuds, and the accessories that hold a modern life together —
            chosen carefully, sold directly, delivered across Egypt.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/products" className={buttonVariants({ variant: "gold", size: "lg" })}>
              Shop the collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products?category=watches" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Browse watches
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-10 border-t border-border pt-8">
            <div>
              <p className="font-display text-2xl font-semibold">4.8/5</p>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">2–5 days</p>
              <p className="text-xs text-muted-foreground">Delivery, nationwide</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">100%</p>
              <p className="text-xs text-muted-foreground">Original products</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative aspect-square w-full max-w-lg justify-self-center"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-gold/20 via-transparent to-transparent" />
          <div className="glass hairline relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.5rem] border border-border">
            <img
              src="https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=1200&auto=format&fit=crop"
              alt="AEON Watch One on a wrist"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="glass hairline absolute -bottom-6 -left-6 rounded-2xl border border-border px-5 py-4 shadow-xl">
            <p className="text-xs text-muted-foreground">Starting at</p>
            <p className="font-display text-xl font-semibold gold-text">1,990 EGP</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
