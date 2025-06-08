import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    red: {
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
    },
    blue: {
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
    },
    green: {
      100: '#d1fae5',
      500: '#10b981',
      600: '#059669',
    },
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
});
