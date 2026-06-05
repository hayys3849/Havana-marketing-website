"use client";

import { AppShell } from "../components/AppShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAppStrings } from "../hooks/use-app-strings";
import { formatKd } from "../services/catalog-service";
import { useHavanaStore } from "../state/havana-store";

interface OrderDetailsScreenProps {
  orderId: string | null;
  onBackClick: () => void;
  onConfirmDelivery: (orderId: string) => void;
}

export function OrderDetailsScreen({
  orderId,
  onBackClick,
  onConfirmDelivery,
}: OrderDetailsScreenProps) {
  const t = useAppStrings();
  const orders = useHavanaStore((s) => s.orders);
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <AppShell className="items-center justify-center gap-4">
        <p>{t.order_not_found}</p>
        <button type="button" onClick={onBackClick} className="havana-primary">{t.back}</button>
      </AppShell>
    );
  }

  const steps = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered"] as const;
  const currentIndex = steps.indexOf(
    order.status === "cancelled" ? "pending" : (order.status as (typeof steps)[number]),
  );

  return (
    <AppShell className="pb-8">
      <ScreenHeader title={order.orderNumber} onBack={onBackClick} backLabel />
      <div className="space-y-4 px-4 md:max-w-2xl md:px-6">
        <section className="havana-card p-4">
          <h2 className="font-semibold">{t.order_progress}</h2>
          <ol className="mt-3 space-y-2 text-sm">
            {steps.map((step, i) => (
              <li key={step} className={i <= currentIndex ? "havana-primary font-medium" : "text-[var(--havana-text-muted)]"}>
                {i <= currentIndex ? "✓" : "○"} {t[`status_${step}` as keyof typeof t] ?? step}
              </li>
            ))}
          </ol>
          {order.status !== "delivered" && order.status !== "cancelled" && (
            <button type="button" className="havana-btn-primary mt-4 w-full rounded-xl py-2.5 text-sm font-semibold" onClick={() => onConfirmDelivery(order.id)}>
              {t.order_confirm_delivery}
            </button>
          )}
        </section>
        <section className="havana-card p-4">
          <h2 className="font-semibold">{t.order_items}</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {order.items.map((i) => (
              <li key={i.productId} className="flex justify-between gap-2">
                <span>{i.name} × {i.quantity}</span>
                <span>{formatKd(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="havana-card p-4 text-sm">
          <h2 className="font-semibold">{t.order_delivery_address}</h2>
          <p className="mt-2">{order.address.mapLabel}</p>
        </section>
        <div className="flex justify-between font-bold px-1">
          <span>{t.grand_total}</span>
          <span className="havana-primary">{formatKd(order.total)}</span>
        </div>
      </div>
    </AppShell>
  );
}
