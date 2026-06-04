"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAppStrings } from "../hooks/use-app-strings";
import { formatKd } from "../mock/catalog";
import { useHavanaStore } from "../state/havana-store";
import { profileDisplayName } from "../types";
import type { DeliveryAddress } from "../types";

interface CheckoutScreenProps {
  onBackClick: () => void;
  onPickOnMap: () => void;
  savedAddress: DeliveryAddress | null;
}

export function CheckoutScreen({ onBackClick, onPickOnMap, savedAddress }: CheckoutScreenProps) {
  const t = useAppStrings();
  const cart = useHavanaStore((s) => s.cart);
  const cartSubtotal = useHavanaStore((s) => s.cartSubtotal);
  const placeOrder = useHavanaStore((s) => s.placeOrder);
  const profile = useHavanaStore((s) => s.profile);

  const [block, setBlock] = useState(savedAddress?.block ?? "");
  const [street, setStreet] = useState(savedAddress?.street ?? "");
  const [building, setBuilding] = useState(savedAddress?.building ?? "");
  const [floor, setFloor] = useState(savedAddress?.floor ?? "");
  const [apartment, setApartment] = useState(savedAddress?.apartment ?? "");
  const [name, setName] = useState(profileDisplayName(profile));
  const [phone, setPhone] = useState(profile.phone);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const subtotal = cartSubtotal();
  const deliveryFee = 2.0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!savedAddress?.mapLabel) {
      setError(t.checkout_error_address);
      return;
    }
    if (!name.trim()) {
      setError(t.checkout_error_name);
      return;
    }
    if (!phone.trim()) {
      setError(t.checkout_error_phone);
      return;
    }
    setError("");
    placeOrder({
      address: { block, street, building, floor, apartment, mapLabel: savedAddress.mapLabel },
      customerName: name,
      customerPhone: phone,
      notes,
    });
  };

  return (
    <AppShell className="pb-8">
      <ScreenHeader title={t.checkout_title} onBack={onBackClick} backLabel />
      <div className="space-y-4 px-4 md:max-w-2xl md:px-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <section className="havana-card p-4">
          <h2 className="font-semibold">{t.checkout_order_summary}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {cart.map((c) => (
              <li key={c.productId} className="flex justify-between gap-2">
                <span>{c.name} × {c.quantity}</span>
                <span>{formatKd(c.price * c.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1 border-t pt-2 text-sm">
            <div className="flex justify-between"><span>{t.subtotal}</span><span>{formatKd(subtotal)}</span></div>
            <div className="flex justify-between"><span>{t.delivery_fee}</span><span>{formatKd(deliveryFee)}</span></div>
            <div className="flex justify-between font-bold"><span>{t.grand_total}</span><span className="havana-primary">{formatKd(total)}</span></div>
          </div>
        </section>

        <div className="space-y-4">
          <section className="havana-card p-4">
            <h2 className="font-semibold">{t.checkout_delivery_address}</h2>
            {savedAddress?.mapLabel ? (
              <p className="mt-2 text-sm text-[var(--havana-success)]">📍 {savedAddress.mapLabel}</p>
            ) : (
              <p className="mt-2 text-sm text-[var(--havana-error)]">{t.checkout_pick_address_warning}</p>
            )}
            <button type="button" onClick={onPickOnMap} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              {savedAddress ? t.checkout_change_location : t.checkout_pick_location}
            </button>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div><label className="text-xs text-[var(--havana-text-muted)]">{t.checkout_block}</label><input className="havana-input mt-1" value={block} onChange={(e) => setBlock(e.target.value)} /></div>
              <div><label className="text-xs text-[var(--havana-text-muted)]">{t.checkout_street}</label><input className="havana-input mt-1" value={street} onChange={(e) => setStreet(e.target.value)} /></div>
              <div><label className="text-xs text-[var(--havana-text-muted)]">{t.checkout_building}</label><input className="havana-input mt-1" value={building} onChange={(e) => setBuilding(e.target.value)} /></div>
              <div><label className="text-xs text-[var(--havana-text-muted)]">{t.checkout_floor}</label><input className="havana-input mt-1" value={floor} onChange={(e) => setFloor(e.target.value)} /></div>
              <div className="col-span-2"><label className="text-xs text-[var(--havana-text-muted)]">{t.checkout_apartment}</label><input className="havana-input mt-1" value={apartment} onChange={(e) => setApartment(e.target.value)} /></div>
            </div>
          </section>
          <section className="havana-card space-y-2 p-4">
            <input className="havana-input" placeholder={t.checkout_full_name} value={name} onChange={(e) => setName(e.target.value)} />
            <input className="havana-input" placeholder={t.checkout_contact_number} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea className="havana-input min-h-[80px]" placeholder={t.checkout_order_notes_placeholder} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </section>
          {error && <p className="text-sm text-[var(--havana-error)]">{error}</p>}
          <button type="button" className="havana-btn-primary w-full rounded-xl py-3 font-semibold" onClick={handlePlaceOrder}>
            {t.checkout_place_order}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
