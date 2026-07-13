import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest",
  {
    variants: {
      variant: {
        gold: "bg-gold/15 text-gold-dark dark:text-gold-light border border-gold/30",
        new: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
        sale: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "muted" },
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
