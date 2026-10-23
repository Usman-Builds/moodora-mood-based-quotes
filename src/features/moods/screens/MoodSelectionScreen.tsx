import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { AppText } from '../../../components/ui/AppText';
import { Screen } from '../../../components/ui/Screen';
import { theme } from '../../../theme/theme';

export function MoodSelectionScreen() {
  return (
    <Screen testID="mood-selection-screen">
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <AppText variant="label" color={theme.colors.inkSubtle}>
          STEP 1
        </AppText>
        <AppText variant="title" style={styles.title}>
          Foundation ready
        </AppText>
        <AppText variant="body" color={theme.colors.inkMuted}>
          The app shell, navigation, theme, data boundaries, and future backend
          contracts are in place. Mood selection arrives in Step 2.
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
