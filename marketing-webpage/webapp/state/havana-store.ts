import { create } from "zustand";
import type {
  AppLocale,
  AppScreen,
  CartItem,
  DeliveryAddress,
  Order,
  ThemeMode,
  UserProfile,
} from "../types";
import { catalogService } from "../services/catalog-service";

const DELIVERY_FEE = 2.0;

const defaultProfile: UserProfile = {
  firstName: "Havana",
  lastName: "Guest",
  email: "guest@havana.flowers",
  phone: "+965 5000 0000",
  emailVerified: true,
  deliveryAddressFull: null,
};

const initialSessionState = {
  currentScreen: "home" as AppScreen,
  selectedProductId: null as string | null,
  selectedAddress: null as DeliveryAddress | null,
  selectedOrderId: null as string | null,
  lastPlacedOrder: null as Order | null,
  cart: [] as CartItem[],
  orders: [] as Order[],
  profile: defaultProfile,
  searchQuery: "",
  selectedCategory: "All",
  ordersFilter: "all",
};

function normalizeProfile(patch: Partial<UserProfile> & { name?: string }): Partial<UserProfile> {
  const next = { ...patch };
  if (patch.name && !patch.firstName) {
    const parts = patch.name.trim().split(/\s+/);
    next.firstName = parts[0] ?? "";
    next.lastName = parts.slice(1).join(" ") || "";
    delete (next as { name?: string }).name;
  }
  return next;
}

interface HavanaStore {
  currentScreen: AppScreen;
  selectedProductId: string | null;
  selectedAddress: DeliveryAddress | null;
  selectedOrderId: string | null;
  lastPlacedOrder: Order | null;
  themeMode: ThemeMode;
  locale: AppLocale;
  cart: CartItem[];
  orders: Order[];
  profile: UserProfile;
  searchQuery: string;
  selectedCategory: string;
  ordersFilter: string;

  /** Ensures the app session is ready (used on /app entry). */
  enterApp: () => void;
  /** Clears runtime session state. Caller handles redirect to landing page. */
  signOut: () => void;
  /** Reserved for future authentication integration (LoginScreen / SignupScreen). */
  signIn: (profile?: Partial<UserProfile> & { name?: string; email?: string }) => void;
  navigate: (screen: AppScreen) => void;
  setSelectedProductId: (id: string | null) => void;
  setSelectedAddress: (address: DeliveryAddress | null) => void;
  setSelectedOrderId: (id: string | null) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleArabic: (enabled: boolean) => void;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (name: string) => void;
  setOrdersFilter: (filter: string) => void;

  addToCart: (productId: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  cartSubtotal: () => number;
  cartItemCount: () => number;
  placeOrder: (payload: {
    address: DeliveryAddress;
    customerName: string;
    customerPhone: string;
    notes?: string;
  }) => Order | null;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
}

export const useHavanaStore = create<HavanaStore>((set, get) => ({
  ...initialSessionState,
  themeMode: "system",
  locale: "en",

  enterApp: () => {
    set({ currentScreen: "home" });
  },

  signIn: (profile) => {
    const normalized = profile ? normalizeProfile(profile) : {};
    if (normalized.email && !normalized.firstName) {
      const local = normalized.email.split("@")[0] ?? "User";
      normalized.firstName = local;
      normalized.lastName = normalized.lastName || "";
    }
    set((s) => ({
      currentScreen: "home",
      profile: { ...s.profile, ...normalized },
    }));
  },

  signOut: () => {
    set({
      ...initialSessionState,
      themeMode: get().themeMode,
      locale: get().locale,
    });
  },

  navigate: (screen) => set({ currentScreen: screen }),
  setSelectedProductId: (id) => set({ selectedProductId: id }),
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  setSelectedOrderId: (id) => set({ selectedOrderId: id }),
  setThemeMode: (mode) => set({ themeMode: mode }),
  toggleArabic: (enabled) => set({ locale: enabled ? "ar" : "en" }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedCategory: (name) => set({ selectedCategory: name }),
  setOrdersFilter: (filter) => set({ ordersFilter: filter }),

  addToCart: (productId, quantity = 1) => {
    const product = catalogService.getProductById(productId);
    if (!product || !product.inStock) return;
    const price =
      product.isOnSale && product.salePrice != null ? product.salePrice : product.price;
    set((s) => {
      const existing = s.cart.find((c) => c.productId === productId);
      if (existing) {
        return {
          cart: s.cart.map((c) =>
            c.productId === productId
              ? { ...c, quantity: c.quantity + quantity }
              : c,
          ),
        };
      }
      return {
        cart: [
          ...s.cart,
          {
            productId,
            name: product.name,
            price,
            quantity,
            category: product.categoryName,
          },
        ],
      };
    });
  },

  updateCartQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set((s) => ({
      cart: s.cart.map((c) => (c.productId === productId ? { ...c, quantity } : c)),
    }));
  },

  removeFromCart: (productId) => {
    set((s) => ({ cart: s.cart.filter((c) => c.productId !== productId) }));
  },

  cartSubtotal: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

  cartItemCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

  placeOrder: (payload) => {
    const { cart, cartSubtotal } = get();
    if (cart.length === 0) return null;
    const subtotal = cartSubtotal();
    const order: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `HV-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "pending",
      items: cart.map((c) => ({
        productId: c.productId,
        name: c.name,
        price: c.price,
        quantity: c.quantity,
      })),
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total: subtotal + DELIVERY_FEE,
      placedAt: new Date().toISOString(),
      address: payload.address,
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      notes: payload.notes,
      paymentMethod: "Cash on Delivery",
    };
    set((s) => ({
      orders: [order, ...s.orders],
      lastPlacedOrder: order,
      cart: [],
      currentScreen: "orderConfirmation",
    }));
    return order;
  },

  updateOrderStatus: (orderId, status) => {
    set((s) => ({
      orders: s.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
    }));
  },

  updateProfile: (patch) => {
    set((s) => ({ profile: { ...s.profile, ...normalizeProfile(patch) } }));
  },
}));
