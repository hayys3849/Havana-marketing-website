"use client";

import { useRouter } from "next/navigation";
import { useProductEntryStore } from "@/store/product-entry-store";

export function ProductEntryModal() {
  const router = useRouter();
  const closeModal = useProductEntryStore((s) => s.closeModal);

  const handleWebApp = () => {
    closeModal();
    router.push("/app");
  };

  const handleDownload = () => {
    closeModal();
    router.push("/download");
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-entry-title"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="product-entry-title" className="text-lg font-semibold text-foreground">
          Continue with Havana
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose how you would like to shop this product.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleWebApp}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            Continue to Web App
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="w-full rounded-xl bg-maroon px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-gold dark:text-black"
          >
            Download Mobile App
          </button>
        </div>
      </div>
    </div>
  );
}
