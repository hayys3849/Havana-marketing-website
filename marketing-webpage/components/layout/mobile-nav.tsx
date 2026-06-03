"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ChevronRight } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { useLanguageStore } from "@/store/language-store";
import { getDictionary } from "@/i18n";
import Link from "next/link";

const navKeys = [
  { key: "home" as const, href: "/" },
  { key: "shop" as const, href: "#shop" },
  { key: "categories" as const, href: "#categories" },
  { key: "about" as const, href: "#about" },
  { key: "contact" as const, href: "#contact" },
];

const occasionKeys = ["eid", "weddings", "birthday", "anniversary", "graduation", "mothersDay", "loveRomance", "sympathy"] as const;

export function MobileNav() {
  const isMobileMenuOpen = useUIStore((s) => s.isMobileMenuOpen);
  const closeMobileMenu = useUIStore((s) => s.closeMobileMenu);
  const locale = useLanguageStore((s) => s.locale);
  const t = getDictionary(locale);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMobileMenu} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ x: locale === "ar" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: locale === "ar" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed inset-y-0 z-50 w-full max-w-sm bg-card shadow-2xl overflow-y-auto ${locale === "ar" ? "right-0" : "left-0"}`}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-xl font-serif font-bold text-gold-gradient">HAVANA</span>
              <button onClick={closeMobileMenu} className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-muted cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="py-2">
              {navKeys.map((link) => (
                <a key={link.key} href={link.href} onClick={closeMobileMenu} className="flex items-center justify-between px-6 py-3 text-base font-medium text-foreground hover:bg-muted hover:text-maroon dark:hover:text-gold transition-colors">
                  {t.nav[link.key]}
                  <ChevronRight className={`h-4 w-4 text-muted-foreground ${locale === "ar" ? "rotate-180" : ""}`} />
                </a>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t.mobileNav.occasions}</h3>
              <div className="grid grid-cols-2 gap-2">
                {occasionKeys.map((occ) => (
                  <span key={occ} className="rounded-lg border border-border p-3 text-center text-sm font-medium text-foreground hover:border-maroon hover:text-maroon dark:hover:border-gold dark:hover:text-gold transition-colors cursor-default">
                    {t.occasions[occ]}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <Link href="/download" onClick={closeMobileMenu} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold hover:bg-gold-dark py-3 text-base font-semibold text-dark-bg transition-colors">
                <Download className="h-5 w-5" />
                {t.mobileNav.downloadApp}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}