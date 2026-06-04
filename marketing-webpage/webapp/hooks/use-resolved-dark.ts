"use client";

import { useEffect, useState } from "react";
import type { ThemeMode } from "../types";
import { useHavanaStore } from "../state/havana-store";

export function resolveDark(themeMode: ThemeMode, systemDark: boolean): boolean {
  if (themeMode === "dark") return true;
  if (themeMode === "light") return false;
  return systemDark;
}

export function useResolvedDark(): boolean {
  const themeMode = useHavanaStore((s) => s.themeMode);
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return resolveDark(themeMode, systemDark);
}
