import type { Product } from "@/types";
import type { Locale } from "@/i18n";

export function localizeProduct(product: Product, locale: Locale): Product {
  const text = product.localeText[locale]
    ?? product.localeText["en"]
    ?? Object.values(product.localeText)[0];

  return {
    ...product,
    name: text?.name ?? product.name,
    description: text?.description ?? product.description,
  };
}

export const featuredProducts: Product[] = [
  {
    id: "fp1", slug: "royal-rose-symphony",
    localeText: { en: { name: "Royal Rose Symphony", description: "Luxurious red roses arrangement" }, ar: { name: "سمفونية الورد الملكي", description: "ترتيب ورود حمراء فاخرة" } },
    name: "", description: "",
    price: 85.000, salePrice: 69.900,
    image: "/images/products/royal-rose-symphony.png", images: [],
    category: "Rose Arrangements", stock: 45, rating: 4.9, reviewCount: 128, inStock: true, isFeatured: true,
  },
  {
    id: "fp2", slug: "golden-hour-bouquet",
    localeText: { en: { name: "Golden Hour Bouquet", description: "Sunflowers and gold accents" }, ar: { name: "باقة الساعة الذهبية", description: "دوار الشمس مع لمسات ذهبية" } },
    name: "", description: "",
    price: 62.000,
    image: "/images/products/golden-hour-bouquet.png", images: [],
    category: "Bouquets", stock: 30, rating: 4.8, reviewCount: 95, inStock: true, isFeatured: true,
  },
  {
    id: "fp3", slug: "midnight-orchid-elegance",
    localeText: { en: { name: "Midnight Orchid Elegance", description: "Exotic orchids in dark vase" }, ar: { name: "أناقة الأوركيد الليلية", description: "أوركيدات غريبة في مزهرية داكنة" } },
    name: "", description: "",
    price: 120.000, salePrice: 99.900,
    image: "/images/products/midnight-orchid-elegance.png", images: [],
    category: "Orchids", stock: 8, rating: 5.0, reviewCount: 67, inStock: true, isFeatured: true,
  },
  {
    id: "fp4", slug: "pearl-white-lilies",
    localeText: { en: { name: "Pearl White Lilies", description: "Elegant white lily arrangement" }, ar: { name: "زنابق اللؤلؤ الأبيض", description: "ترتيب زنابق بيضاء أنيقة" } },
    name: "", description: "",
    price: 78.000,
    image: "/images/products/pearl-white-lilies.png", images: [],
    category: "Lilies", stock: 0, rating: 4.7, reviewCount: 84, inStock: false, isFeatured: true, isNew: true,
  },
];

export const bestSellerProducts: Product[] = [
  {
    id: "bs1", slug: "classic-red-rose-box",
    localeText: { en: { name: "Classic Red Rose Box", description: "24 premium red roses in luxury box" }, ar: { name: "صندوق الورد الأحمر الكلاسيكي", description: "٢٤ وردة حمراء فاخرة في صندوق فاخر" } },
    name: "", description: "",
    price: 55.000,
    image: "/images/products/classic-red-rose-box.png", images: [],
    category: "Rose Arrangements", stock: 72, rating: 4.9, reviewCount: 256, inStock: true, isBestSeller: true,
  },
  {
    id: "bs2", slug: "pastel-dream-arrangement",
    localeText: { en: { name: "Pastel Dream Arrangement", description: "Soft pastel floral arrangement" }, ar: { name: "ترتيب حلم الباستيل", description: "ترتيب زهري بألوان الباستيل الناعمة" } },
    name: "", description: "",
    price: 72.000, salePrice: 59.900,
    image: "/images/products/pastel-dream-arrangement.png", images: [],
    category: "Bouquets", stock: 5, rating: 4.8, reviewCount: 189, inStock: true, isBestSeller: true,
  },
  {
    id: "bs3", slug: "tulip-paradise",
    localeText: { en: { name: "Tulip Paradise", description: "Colorful tulip bouquet" }, ar: { name: "جنة التيوليب", description: "باقة تيوليب ملونة" } },
    name: "", description: "",
    price: 48.000,
    image: "/images/products/tulip-paradise.png", images: [],
    category: "Seasonal", stock: 0, rating: 4.7, reviewCount: 142, inStock: false, isBestSeller: true,
  },
  {
    id: "bs4", slug: "luxury-white-gold",
    localeText: { en: { name: "Luxury White & Gold", description: "White roses with gold accents" }, ar: { name: "فاخر أبيض وذهبي", description: "ورود بيضاء مع لمسات ذهبية" } },
    name: "", description: "",
    price: 95.000, salePrice: 79.900,
    image: "/images/products/luxury-white-gold.png", images: [],
    category: "Luxury Boxes", stock: 18, rating: 4.9, reviewCount: 201, inStock: true, isBestSeller: true, isNew: true,
  },
];

export function getFeaturedProducts(locale: Locale): Product[] {
  return featuredProducts.map((p) => localizeProduct(p, locale));
}

export function getBestSellerProducts(locale: Locale): Product[] {
  return bestSellerProducts.map((p) => localizeProduct(p, locale));
}