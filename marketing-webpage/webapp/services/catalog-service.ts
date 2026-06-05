import type { WebCategory, WebProduct } from "../types";
import {
  CATEGORIES,
  PRODUCTS,
  categoryEmoji,
  displayPrice,
  formatKd,
} from "../mock/catalog";

/**
 * Catalog data access layer.
 * Today: in-memory mock catalog. Future: swap internals for API/repository calls
 * without changing UI or store consumers.
 */
export const catalogService = {
  getProducts(): WebProduct[] {
    return PRODUCTS;
  },

  getProductById(id: string): WebProduct | undefined {
    return PRODUCTS.find((p) => p.id === id);
  },

  getCategories(): WebCategory[] {
    return CATEGORIES;
  },

  filterProducts(query: string, categoryName: string): WebProduct[] {
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesCategory = categoryName === "All" || p.categoryName === categoryName;
      return matchesSearch && matchesCategory;
    });
  },

  getFeaturedProducts(): WebProduct[] {
    return PRODUCTS.filter((p) => p.isFeatured);
  },

  getBestSellerProducts(): WebProduct[] {
    return PRODUCTS.filter((p) => p.isBestSeller);
  },
};

export { categoryEmoji, displayPrice, formatKd };
