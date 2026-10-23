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
              styles.orbBottom,
              { backgroundColor: theme.colors.primarySoft },
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
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.55,
  },
  orbTop: {
    top: -150,
    right: -100,
  },
  orbBottom: {
    bottom: -180,
    left: -130,
  },
});
