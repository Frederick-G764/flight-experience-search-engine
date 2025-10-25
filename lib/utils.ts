import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IndicatorStatus } from './mockData';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIndicatorStyles(status: IndicatorStatus): {
  bg: string;
  border: string;
  text: string;
  symbol: string;
} {
  switch (status) {
    case 'excellent':
      return {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-400/60',
        text: 'text-emerald-200',
        symbol: '✓',
      };
    case 'fair':
      return {
        bg: 'bg-amber-500/10',
        border: 'border-amber-300/60',
        text: 'text-amber-200',
        symbol: '⚠️',
      };
    case 'poor':
      return {
        bg: 'bg-rose-500/10',
        border: 'border-rose-400/60',
        text: 'text-rose-200',
        symbol: '✕',
      };
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
