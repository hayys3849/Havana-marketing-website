"use client";

import { Suspense, useEffect } from "react";
import { HavanaApp } from "@/webapp/HavanaApp";
import { ThemeSync } from "@/webapp/components/ThemeSync";
import { useHavanaStore } from "@/webapp/state/havana-store";

function WebAppEntry() {
  const enterApp = useHavanaStore((s) => s.enterApp);

  useEffect(() => {
    enterApp();
  }, [enterApp]);

  return (
    <>
      <ThemeSync />
      <HavanaApp />
    </>
  );
}

export default function WebAppPage() {
  return (
    <Suspense fallback={<div className="flex min-h-dvh items-center justify-center">Loading…</div>}>
      <WebAppEntry />
    </Suspense>
  );
}
