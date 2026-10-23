import React from 'react';
import {
  Text,
  type TextProps,
  type TextStyle,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { AppTheme } from '../../theme/theme';

export type TextVariant = keyof AppTheme['typography'];

type AppTextProps = TextProps & {
  variant?: TextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
};

export function AppText({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...rest
}: AppTextProps) {
  const theme = useTheme();
  const variantStyle = theme.typography[variant];

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        { color: theme.colors.ink },
        variantStyle,
        color ? { color } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
