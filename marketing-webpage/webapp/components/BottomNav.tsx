"use client";

import { Home, ShoppingCart, Receipt, User } from "lucide-react";
import { useAppStrings } from "../hooks/use-app-strings";

interface BottomNavProps {
  active: "home" | "cart" | "orders" | "profile";
  onHome: () => void;
  onCart: () => void;
  onOrders: () => void;
  onProfile: () => void;
}

export function BottomNav({ active, onHome, onCart, onOrders, onProfile }: BottomNavProps) {
  const t = useAppStrings();

  const items = [
    { key: "home" as const, label: t.nav_home, icon: Home, onClick: onHome },
    { key: "cart" as const, label: t.nav_cart, icon: ShoppingCart, onClick: onCart },
    { key: "orders" as const, label: t.nav_orders, icon: Receipt, onClick: onOrders },
    { key: "profile" as const, label: t.nav_profile, icon: User, onClick: onProfile },
  ];

  return (
    <nav className="havana-nav fixed bottom-0 left-0 right-0 z-40 mx-auto flex w-full max-w-[960px] justify-around px-2 py-2 safe-area-pb lg:hidden">
      {items.map(({ key, label, icon: Icon, onClick }) => {
        const selected = active === key;
        return (
          <button
            key={key}
            type="button"
            onClick={onClick}
            className={`flex flex-1 flex-col items-center gap-0.5 py-1 text-[11px] md:text-xs ${
              selected ? "havana-primary font-medium" : "text-[var(--havana-text-muted)]"
            }`}
          >
            <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={selected ? 2.5 : 2} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
