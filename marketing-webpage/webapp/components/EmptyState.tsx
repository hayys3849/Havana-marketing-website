"use client";

interface EmptyStateProps {
  icon: string;
  iconClassName?: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Centered empty state matching Android cart / orders pattern */
export function EmptyState({
  icon,
  iconClassName = "text-[3.5rem] leading-none",
  title,
  subtitle,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-10 py-8 text-center">
      <span className={iconClassName} role="img" aria-hidden>
        {icon}
      </span>
      <h2 className="mt-3 text-lg font-semibold">{title}</h2>
      {subtitle && (
        <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-[var(--havana-text-muted)]">
          {subtitle}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl border border-[var(--havana-maroon)] px-6 py-2.5 text-sm font-semibold havana-primary dark:border-[var(--havana-gold)]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
