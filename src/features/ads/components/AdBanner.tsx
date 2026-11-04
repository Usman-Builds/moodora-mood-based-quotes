import React, { useState } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTheme } from '../../../theme/ThemeProvider';
import { adsConfig, getBannerUnitId } from '../config/adsConfig';
import type { AdPlacement } from '../types/ad';

type AdBannerProps = {
  placement: AdPlacement;
  style?: StyleProp<ViewStyle>;
};

/** Ads are optional: any failure here hides the banner instead of breaking the screen. */
export function AdBanner(props: AdBannerProps) {
  if (!adsConfig.enabled) {
    return null;
  }
  return (
    <ErrorBoundary name="ad-banner" fallback={null}>
      <AdBannerInner {...props} />
    </ErrorBoundary>
  );
}

function AdBannerInner({ placement, style }: AdBannerProps) {
  const theme = useTheme();
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  const unitId = __DEV__ ? TestIds.BANNER : getBannerUnitId();

  return (
    <View
      accessibilityLabel="Advertisement"
      accessibilityRole="none"
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      testID={`ad-banner-${placement}`}
    >
      <BannerAd
        unitId={unitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={() => setFailed(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 50,
  },
});
