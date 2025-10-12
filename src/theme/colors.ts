// src/theme/colors.ts
export const palette = {
  // neutrals
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  // semantic brand
  primary50: '#eff6ff',
  primary100: '#dbeafe',
  primary300: '#60a5fa',
  primary500: '#3b82f6',
  primary600: '#2563eb',
  primary700: '#1d4ed8',

  success50: '#ecfdf5',
  success500: '#10b981',
  danger50: '#fff1f2',
  danger500: '#ef4444',
  warning50: '#fff7ed',
  warning500: '#f59e0b',

  // transparent helpers
  overlay10: 'rgba(0,0,0,0.10)',
  overlay50: 'rgba(0,0,0,0.50)',
};

export const lightColors = {
  background: palette.white,
  card: palette.gray50,
  text: palette.gray900,
  subText: palette.gray600,
  border: palette.gray200,
  primary: palette.primary500,
  primaryTextOn: palette.white,
  success: palette.success500,
  danger: palette.danger500,
  warning: palette.warning500,
  overlay: palette.overlay50,
};

export const darkColors = {
  background: palette.gray900,
  card: palette.gray800,
  text: palette.gray100,
  subText: palette.gray300,
  border: palette.gray700,
  primary: palette.primary300,
  primaryTextOn: palette.black,
  success: palette.success500,
  danger: palette.danger500,
  warning: palette.warning500,
  overlay: palette.overlay50,
};
