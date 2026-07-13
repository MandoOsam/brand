import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-button";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Toaster } from "sonner";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.vercel.app"),
  title: {
    default: "AEON — Watches, Earbuds & Mobile Accessories",
    template: "%s | AEON",
  },
  description:
    "AEON sells considered watches, earbuds, chargers, cables and smart gadgets — order directly on WhatsApp, delivery across Egypt.",
  openGraph: {
    title: "AEON — Watches, Earbuds & Mobile Accessories",
    description: "Considered accessories for everyday devices. Order directly on WhatsApp.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body`}>
        <ThemeProvider>
          <PageViewTracker />
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <WhatsAppFloatingButton />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
