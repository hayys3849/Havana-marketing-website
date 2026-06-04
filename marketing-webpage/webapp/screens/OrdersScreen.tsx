"use client";

import { AppShell } from "../components/AppShell";
import { BottomNav } from "../components/BottomNav";
import { EmptyState } from "../components/EmptyState";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAppStrings } from "../hooks/use-app-strings";
import { formatKd } from "../mock/catalog";
import { useHavanaStore } from "../state/havana-store";

interface OrdersScreenProps {
  onOrderClick: (orderId: string) => void;
  onHomeClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
}

const FILTERS = [
  { key: "all", labelKey: "orders_filter_all" as const },
  { key: "pending", labelKey: "orders_filter_pending" as const },
  { key: "confirmed", labelKey: "orders_filter_confirmed" as const },
  { key: "preparing", labelKey: "orders_filter_preparing" as const },
  { key: "out_for_delivery", labelKey: "orders_filter_delivery" as const },
  { key: "delivered", labelKey: "orders_filter_done" as const },
  { key: "cancelled", labelKey: "orders_filter_cancelled" as const },
];

export function OrdersScreen({
  onOrderClick,
  onHomeClick,
  onCartClick,
  onProfileClick,
}: OrdersScreenProps) {
  const t = useAppStrings();
  const orders = useHavanaStore((s) => s.orders);
  const ordersFilter = useHavanaStore((s) => s.ordersFilter);
  const setOrdersFilter = useHavanaStore((s) => s.setOrdersFilter);

  const filtered =
    ordersFilter === "all" ? orders : orders.filter((o) => o.status === ordersFilter);

  return (
    <AppShell withBottomNav className="pb-24">
      <ScreenHeader title={t.orders_title} />

      <div className="flex gap-2 overflow-x-auto px-4 py-2 md:px-6">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setOrdersFilter(f.key)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
              ordersFilter === f.key ? "havana-btn-primary" : "havana-card border border-transparent"
            }`}
          >
            {t[f.labelKey]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="📋"
          iconClassName="text-[3rem] leading-none"
          title={t.orders_no_orders}
          subtitle={t.orders_appear_here}
        />
      ) : (
        <ul className="flex-1 space-y-3 px-4 pb-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3 md:px-6">
          {filtered.map((order) => (
            <li key={order.id}>
              <button
                type="button"
                onClick={() => onOrderClick(order.id)}
                className="havana-card w-full p-4 text-left transition-opacity hover:opacity-90"
              >
                <div className="flex justify-between gap-2">
                  <span className="font-semibold">{order.orderNumber}</span>
                  <span className="text-xs text-[var(--havana-text-muted)]">{order.status}</span>
                </div>
                <p className="mt-1 text-sm text-[var(--havana-text-muted)]">
                  {order.items.length} items · {new Date(order.placedAt).toLocaleDateString()}
                </p>
                <p className="mt-2 font-bold havana-primary">{formatKd(order.total)}</p>
              </button>
            </li>
          ))}
        </ul>
      )}

      <BottomNav
        active="orders"
        onHome={onHomeClick}
        onCart={onCartClick}
        onOrders={() => {}}
        onProfile={onProfileClick}
      />
    </AppShell>
  );
}
