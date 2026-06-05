import { create } from "zustand";

interface ProductEntryStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useProductEntryStore = create<ProductEntryStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
