"use client";

import { useAppStrings } from "../hooks/use-app-strings";
import { buildMainNavItems, type MainNavProps } from "./main-nav-config";

export type { MainNavProps } from "./main-nav-config";

export function BottomNav(props: MainNavProps) {
  const t = useAppStrings();
  const items = buildMainNavItems(t, props);

  return (
    <nav className="havana-nav fixed bottom-0 left-0 right-0 z-40 mx-auto flex w-full max-w-[960px] justify-around px-2 py-2 safe-area-pb lg:hidden">
      {items.map(({ key, label, icon: Icon, onClick }) => {
        const selected = props.active === key;
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
