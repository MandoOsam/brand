"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";
import { logWhatsAppClick } from "@/lib/client-actions";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={buildWhatsAppGeneralLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => logWhatsAppClick("floating-button")}
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-16 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Order on WhatsApp
      </span>
    </a>
  );
}
