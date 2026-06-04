import { create } from "zustand";

interface ProductEntryStore {
  isModalOpen: boolean;
  isGooglePickerOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  openGooglePicker: () => void;
  closeGooglePicker: () => void;
}

export const useProductEntryStore = create<ProductEntryStore>((set) => ({
  isModalOpen: false,
  isGooglePickerOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, isGooglePickerOpen: false }),
  openGooglePicker: () => set({ isGooglePickerOpen: true }),
  closeGooglePicker: () => set({ isGooglePickerOpen: false }),
}));
