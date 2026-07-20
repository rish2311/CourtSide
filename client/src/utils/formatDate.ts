import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Format a date to a human-readable string.
 * @example formatDate('2024-07-20') → 'July 20, 2024'
 */
export function formatDate(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return 'Invalid date';
  return format(parsed, 'MMMM d, yyyy');
}

/**
 * Format a date with time.
 * @example formatDateTime('2024-07-20T14:30:00') → 'July 20, 2024 at 2:30 PM'
 */
export function formatDateTime(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return 'Invalid date';
  return format(parsed, "MMMM d, yyyy 'at' h:mm a");
}

/**
 * Format a time string (HH:mm) to 12-hour format.
 * @example formatTime('14:30') → '2:30 PM'
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return format(date, 'h:mm a');
}

/**
 * Get a relative time string (e.g. "3 hours ago").
 * @example timeAgo('2024-07-19T10:00:00') → '2 days ago'
 */
export function timeAgo(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return 'Invalid date';
  return formatDistanceToNow(parsed, { addSuffix: true });
}

/**
 * Format a date for API requests (ISO 8601).
 * @example toISODate(new Date()) → '2024-07-20'
 */
export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
