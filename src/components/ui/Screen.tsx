import React, { type PropsWithChildren } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  SafeAreaView,
  type Edge,
} from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';

type ScreenProps = PropsWithChildren<{
  edges?: readonly Edge[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  decorative?: boolean;
  testID?: string;
}>;

export function Screen({
  children,
  edges = ['top', 'bottom'],
  style,
  contentStyle,
  decorative = true,
  testID,
}: ScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.safeArea,
        { backgroundColor: theme.colors.background },
        style,
      ]}
      testID={testID}
    >
      {decorative ? (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <View
            style={[
              styles.orb,
              styles.orbTop,
              { backgroundColor: theme.colors.accentSoft },
            ]}
          />
          <View
            style={[
              styles.orb,
              styles.orbMid,
              { backgroundColor: theme.colors.primarySoft },
            ]}
          />
          <View
            style={[
              styles.orb,
              styles.orbBottom,
              { backgroundColor: theme.colors.accent },
            ]}
          />
        </View>
      ) : null}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  orb: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    opacity: 0.28,
  },
  orbTop: {
    top: -180,
    right: -140,
  },
  orbMid: {
    top: 120,
    left: -200,
  },
  orbBottom: {
    bottom: -220,
    right: -160,
  },
});
