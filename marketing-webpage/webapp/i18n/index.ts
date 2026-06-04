import { ar } from "./ar";
import { en } from "./en";

export type AppLocale = "en" | "ar";
export type AppStrings = Record<string, string>;

const locales: Record<AppLocale, AppStrings> = { en, ar };

export function getAppStrings(locale: AppLocale): AppStrings {
  return locales[locale];
}

export function profileLanguageLabel(t: AppStrings, isArabic: boolean): string {
  return isArabic ? t.profile_language_label_arabic : t.profile_language;
}

export function profileLanguageSubtitle(t: AppStrings, isArabic: boolean): string {
  return isArabic ? t.profile_language_arabic : t.profile_language_desc;
}
