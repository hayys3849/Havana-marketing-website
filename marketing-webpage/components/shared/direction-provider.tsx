"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const locale = useLanguageStore((s) => s.locale);

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  return <>{children}</>;
}