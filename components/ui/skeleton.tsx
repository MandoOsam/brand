import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg bg-[linear-gradient(110deg,hsl(var(--muted))_8%,hsl(var(--surface))_18%,hsl(var(--muted))_33%)] bg-[length:200%_100%]",
        className
      )}
      {...props}
    />
  );
}
