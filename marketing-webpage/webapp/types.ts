export type AppScreen =
  | "login"
  | "signup"
  | "home"
  | "productDetails"
  | "cart"
  | "checkout"
  | "mapPicker"
  | "orderConfirmation"
  | "orders"
  | "orderDetails"
  | "profile";

export type ThemeMode = "light" | "dark" | "system";
export type AppLocale = "en" | "ar";

export type EditableField = "FULL_NAME" | "CONTACT_NUMBER" | "DELIVERY_ADDRESS";

export interface WebCategory {
  id: string;
  name: string;
  emoji: string;
}

export interface WebProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  isOnSale: boolean;
  categoryId: string;
  categoryName: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface DeliveryAddress {
  block: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  mapLabel: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  placedAt: string;
  address: DeliveryAddress;
  customerName: string;
  customerPhone: string;
  notes?: string;
  paymentMethod: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  deliveryAddressFull: string | null;
}

export function profileDisplayName(profile: UserProfile): string {
  return `${profile.firstName} ${profile.lastName}`.trim();
}
