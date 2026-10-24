import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useTheme } from '../../../theme/ThemeProvider';
import { adsConfig, getBannerUnitId } from '../config/adsConfig';
import type { AdPlacement } from '../types/ad';

type AdBannerProps = {
  placement: AdPlacement;
  style?: StyleProp<ViewStyle>;
};

export function AdBanner({ placement, style }: AdBannerProps) {
  const theme = useTheme();

  if (!adsConfig.enabled) {
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
