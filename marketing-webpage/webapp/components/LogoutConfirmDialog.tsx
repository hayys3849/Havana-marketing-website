"use client";

import { useAppStrings } from "../hooks/use-app-strings";

interface LogoutConfirmDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmDialog({ onCancel, onConfirm }: LogoutConfirmDialogProps) {
  const t = useAppStrings();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-confirm-title"
      onClick={onCancel}
    >
      <div
        className="havana-card w-full max-w-sm p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="logout-confirm-title" className="text-lg font-semibold">
          {t.profile_logout_confirm_title}
        </h2>
        <p className="mt-2 text-sm text-[var(--havana-text-muted)]">
          {t.profile_logout_confirm_message}
        </p>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-xl border py-2.5 text-sm font-medium"
            onClick={onCancel}
          >
            {t.cancel}
          </button>
          <button
            type="button"
            className="flex-1 rounded-xl border border-[var(--havana-error)]/50 py-2.5 text-sm font-semibold text-[var(--havana-error)]"
            onClick={onConfirm}
          >
            {t.profile_logout}
          </button>
        </div>
      </div>
    </div>
  );
}
