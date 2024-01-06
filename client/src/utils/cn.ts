import { twMerge } from 'tailwind-merge';
import { ClassArray, clsx } from 'clsx';

/**
 * A utility function that merges class names using tailwind-merge and clsx.
 *
 * @param args - An array of class names.
 * @returns A string of merged class names.
 */
export function cn(...args: ClassArray): string {
  return twMerge(clsx(...args.filter(Boolean)));
}
