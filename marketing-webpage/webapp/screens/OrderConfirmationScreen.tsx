"use client";

import { CheckCircle } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { useAppStrings } from "../hooks/use-app-strings";
import { formatKd } from "../mock/catalog";
import type { Order } from "../types";

interface OrderConfirmationScreenProps {
  order: Order | null;
  onViewOrders: () => void;
  onContinueShopping: () => void;
}

export function OrderConfirmationScreen({
  order,
  onViewOrders,
  onContinueShopping,
}: OrderConfirmationScreenProps) {
  const t = useAppStrings();

  if (!order) {
    return (
      <AppShell className="items-center justify-center">
        <button type="button" onClick={onContinueShopping} className="havana-primary">
          {t.confirmation_continue_shopping}
        </button>
      </AppShell>
    );
  }

  return (
    <AppShell className="items-center px-6 py-12 text-center md:max-w-lg md:mx-auto">
      <CheckCircle className="h-16 w-16 text-[var(--havana-success)]" />
      <h1 className="mt-4 text-2xl font-bold">{t.confirmation_title}</h1>
      <p className="mt-2 text-sm text-[var(--havana-text-muted)]">{t.confirmation_thank_you}</p>
      <div className="havana-card mt-8 w-full p-4 text-left">
        <p className="text-xs text-[var(--havana-text-muted)]">{t.confirmation_order_number}</p>
        <p className="text-lg font-bold havana-primary">{order.orderNumber}</p>
        <p className="mt-4 text-sm font-semibold">{t.confirmation_order_items}</p>
        <ul className="mt-2 space-y-1 text-sm">
          {order.items.map((i) => (
            <li key={i.productId} className="flex justify-between gap-2">
              <span>{i.name} × {i.quantity}</span>
              <span>{formatKd(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t pt-2 font-bold">
          <span>{t.grand_total}</span>
          <span>{formatKd(order.total)}</span>
        </div>
      </div>
      <button type="button" className="havana-btn-primary mt-6 w-full max-w-md rounded-xl py-3 font-semibold" onClick={onViewOrders}>
        {t.confirmation_view_orders}
      </button>
      <button type="button" className="mt-3 w-full max-w-md rounded-xl border py-3 font-semibold" onClick={onContinueShopping}>
        {t.confirmation_continue_shopping}
      </button>
    </AppShell>
  );
}
