/**
 * App download configuration — single source of truth.
 * Supports environment variable overrides for production deployment.
 * The /download page reads from here to render download buttons.
 */
export const APP_DOWNLOAD = {
  /** Google Play Store URL — update when app is published */
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "https://play.google.com/store/apps/details?id=com.havana.flowers",

  /** Direct APK download URL — leave empty string to hide the APK button */
  apkDirectUrl: process.env.NEXT_PUBLIC_APK_URL ?? "",

  /** App version for display purposes */
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0",

  /** Minimum Android version required */
  minAndroidVersion: "6.0",
} as const;

/** Site URL for SEO metadata */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://havanaflowers.kw";

/** Site name */
export const SITE_NAME = "Havana Flowers";