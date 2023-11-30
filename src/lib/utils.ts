import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const queryLocation = (q: string) => {
  const query = new URLSearchParams({
    q: `${q}`,
    locale: "id",
    limit: "5",
    reverse: "false",
    debug: "false",
    point: "",
    provider: "default",
    key: "5a684d84-23f1-442e-a28a-f89e6ed18838",
  }).toString();
  return query;
};

export function FormatToIDR(price: number) {
  return new Intl.NumberFormat("ID", { style: "currency", currency: "IDR" }).format(price);
}
