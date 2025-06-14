import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the user's locale from browser settings or fallback to default
 */
export function getUserLocale(): string {
  if (typeof window !== "undefined") {
    return navigator.language || "en-US";
  }
  return "en-US";
}

/**
 * Format a date string as a "time ago" string with locale support
 */
export function formatTimeAgo(dateString: string, locale?: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const userLocale = locale || getUserLocale();

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString(userLocale, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Format a region string by replacing underscores with spaces and capitalizing words
 * @param region - The region string to format (e.g., "north_america")
 * @returns Formatted region string (e.g., "North America")
 */
export function formatRegion(region: string): string {
  return region.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Get the color class for status indicator based on current status
 * @param status - The current status (online, afk, in-game, offline)
 * @returns Color class string for the status indicator
 */
export function getStatusIndicatorClass(status: string): string {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "afk":
      return "bg-yellow-500";
    case "in-game":
      return "bg-blue-500";
    case "offline":
    default:
      return "bg-gray-500";
  }
}

/**
 * Format numbers with locale-aware formatting (for stats, counts etc.)
 * @param count - The number to format
 * @param locale - Optional locale, falls back to user locale
 * @returns Formatted number string
 */
export function formatNumber(count: number, locale?: string): string {
  const userLocale = locale || getUserLocale();
  return count.toLocaleString(userLocale);
}

/**
 * Format a full date with locale support
 * @param dateString - ISO date string
 * @param locale - Optional locale, falls back to user locale
 * @param options - Intl.DateTimeFormatOptions for custom formatting
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const userLocale = locale || getUserLocale();
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString(
    userLocale,
    options || defaultOptions
  );
}

/**
 * Format date and time with locale support
 * @param dateString - ISO date string
 * @param locale - Optional locale, falls back to user locale
 * @returns Formatted date and time string
 */
export function formatDateTime(dateString: string, locale?: string): string {
  const userLocale = locale || getUserLocale();
  return new Date(dateString).toLocaleDateString(userLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getCurrentLanguage(): string {
  if (typeof window === "undefined") {
    return "en";
  }

  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
  if (match) {
    return decodeURIComponent(match[1]);
  }

  if (window.navigator.language) {
    return window.navigator.language;
  }

  return "en";
}
