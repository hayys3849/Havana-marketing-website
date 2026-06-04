"use client";

import { useRouter } from "next/navigation";
import { useProductEntryStore } from "@/store/product-entry-store";

const MOCK_ACCOUNTS = [
  { id: "1", name: "Alex Rivera", email: "alex.rivera@gmail.com", avatar: "A" },
  { id: "2", name: "Samira Al-Hajri", email: "samira.h@gmail.com", avatar: "S" },
  { id: "3", name: "Jordan Lee", email: "jordan.lee@gmail.com", avatar: "J" },
];

export function MockGooglePicker() {
  const router = useRouter();
  const closeGooglePicker = useProductEntryStore((s) => s.closeGooglePicker);
  const closeModal = useProductEntryStore((s) => s.closeModal);

  const selectAccount = () => {
    closeGooglePicker();
    closeModal();
    router.push("/app?from=google-mock");
  };

  return (
    <div
      className="fixed inset-0 z-[210] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choose a Google account"
      onClick={() => {
        closeGooglePicker();
        closeModal();
      }}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#303134]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#4285F4]">G</span>
            <span className="text-xl font-bold text-[#EA4335]">o</span>
            <span className="text-xl font-bold text-[#FBBC05]">o</span>
            <span className="text-xl font-bold text-[#4285F4]">g</span>
            <span className="text-xl font-bold text-[#34A853]">l</span>
            <span className="text-xl font-bold text-[#EA4335]">e</span>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Choose an account to continue to Havana (demo only)
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-600">
          {MOCK_ACCOUNTS.map((account) => (
            <li key={account.id}>
              <button
                type="button"
                onClick={selectAccount}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-[#3c4043]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a73e8] text-sm font-semibold text-white">
                  {account.avatar}
                </span>
                <span>
                  <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                    {account.name}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {account.email}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="px-5 py-3 text-center text-xs text-gray-500 dark:text-gray-400">
          This is a visual simulation. No Google sign-in occurs.
        </p>
      </div>
    </div>
  );
}
