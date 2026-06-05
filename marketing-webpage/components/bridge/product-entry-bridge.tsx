"use client";

import { useProductEntryStore } from "@/store/product-entry-store";
import { ProductEntryModal } from "./product-entry-modal";

export function ProductEntryBridge() {
  const isModalOpen = useProductEntryStore((s) => s.isModalOpen);

  return <>{isModalOpen && <ProductEntryModal />}</>;
}
