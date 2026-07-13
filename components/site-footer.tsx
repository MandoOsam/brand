import Link from "next/link";
import { Instagram, Facebook, MessageCircle, MapPin } from "lucide-react";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";

const SOCIALS = [
  { href: "https://instagram.com/yourbrand", label: "Instagram", icon: Instagram },
  { href: "https://facebook.com/yourbrand", label: "Facebook", icon: Facebook },
  { href: "https://tiktok.com/@yourbrand", label: "TikTok", icon: TikTokIcon },
  { href: buildWhatsAppGeneralLink(), label: "WhatsApp", icon: MessageCircle },
];

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="hairline mt-24 border-t border-border">
      <div className="container-px mx-auto grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="font-display text-2xl font-semibold tracking-[0.2em]">
            AE<span className="gold-text">ON</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Considered accessories for everyday devices — watches, earbuds, chargers, cables,
            and the small tools that hold a digital life together.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-gold/50 hover:text-gold"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All products</Link></li>
            <li><Link href="/products?category=watches" className="text-muted-foreground hover:text-foreground">Watches</Link></li>
            <li><Link href="/products?category=earbuds" className="text-muted-foreground hover:text-foreground">Earbuds</Link></li>
            <li><Link href="/products?category=chargers" className="text-muted-foreground hover:text-foreground">Chargers</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gold" /> Order directly on WhatsApp
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" /> Shipping across Egypt
            </li>
          </ul>
        </div>
      </div>

      <div className="hairline container-px mx-auto flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} AEON. All rights reserved.</p>
        <p>Built with Next.js · Hosted free on Vercel</p>
      </div>
    </footer>
  );
}
