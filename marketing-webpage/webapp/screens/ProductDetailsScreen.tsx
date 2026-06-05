"use client";

import { useState } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { useAppStrings } from "../hooks/use-app-strings";
import { catalogService, categoryEmoji, displayPrice, formatKd } from "../services/catalog-service";
import { useHavanaStore } from "../state/havana-store";

interface ProductDetailsScreenProps {
  productId: string;
  onBackClick: () => void;
  onCartClick: () => void;
  onCheckoutClick: () => void;
}

export function ProductDetailsScreen({
  productId,
  onBackClick,
  onCartClick,
  onCheckoutClick,
}: ProductDetailsScreenProps) {
  const t = useAppStrings();
  const [quantity, setQuantity] = useState(1);
  const addToCart = useHavanaStore((s) => s.addToCart);
  const product = catalogService.getProductById(productId);

  if (!product) {
    return (
      <AppShell className="items-center justify-center">
        <button type="button" onClick={onBackClick} className="havana-primary">
          {t.back}
        </button>
      </AppShell>
    );
  }

  const price = displayPrice(product);

  return (
    <AppShell className="pb-8">
      <header className="havana-topbar sticky top-0 z-30 flex items-center justify-between px-4 py-3 md:px-6">
        <button type="button" onClick={onBackClick} className="flex items-center gap-1 havana-primary">
          <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
        </button>
        <button type="button" onClick={onCartClick} className="havana-primary p-2" aria-label={t.nav_cart}>
          <ShoppingCart className="h-5 w-5" />
        </button>
      </header>
      <div className="md:grid md:grid-cols-2 md:gap-8 md:px-6">
        <div className="flex h-56 items-center justify-center bg-black/5 text-6xl dark:bg-white/5 md:h-80 md:rounded-2xl">
          {categoryEmoji(product.categoryName)}
        </div>
        <div className="px-4 pt-4 md:px-0 md:pt-0">
          <h1 className="text-xl font-bold md:text-2xl">{product.name}</h1>
          <p className="mt-1 text-sm text-[var(--havana-text-muted)]">
            ★ {product.rating} ({product.reviewCount})
          </p>
          <p className="mt-2 text-2xl font-bold havana-primary">{formatKd(price)}</p>
          <p className="mt-1 text-sm">
            {product.inStock ? (
              <span className="text-[var(--havana-success)]">{t.product_in_stock}</span>
            ) : (
              <span className="text-[var(--havana-error)]">{t.product_out_of_stock}</span>
            )}
          </p>
          <h2 className="mt-6 font-semibold">{t.product_description}</h2>
          <p className="mt-2 text-sm text-[var(--havana-text-muted)]">{product.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium">{t.product_quantity}</span>
            <div className="flex items-center gap-3">
              <button type="button" className="havana-card flex h-9 w-9 items-center justify-center" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <button type="button" className="havana-card flex h-9 w-9 items-center justify-center" onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:max-w-md">
            <button
              type="button"
              disabled={!product.inStock}
              className="havana-btn-primary flex-1 rounded-xl py-3 font-semibold disabled:opacity-50"
              onClick={() => { addToCart(product.id, quantity); onCartClick(); }}
            >
              {t.product_add_to_cart}
            </button>
            <button
              type="button"
              disabled={!product.inStock}
              className="havana-card flex-1 rounded-xl py-3 font-semibold disabled:opacity-50"
              onClick={() => { addToCart(product.id, quantity); onCheckoutClick(); }}
            >
              {t.product_checkout}
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
