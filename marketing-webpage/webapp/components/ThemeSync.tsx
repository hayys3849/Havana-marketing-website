"use client";

import { useEffect } from "react";
import { useResolvedDark } from "../hooks/use-resolved-dark";
import { useHavanaStore } from "../state/havana-store";

export function ThemeSync() {
  const isDark = useResolvedDark();
  const locale = useHavanaStore((s) => s.locale);

  useEffect(() => {
    const root = document.querySelector(".havana-app");
    if (!root) return;
    root.classList.toggle("dark", isDark);
    root.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    root.setAttribute("lang", locale);
  }, [isDark, locale]);

  return null;
}
