import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import DownloadPageClient from "./download-client";

export const metadata: Metadata = {
  title: "Download App",
  description: "Download the Havana Flowers app to browse our full collection, place orders, track deliveries, and enjoy exclusive app-only offers.",
  openGraph: {
    title: `Download ${SITE_NAME} App`,
    description: "Order flowers in Kuwait through our mobile app. Browse, order, track delivery, and enjoy exclusive app-only deals.",
    url: `${SITE_URL}/download`,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
};

export default function DownloadPage() {
  return <DownloadPageClient />;
}