"use client";

import { cn } from "@/lib/utils";
import { BottomNav } from "./BottomNav";
import { SidebarNav, type MainNavProps } from "./SidebarNav";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  /** Extra bottom padding when bottom nav is shown (mobile/tablet only) */
  withBottomNav?: boolean;
  /** When provided, renders sidebar on desktop and bottom nav on mobile/tablet */
  nav?: MainNavProps;
}

export function AppShell({ children, className, withBottomNav, nav }: AppShellProps) {
  return (
    <div className={cn(nav && "havana-shell-root")}>
      {nav && <SidebarNav {...nav} />}
      <div
        className={cn(
          "havana-shell mx-auto flex min-h-dvh w-full flex-col",
          nav && "havana-shell-main",
          withBottomNav && "pb-[4.5rem] md:pb-20 lg:pb-0",
          className,
        )}
      >
        {children}
        {nav && <BottomNav {...nav} />}
      </div>
    </div>
  );
}
