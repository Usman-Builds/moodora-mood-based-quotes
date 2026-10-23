import { Platform } from 'react-native';
import { env } from '../../../config/env';
import type { BannerUnitIds } from '../types/ad';

export const adsConfig = {
  enabled: env.ads.enabled,
  showPlaceholdersInDevelopment: env.ads.showPlaceholdersInDevelopment,
  bannerUnitIds: {
    android: env.ads.androidBannerUnitId,
    ios: env.ads.iosBannerUnitId,
  } satisfies BannerUnitIds,
} as const;

export function getBannerUnitId(): string {
  return Platform.OS === 'ios'
    ? adsConfig.bannerUnitIds.ios
    : adsConfig.bannerUnitIds.android;
}
