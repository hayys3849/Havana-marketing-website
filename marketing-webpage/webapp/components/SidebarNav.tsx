"use client";

import { Home, ShoppingCart, Receipt, User } from "lucide-react";
import { useAppStrings } from "../hooks/use-app-strings";

export interface MainNavProps {
  active: "home" | "cart" | "orders" | "profile";
  onHome: () => void;
  onCart: () => void;
  onOrders: () => void;
  onProfile: () => void;
}

export function SidebarNav({ active, onHome, onCart, onOrders, onProfile }: MainNavProps) {
  const t = useAppStrings();

  const items = [
    { key: "home" as const, label: t.nav_home, icon: Home, onClick: onHome },
    { key: "cart" as const, label: t.nav_cart, icon: ShoppingCart, onClick: onCart },
    { key: "orders" as const, label: t.nav_orders, icon: Receipt, onClick: onOrders },
    { key: "profile" as const, label: t.nav_profile, icon: User, onClick: onProfile },
  ];

  return (
    <aside className="havana-sidebar hidden lg:flex lg:flex-col">
      <div className="px-5 py-6">
        <p className="text-lg font-bold tracking-[0.2em] havana-primary">{t.home_brand}</p>
        <p className="mt-0.5 text-[10px] font-medium tracking-[0.12em] text-[var(--havana-gold)]">
          {t.home_tagline}
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {items.map(({ key, label, icon: Icon, onClick }) => {
          const selected = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={onClick}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                selected
                  ? "havana-btn-primary font-medium"
                  : "text-[var(--havana-text-muted)] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={selected ? 2.5 : 2} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
