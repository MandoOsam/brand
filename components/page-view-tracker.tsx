"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { logPageView } from "@/lib/client-actions";

export function PageViewTracker() {
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    logPageView(pathname);
  }, [pathname]);

  return null;
}
