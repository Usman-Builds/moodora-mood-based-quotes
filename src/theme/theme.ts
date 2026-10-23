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
  background: '#F7F2EA',
  surface: '#FFFDF9',
  surfaceMuted: '#EFE8DD',
  surfaceDeep: '#E6DCCE',
  ink: '#211B2E',
  inkMuted: '#6D6578',
  inkSubtle: '#9A92A3',
  primary: '#4B3B72',
  primaryPressed: '#392B5B',
  primarySoft: '#ECE6F5',
  accent: '#E4A16B',
  accentSoft: '#F7E5D5',
  border: '#E4DBCD',
  success: '#3E7C68',
  danger: '#A34343',
  white: '#FFFFFF',
  splashBackground: '#221B33',
  splashSurface: '#2E2544',
  splashBorder: '#46395F',
  splashText: '#F7F2EA',
  splashMuted: '#B9AECF',
  splashLilac: '#C9B7E8',
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
    shadowColor: '#2B203F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },
  floating: {
    shadowColor: '#211B2E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
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
