import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateRange } from "react-day-picker";
import moment from "moment";
import "moment/dist/locale/id";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FormatToIDR(price: number) {
  return new Intl.NumberFormat("ID", { style: "currency", currency: "IDR" }).format(price);
}

export const parseDate = (date: DateRange) => {
  const getFirstYear = date.from?.getFullYear();
  const getFirstMonth = date.from?.getMonth();
  const getLastYear = date.to?.getFullYear();
  const getLastMonth = date.to?.getMonth();
  let momentDate = moment(date.from).locale("id").format("ll");
  if (getFirstYear === getLastYear) {
    momentDate = momentDate.substring(0, 6);
  }
  if (getFirstMonth === getLastMonth) {
    momentDate = momentDate.substring(0, 2);
  }
  return `${momentDate} - ${moment(date.to).locale("id").format("ll")}`;
};

export const formatDateLL = (date: number) => {
  return `${moment(date).locale("id").format("LT")} - ${moment(date).locale("id").format("ll")} `;
};
