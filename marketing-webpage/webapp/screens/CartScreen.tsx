"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { EmptyState } from "../components/EmptyState";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAppStrings } from "../hooks/use-app-strings";
import { formatKd } from "../mock/catalog";
import { useHavanaStore } from "../state/havana-store";

interface CartScreenProps {
  onBackClick: () => void;
  onCheckoutClick: () => void;
  onHomeClick: () => void;
  onOrdersClick: () => void;
  onProfileClick: () => void;
}

function CartSummaryPanel({
  itemCount,
  subtotal,
  onCheckoutClick,
  t,
  className,
}: {
  itemCount: number;
  subtotal: number;
  onCheckoutClick: () => void;
  t: ReturnType<typeof useAppStrings>;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex justify-between text-sm">
        <span>{t.cart_total_items.replace("%d", String(itemCount))}</span>
        <span className="text-xl font-bold havana-primary">{formatKd(subtotal)}</span>
      </div>
      <button
        type="button"
        className="havana-btn-primary mt-3 w-full rounded-xl py-3 text-base font-semibold"
        onClick={onCheckoutClick}
      >
        {t.cart_proceed_checkout}
      </button>
    </div>
  );
}

export function CartScreen({
  onBackClick,
  onCheckoutClick,
  onHomeClick,
  onOrdersClick,
  onProfileClick,
}: CartScreenProps) {
  const t = useAppStrings();
  const cart = useHavanaStore((s) => s.cart);
  const updateCartQuantity = useHavanaStore((s) => s.updateCartQuantity);
  const removeFromCart = useHavanaStore((s) => s.removeFromCart);
  const cartSubtotal = useHavanaStore((s) => s.cartSubtotal);
  const cartItemCount = useHavanaStore((s) => s.cartItemCount);

  const subtotal = cartSubtotal();
  const itemCount = cartItemCount();
  const isEmpty = cart.length === 0;

  return (
    <AppShell
      withBottomNav
      className={isEmpty ? "pb-20 lg:pb-0" : "pb-36 lg:pb-0"}
      nav={{
        active: "cart",
        onHome: onHomeClick,
        onCart: () => {},
        onOrders: onOrdersClick,
        onProfile: onProfileClick,
      }}
    >
      <ScreenHeader title={t.cart_title} onBack={onBackClick} />

      {isEmpty ? (
        <EmptyState
          icon="🛒"
          title={t.cart_empty}
          subtitle={t.cart_empty_subtitle}
          actionLabel={t.cart_browse_products}
          onAction={onHomeClick}
        />
      ) : (
        <div className="lg:flex lg:flex-1 lg:gap-6 lg:px-6 lg:pb-6">
          <ul className="flex-1 space-y-3 px-4 md:px-6 lg:space-y-3 lg:px-0">
            {cart.map((item) => (
              <li key={item.productId} className="havana-card flex gap-3 p-3 lg:p-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-black/5 text-2xl dark:bg-white/5">
                  🌸
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm havana-primary">
                    {formatKd(item.price)} <span className="text-[var(--havana-text-muted)]">{t.cart_each}</span>
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded border p-1"
                      onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                      aria-label="Decrease"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      className="rounded border p-1"
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                      aria-label="Increase"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      className="ml-auto text-[var(--havana-error)]"
                      onClick={() => removeFromCart(item.productId)}
                      aria-label={t.remove}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="havana-card mx-4 hidden p-4 lg:sticky lg:top-4 lg:mx-0 lg:block lg:w-80 lg:shrink-0 lg:self-start">
            <h2 className="mb-3 font-semibold">{t.checkout_order_summary}</h2>
            <CartSummaryPanel
              itemCount={itemCount}
              subtotal={subtotal}
              onCheckoutClick={onCheckoutClick}
              t={t}
            />
          </aside>

          <div className="havana-checkout-bar fixed bottom-16 left-0 right-0 z-20 mx-auto max-w-[960px] border-t px-4 py-4 md:px-6 lg:hidden">
            <CartSummaryPanel
              itemCount={itemCount}
              subtotal={subtotal}
              onCheckoutClick={onCheckoutClick}
              t={t}
            />
          </div>
        </div>
      )}
    </AppShell>
  );
}
