"use client";

import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  /** Extra bottom padding when bottom nav is shown */
  withBottomNav?: boolean;
}

export function AppShell({ children, className, withBottomNav }: AppShellProps) {
  return (
    <div
      className={cn(
        "havana-shell mx-auto flex min-h-dvh w-full flex-col",
        withBottomNav && "pb-[4.5rem] md:pb-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
