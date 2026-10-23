import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { AppText } from '../../../components/ui/AppText';
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
      {adsConfig.showPlaceholdersInDevelopment && __DEV__ ? (
        <>
          <AppText variant="caption" color={theme.colors.inkSubtle}>
            Advertisement
          </AppText>
          <AppText variant="caption" color={theme.colors.inkSubtle}>
            {getBannerUnitId()}
          </AppText>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
