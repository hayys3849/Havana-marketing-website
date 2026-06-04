"use client";

import { useProductEntryStore } from "@/store/product-entry-store";
import { ProductEntryModal } from "./product-entry-modal";
import { MockGooglePicker } from "./mock-google-picker";

export function ProductEntryBridge() {
  const isModalOpen = useProductEntryStore((s) => s.isModalOpen);
  const isGooglePickerOpen = useProductEntryStore((s) => s.isGooglePickerOpen);

  return (
    <>
      {isModalOpen && <ProductEntryModal />}
      {isGooglePickerOpen && <MockGooglePicker />}
    </>
  );
}
