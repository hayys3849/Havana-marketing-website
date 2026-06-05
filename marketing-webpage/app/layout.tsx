import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Arabic } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { DirectionProvider } from "@/components/shared/direction-provider";
import { LayoutShell } from "@/components/layout/layout-shell";
import { SITE_URL, SITE_NAME } from "@/lib/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto-arabic", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: {
    default: "Havana Flowers | Kuwait's Premier Luxury Floral Boutique",
    template: `%s | ${SITE_NAME}`,
  },
  description: "Experience the finest flower arrangements crafted with passion and elegance for every special moment in Kuwait. Download our app to order.",
  keywords: ["flowers", "Kuwait", "luxury", "floral", "delivery", "bouquet", "roses", "Havana Flowers"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_KW",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Havana Flowers | Kuwait's Premier Luxury Floral Boutique",
    description: "Experience the finest flower arrangements crafted with passion and elegance for every special moment in Kuwait.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Havana Flowers | Kuwait's Premier Luxury Floral Boutique",
    description: "Experience the finest flower arrangements crafted with passion and elegance for every special moment in Kuwait.",
    images: ["/images/og-image.png"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${notoArabic.variable} antialiased`}>
        <ThemeProvider>
          <DirectionProvider>
            <LayoutShell>{children}</LayoutShell>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
