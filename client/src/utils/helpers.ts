import { BOOKING_STATUS } from './constants';

/**
 * Capitalizes the first letter of a string.
 * @example capitalize('hello') → 'Hello'
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncates a string to a max length, appending '...' if truncated.
 * @example truncate('Hello World', 5) → 'Hello...'
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Format a price number as Indian Rupees.
 * @example formatPrice(1500) → '₹1,500'
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Returns a colour class string based on booking status.
 */
export function getBookingStatusColor(
  status: keyof typeof BOOKING_STATUS
): string {
  const colorMap: Record<string, string> = {
    pending: 'text-yellow-600 bg-yellow-50',
    confirmed: 'text-green-600 bg-green-50',
    cancelled: 'text-red-600 bg-red-50',
    completed: 'text-blue-600 bg-blue-50',
  };
  return colorMap[status] ?? 'text-gray-600 bg-gray-50';
}

/**
 * Converts an object into a URLSearchParams query string.
 * @example toQueryString({ page: 1, limit: 10 }) → 'page=1&limit=10'
 */
export function toQueryString(params: Record<string, unknown>): string {
  return new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => [k, String(v)])
  ).toString();
}

/**
 * Sleep for a given number of milliseconds (useful for dev / rate-limit backoff).
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns initials from a full name (max 2 chars).
 * @example getInitials('Rishabh Mehrotra') → 'RM'
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}
