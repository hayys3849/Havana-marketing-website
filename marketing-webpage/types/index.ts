export interface ProductLocaleText {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  localeText: Record<string, ProductLocaleText>;
  price: number;
  salePrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}