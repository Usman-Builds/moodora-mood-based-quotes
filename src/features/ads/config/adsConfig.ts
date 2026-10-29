import { Platform } from 'react-native';
import { env } from '../../../config/env';
import type { BannerUnitIds, InterstitialUnitIds } from '../types/ad';

export const adsConfig = {
  enabled: env.ads.enabled,
  showPlaceholdersInDevelopment: env.ads.showPlaceholdersInDevelopment,
  interstitialEveryNQuotes: env.ads.interstitialEveryNQuotes,
  bannerUnitIds: {
    android: env.ads.androidBannerUnitId,
    ios: env.ads.iosBannerUnitId,
  } satisfies BannerUnitIds,
  interstitialUnitIds: {
    android: env.ads.androidInterstitialUnitId,
    ios: env.ads.iosInterstitialUnitId,
  } satisfies InterstitialUnitIds,
} as const;

export function getBannerUnitId(): string {
  return Platform.OS === 'ios'
    ? adsConfig.bannerUnitIds.ios
    : adsConfig.bannerUnitIds.android;
}

export function getInterstitialUnitId(): string {
  return Platform.OS === 'ios'
    ? adsConfig.interstitialUnitIds.ios
    : adsConfig.interstitialUnitIds.android;
}
