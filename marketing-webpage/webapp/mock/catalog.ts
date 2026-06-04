import type { WebCategory, WebProduct } from "../types";

export const CATEGORIES: WebCategory[] = [
  { id: "all", name: "All", emoji: "🌸" },
  { id: "roses", name: "Roses", emoji: "🌹" },
  { id: "bouquets", name: "Bouquets", emoji: "💐" },
  { id: "arrangements", name: "Arrangements", emoji: "🌺" },
  { id: "gifts", name: "Gifts", emoji: "🎁" },
];

export const PRODUCTS: WebProduct[] = [
  {
    id: "1",
    name: "Classic Red Roses",
    description: "A dozen premium red roses wrapped in elegant Havana packaging.",
    price: 18.5,
    salePrice: 15.0,
    isOnSale: true,
    categoryId: "roses",
    categoryName: "Roses",
    rating: 4.8,
    reviewCount: 124,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    inStock: true,
  },
  {
    id: "2",
    name: "Blush Peony Bouquet",
    description: "Soft peonies and garden roses for romantic occasions.",
    price: 22.0,
    isOnSale: false,
    categoryId: "bouquets",
    categoryName: "Bouquets",
    rating: 4.9,
    reviewCount: 89,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Sunset Arrangement",
    description: "Warm-toned seasonal blooms in a luxury ceramic vase.",
    price: 28.0,
    isOnSale: false,
    categoryId: "arrangements",
    categoryName: "Arrangements",
    rating: 4.7,
    reviewCount: 56,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    inStock: true,
  },
  {
    id: "4",
    name: "Orchid Gift Box",
    description: "Mini orchid with chocolates — perfect for celebrations.",
    price: 32.0,
    salePrice: 27.5,
    isOnSale: true,
    categoryId: "gifts",
    categoryName: "Gifts",
    rating: 4.6,
    reviewCount: 41,
    isFeatured: true,
    isBestSeller: false,
    isNew: false,
    inStock: true,
  },
  {
    id: "5",
    name: "White Lily Elegance",
    description: "Pure white lilies with eucalyptus accents.",
    price: 19.5,
    isOnSale: false,
    categoryId: "arrangements",
    categoryName: "Arrangements",
    rating: 4.5,
    reviewCount: 33,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Pastel Dream Bouquet",
    description: "Pastel roses, carnations, and baby's breath.",
    price: 16.0,
    isOnSale: false,
    categoryId: "bouquets",
    categoryName: "Bouquets",
    rating: 4.4,
    reviewCount: 67,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    inStock: false,
  },
];

export function categoryEmoji(name: string): string {
  const cat = name.toLowerCase();
  if (cat.includes("rose")) return "🌹";
  if (cat.includes("bouquet")) return "💐";
  if (cat.includes("arrangement")) return "🌺";
  if (cat.includes("gift")) return "🎁";
  return "🌸";
}

export function formatKd(amount: number): string {
  return `KD ${amount.toFixed(3)}`;
}

export function displayPrice(product: WebProduct): number {
  return product.isOnSale && product.salePrice != null ? product.salePrice : product.price;
}
