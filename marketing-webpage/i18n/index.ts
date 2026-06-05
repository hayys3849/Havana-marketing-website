import en from "./locales/en";
import ar from "./locales/ar";
import type { Translation } from "./types";

export type Locale = "en" | "ar";
export type { Translation };

function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

function withFallback(target: Record<string, unknown>, base: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(target)) {
    const targetVal = target[key];
    const baseVal = base[key];
    if (isObject(targetVal) && isObject(baseVal)) {
      result[key] = withFallback(targetVal, baseVal);
    } else if (targetVal !== undefined && targetVal !== "") {
      result[key] = targetVal;
    }
  }
  return result;
}

function buildDictionary(locale: Locale): Translation {
  if (locale === "en") return en;
  return withFallback(ar as unknown as Record<string, unknown>, en as unknown as Record<string, unknown>) as unknown as Translation;
}

const dictCache = new Map<Locale, Translation>();

export function getDictionary(locale: Locale): Translation {
  let dict = dictCache.get(locale);
  if (!dict) {
    dict = buildDictionary(locale);
    dictCache.set(locale, dict);
  }
  return dict;
}