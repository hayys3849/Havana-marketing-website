"use client";

import { getAppStrings } from "../i18n";
import { useHavanaStore } from "../state/havana-store";

export function useAppStrings() {
  const locale = useHavanaStore((s) => s.locale);
  return getAppStrings(locale);
}
