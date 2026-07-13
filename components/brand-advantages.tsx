import { Truck, ShieldCheck, MessageCircle, BadgeCheck } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Fast delivery", desc: "2–5 days, nationwide across Egypt." },
  { icon: BadgeCheck, title: "Original products", desc: "Every item verified before it ships." },
  { icon: ShieldCheck, title: "Real warranty", desc: "Genuine replacement on manufacturing defects." },
  { icon: MessageCircle, title: "Easy WhatsApp ordering", desc: "No account, no checkout friction." },
];

export function BrandAdvantages() {
  return (
    <section className="container-px mx-auto py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-gold/40"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold transition-transform group-hover:scale-110">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-sm font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
