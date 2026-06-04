"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { HavanaApp } from "@/webapp/HavanaApp";
import { ThemeSync } from "@/webapp/components/ThemeSync";
import { useHavanaStore } from "@/webapp/state/havana-store";

function WebAppEntry() {
  const searchParams = useSearchParams();
  const bootstrapFromMarketing = useHavanaStore((s) => s.bootstrapFromMarketing);

  useEffect(() => {
    if (searchParams.get("from") === "google-mock") {
      bootstrapFromMarketing();
      window.history.replaceState({}, "", "/app");
    }
  }, [searchParams, bootstrapFromMarketing]);

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
