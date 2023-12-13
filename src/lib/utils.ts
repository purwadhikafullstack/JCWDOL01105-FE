import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FormatToIDR(price: number) {
  return new Intl.NumberFormat("ID", { style: "currency", currency: "IDR" }).format(price);
}
