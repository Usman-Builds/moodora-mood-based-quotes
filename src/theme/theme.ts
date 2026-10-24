import { Platform } from 'react-native';

const displayFont = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
});

const bodyFont = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: undefined,
});

export const colors = {
  background: '#0B1026',
  surface: '#151B2F',
  surfaceMuted: '#1D243D',
  surfaceDeep: '#242B48',
  ink: '#F4F6FF',
  inkMuted: '#B9BDE6',
  inkSubtle: '#7F84B5',
  primary: '#7C9BFF',
  primaryPressed: '#6B8BFF',
  primarySoft: '#2B3566',
  accent: '#9B7BFF',
  accentSoft: '#332A5C',
  border: '#2A3159',
  success: '#4FD1C5',
  danger: '#F87171',
  white: '#FFFFFF',
  glow: '#9B7BFF',
  aurora: '#22D3EE',
  ember: '#FB7185',
  gold: '#F59E0B',
  splashBackground: '#0B1026',
  splashSurface: '#151B2F',
  splashBorder: '#2A3159',
  splashText: '#F4F6FF',
  splashMuted: '#B9BDE6',
  splashLilac: '#9B7BFF',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const fonts = {
  display: displayFont,
  body: bodyFont,
} as const;

export const typography = {
  display: {
    fontFamily: fonts.display,
    fontSize: 46,
    lineHeight: 52,
    fontWeight: '700',
    letterSpacing: -1.2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '400',
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyStrong: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  bodySmall: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  button: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  quote: {
    fontFamily: fonts.display,
    fontSize: 23,
    lineHeight: 34,
    fontWeight: '400',
    letterSpacing: -0.2,
  },
} as const;

export const shadows = {
  card: {
    shadowColor: '#9B7BFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 6,
  },
  floating: {
    shadowColor: '#9B7BFF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 26,
    elevation: 10,
  },
  glow: {
    shadowColor: '#9B7BFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  fonts,
  typography,
  shadows,
} as const;

export type AppTheme = typeof theme;
