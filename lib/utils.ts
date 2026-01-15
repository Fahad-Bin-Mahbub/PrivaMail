import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }).format(d);
}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
