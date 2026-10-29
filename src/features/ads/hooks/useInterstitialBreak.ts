import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';
import { adsConfig, getInterstitialUnitId } from '../config/adsConfig';

export function useInterstitialBreak() {
  const { status, show, load } = useInterstitialAd({
    adUnitId: adsConfig.enabled
      ? __DEV__
        ? TestIds.INTERSTITIAL
        : getInterstitialUnitId()
      : null,
    requestOptions: {
      requestNonPersonalizedAdsOnly: true,
    },
  });

  return {
    status,
    isLoaded: status === 'loaded',
    show,
    load,
  };
}
