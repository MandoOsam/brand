"use client";

import Link from "next/link";
import * as React from "react";
import { Menu, Search, X, Heart } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/products", label: "Shop" },
  { href: "/products?category=watches", label: "Watches" },
  { href: "/products?category=earbuds", label: "Earbuds" },
  { href: "/products?category=accessories", label: "Accessories" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "glass hairline" : "bg-transparent"
      )}
    >
      <div className="container-px mx-auto flex h-18 items-center justify-between py-4">
        <Link href="/" className="font-display text-2xl font-semibold tracking-[0.2em]">
          AE<span className="gold-text">ON</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-gold/50 sm:flex"
            aria-label="Search products"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            href="/wishlist"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-gold/50 sm:flex"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass hairline md:hidden">
          <nav className="container-px mx-auto flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
