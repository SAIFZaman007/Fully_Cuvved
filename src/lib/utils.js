import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class strings safely, resolving conflicts (last wins). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Format a number of pence/cents as GBP currency, e.g. 1200 -> "£12.00" */
export function formatGBP(amount, { withDecimals = true } = {}) {
  const value = typeof amount === 'number' ? amount : Number(amount || 0);
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  }).format(value);
}

/** Format an ISO date string into a readable, locale-aware date. */
export function formatDate(input, options) {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(date);
}

/** Generate a short, human-friendly reference code for orders/documents. */
export function generateReference(prefix = 'FC') {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${rand}`;
}

/** Basic, non-exhaustive email format check for client-side UX only. */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
