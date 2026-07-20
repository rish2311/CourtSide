import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and resolves Tailwind conflicts with tailwind-merge.
 * Use this instead of plain clsx for all Tailwind class merging.
 *
 * @example cn('px-4 py-2', isActive && 'bg-blue-500', 'bg-red-500')
 * → 'px-4 py-2 bg-red-500'  (tailwind-merge resolves the bg conflict)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
