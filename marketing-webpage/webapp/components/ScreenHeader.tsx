"use client";

import { ArrowLeft } from "lucide-react";
import { useAppStrings } from "../hooks/use-app-strings";

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  backLabel?: boolean;
}

export function ScreenHeader({ title, onBack, backLabel }: ScreenHeaderProps) {
  const t = useAppStrings();
  return (
    <header className="havana-topbar sticky top-0 z-30 flex items-center gap-2 px-4 py-3 md:px-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 havana-primary"
          aria-label={t.back}
        >
          <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
          {backLabel && <span className="text-sm">{t.back}</span>}
        </button>
      )}
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
}
