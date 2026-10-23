import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/types';
import { AppText } from '../../../components/ui/AppText';
import { Screen } from '../../../components/ui/Screen';
import { theme } from '../../../theme/theme';

type QuotesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Quotes'
>;

export function QuotesScreen({ route }: QuotesScreenProps) {
  return (
    <Screen testID="quotes-screen">
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <AppText variant="label" color={theme.colors.inkSubtle}>
          QUOTES
        </AppText>
        <AppText variant="title" style={styles.title}>
          Quotes are next
        </AppText>
        <AppText variant="body" color={theme.colors.inkMuted}>
          Selected mood: {route.params.moodId}. Step 2 adds the complete quote
          experience.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
});
