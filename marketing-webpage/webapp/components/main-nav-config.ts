import { Home, Receipt, ShoppingCart, User, type LucideIcon } from "lucide-react";
import type { AppStrings } from "../i18n";

export type MainNavKey = "home" | "cart" | "orders" | "profile";

export interface MainNavProps {
  active: MainNavKey;
  onHome: () => void;
  onCart: () => void;
  onOrders: () => void;
  onProfile: () => void;
}

export interface MainNavItem {
  key: MainNavKey;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export function buildMainNavItems(t: AppStrings, nav: MainNavProps): MainNavItem[] {
  return [
    { key: "home", label: t.nav_home, icon: Home, onClick: nav.onHome },
    { key: "cart", label: t.nav_cart, icon: ShoppingCart, onClick: nav.onCart },
    { key: "orders", label: t.nav_orders, icon: Receipt, onClick: nav.onOrders },
    { key: "profile", label: t.nav_profile, icon: User, onClick: nav.onProfile },
  ];
}
