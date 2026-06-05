"use client";

import { useMemo } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { useAppStrings } from "../hooks/use-app-strings";
import { PRODUCTS, CATEGORIES, categoryEmoji, formatKd, displayPrice } from "../mock/catalog";
import { useHavanaStore } from "../state/havana-store";
import type { WebProduct } from "../types";

interface HomeScreenProps {
  onProductClick: (id: string) => void;
  onCartClick: () => void;
  onOrdersClick: () => void;
  onProfileClick: () => void;
}

const OCCASION_KEYS = [
  { key: "occasion_birthday", emoji: "🎂" },
  { key: "occasion_weddings", emoji: "💍" },
  { key: "occasion_anniversary", emoji: "❤️" },
  { key: "occasion_graduation", emoji: "🎓" },
  { key: "occasion_mothers_day", emoji: "🌸" },
  { key: "occasion_love", emoji: "💕" },
  { key: "occasion_eid", emoji: "🌺" },
  { key: "occasion_sympathy", emoji: "😢" },
] as const;

function ProductGridCard({ product, onClick, t }: { product: WebProduct; onClick: () => void; t: ReturnType<typeof useAppStrings> }) {
  const price = displayPrice(product);
  return (
    <button type="button" onClick={onClick} className="havana-card w-full text-left">
      <div className="flex h-[130px] items-center justify-center rounded-t-[14px] bg-black/5 text-4xl dark:bg-white/5 md:h-[150px]">
        {categoryEmoji(product.categoryName)}
      </div>
      <div className="p-2.5 md:p-3">
        <p className="line-clamp-2 min-h-[2.5rem] text-[13px] font-semibold md:text-sm">{product.name}</p>
        <div className="mt-1 flex items-center justify-between">
          <div>
            {product.isOnSale && product.salePrice != null ? (
              <>
                <p className="text-[10px] text-[var(--havana-text-muted)] line-through">{formatKd(product.price)}</p>
                <p className="text-sm font-bold havana-primary">{formatKd(product.salePrice)}</p>
              </>
            ) : (
              <p className="text-sm font-bold havana-primary">{formatKd(price)}</p>
            )}
          </div>
          <span className="text-[10px] text-[var(--havana-text-muted)]">★ {product.rating}</span>
        </div>
        {!product.inStock && (
          <p className="mt-1 text-[11px] font-medium text-[var(--havana-error)]">{t.home_out_of_stock}</p>
        )}
      </div>
    </button>
  );
}

export function HomeScreen({
  onProductClick,
  onCartClick,
  onOrdersClick,
  onProfileClick,
}: HomeScreenProps) {
  const t = useAppStrings();
  const searchQuery = useHavanaStore((s) => s.searchQuery);
  const setSearchQuery = useHavanaStore((s) => s.setSearchQuery);
  const selectedCategory = useHavanaStore((s) => s.selectedCategory);
  const setSelectedCategory = useHavanaStore((s) => s.setSelectedCategory);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "All" || p.categoryName === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featured = PRODUCTS.filter((p) => p.isFeatured);
  const topSelling = PRODUCTS.filter((p) => p.isBestSeller);
  const showSections = !searchQuery && selectedCategory === "All";

  return (
    <AppShell
      withBottomNav
      nav={{
        active: "home",
        onHome: () => {},
        onCart: onCartClick,
        onOrders: onOrdersClick,
        onProfile: onProfileClick,
      }}
    >
      <header className="havana-topbar sticky top-0 z-30 px-4 py-3 md:px-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-[0.2em] havana-primary md:text-2xl">{t.home_brand}</h1>
            <p className="text-[10px] font-medium tracking-[0.15em] text-[var(--havana-gold)] md:text-xs">
              {t.home_tagline}
            </p>
          </div>
          <button type="button" onClick={onCartClick} className="havana-primary p-2" aria-label={t.nav_cart}>
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div className="flex-1 px-4 md:px-6">
        <div className="relative max-w-xl">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--havana-text-muted)]" />
          <input
            className="havana-input rounded-full ps-10"
            placeholder={t.home_search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => {
            const selected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] ${
                  selected ? "havana-btn-primary" : "havana-card"
                }`}
              >
                {cat.emoji} {cat.name === "All" ? (t.home_all_products === "All Products" ? "All" : cat.name) : cat.name}
              </button>
            );
          })}
        </div>

        {showSections && (
          <>
            <h2 className="mt-4 text-lg font-bold">{t.home_shop_by_occasion}</h2>
            <div className="mt-2 flex gap-2.5 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible lg:grid-cols-8">
              {OCCASION_KEYS.map((o) => (
                <div
                  key={o.key}
                  className="havana-card flex w-[90px] shrink-0 flex-col items-center py-3 md:w-auto"
                >
                  <span className="text-3xl">{o.emoji}</span>
                  <span className="mt-1 text-center text-[11px] font-medium">
                    {t[o.key]}
                  </span>
                </div>
              ))}
            </div>

            {featured.length > 0 && (
              <>
                <h2 className="mt-2 text-lg font-bold">{t.home_featured}</h2>
                <div className="mt-2 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
                  {featured.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onProductClick(p.id)}
                      className="havana-card w-[200px] shrink-0 text-left md:w-auto"
                    >
                      <div className="flex h-[140px] items-center justify-center text-4xl">
                        {categoryEmoji(p.categoryName)}
                      </div>
                      <div className="p-3">
                        <span className="rounded bg-[var(--havana-gold)] px-2 py-0.5 text-[10px] font-bold text-black">
                          {t.home_featured_badge}
                        </span>
                        <p className="mt-2 line-clamp-1 text-sm font-semibold">{p.name}</p>
                        <p className="text-sm font-bold havana-primary">{formatKd(displayPrice(p))}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {topSelling.length > 0 && (
              <>
                <h2 className="mt-2 text-lg font-bold">{t.home_top_selling}</h2>
                <div className="mt-2 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-4">
                  {topSelling.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onProductClick(p.id)}
                      className="havana-card w-[150px] shrink-0 text-left md:w-auto"
                    >
                      <div className="flex h-[110px] items-center justify-center text-3xl">
                        {categoryEmoji(p.categoryName)}
                      </div>
                      <div className="p-2.5">
                        <span className="rounded bg-[var(--havana-maroon)] px-1.5 py-0.5 text-[9px] font-bold text-white dark:bg-[var(--havana-gold)] dark:text-black">
                          {t.home_top_badge}
                        </span>
                        <p className="mt-1 line-clamp-1 text-[13px] font-semibold">{p.name}</p>
                        <p className="text-sm font-bold havana-primary">{formatKd(displayPrice(p))}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <h2 className="mt-4 text-lg font-bold">
          {searchQuery ? t.home_search_results : selectedCategory !== "All" ? selectedCategory : t.home_all_products}
        </h2>
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-[var(--havana-text-muted)]">{t.home_no_products}</p>
        ) : (
          <div className="havana-product-grid mt-2 grid grid-cols-2 gap-3 pb-4 md:grid-cols-2">
            {filtered.map((p) => (
              <ProductGridCard key={p.id} product={p} onClick={() => onProductClick(p.id)} t={t} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
