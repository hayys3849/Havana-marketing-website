import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatPrice } from "./format-price";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { formatPrice };