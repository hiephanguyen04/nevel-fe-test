/**
 * Utility for conditionally joining CSS class names together
 *
 * @param {...(string | boolean | undefined | null)} classes - Class names or conditional expressions that resolve to class names
 * @returns {string} - Combined class string with all truthy values joined by spaces
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn('text-red', 'bg-blue') // => 'text-red bg-blue'
 *
 * // With conditional classes
 * cn('text-lg', isActive && 'font-bold', error ? 'text-red' : 'text-green')
 * ```
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names and merges Tailwind classes efficiently
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
