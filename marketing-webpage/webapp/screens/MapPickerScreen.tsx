"use client";

import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAppStrings } from "../hooks/use-app-strings";
import type { DeliveryAddress } from "../types";

const KUWAIT_AREAS = [
  "Salmiya, Block 10",
  "Hawally, Tunis Street",
  "Kuwait City, Sharq",
  "Jabriya, Block 1A",
  "Fahaheel, Sea Front",
];

interface MapPickerScreenProps {
  onAddressConfirmed: (address: DeliveryAddress) => void;
  onBackClick: () => void;
}

export function MapPickerScreen({ onAddressConfirmed, onBackClick }: MapPickerScreenProps) {
  const t = useAppStrings();
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const areas = KUWAIT_AREAS.filter((a) => a.toLowerCase().includes(search.toLowerCase()));

  const confirm = () => {
    if (!selected) return;
    onAddressConfirmed({
      mapLabel: selected,
      block: "",
      street: "",
      building: "",
      floor: "",
      apartment: "",
    });
  };

  return (
    <AppShell className="pb-8">
      <ScreenHeader title={t.map_picker_title} onBack={onBackClick} backLabel />
      <div className="flex flex-1 flex-col px-4 md:max-w-2xl md:mx-auto md:px-6">
        <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-[var(--havana-maroon)]/30 bg-[var(--havana-maroon)]/5 md:h-64 dark:border-[var(--havana-gold)]/30">
          <p className="max-w-xs px-6 text-center text-sm text-[var(--havana-text-muted)]">{t.map_tap_hint}</p>
        </div>
        <input
          className="havana-input mt-4"
          placeholder={t.map_search_placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul className="mt-3 flex-1 space-y-2 overflow-y-auto">
          {areas.map((area) => (
            <li key={area}>
              <button
                type="button"
                onClick={() => setSelected(area)}
                className={`havana-card w-full px-4 py-3 text-left text-sm ${
                  selected === area ? "ring-2 ring-[var(--havana-maroon)] dark:ring-[var(--havana-gold)]" : ""
                }`}
              >
                📍 {area}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={!selected}
          className="havana-btn-primary mt-4 w-full rounded-xl py-3 font-semibold disabled:opacity-50 md:max-w-md md:mx-auto"
          onClick={confirm}
        >
          {t.map_confirm_address}
        </button>
      </div>
    </AppShell>
  );
}
