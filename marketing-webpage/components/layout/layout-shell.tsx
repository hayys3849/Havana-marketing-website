"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ProductEntryBridge } from "@/components/bridge/product-entry-bridge";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWebApp = pathname?.startsWith("/app");

  if (isWebApp) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <MobileNav />
      <main>{children}</main>
      <Footer />
      <ProductEntryBridge />
    </>
  );
}
