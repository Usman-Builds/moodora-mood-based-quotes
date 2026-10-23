import React, { useMemo } from 'react';
import { FlatList, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/types';
import { AppText } from '../../../components/ui/AppText';
import { Screen } from '../../../components/ui/Screen';
import { theme } from '../../../theme/theme';
import { moods } from '../../moods/data/moods';
import { quotes } from '../data/quotes';
import { AdBanner } from '../../ads';

type QuotesScreenProps = NativeStackScreenProps<RootStackParamList, 'Quotes'>;

export function QuotesScreen({ route, navigation }: QuotesScreenProps) {
  const { moodId } = route.params;
  const mood = useMemo(() => moods.find((m) => m.id === moodId), [moodId]);
  const moodQuotes = useMemo(
    () => quotes.filter((q) => q.moodId === moodId),
    [moodId],
  );

  return (
    <Screen testID="quotes-screen">
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Go back">
          <AppText variant="label" color={theme.colors.inkSubtle}>
            BACK
          </AppText>
        </Pressable>
        <View style={styles.headerRow}>
          {mood ? (
            <View style={[styles.dot, { backgroundColor: mood.accent }]} />
          ) : null}
          <AppText variant="title" style={styles.headerTitle}>
            {mood ? mood.label : moodId}
          </AppText>
        </View>
        <AppText variant="body" color={theme.colors.inkMuted}>
          {mood ? mood.description : 'Quotes for this mood'}
        </AppText>
      </View>
      <FlatList
        data={moodQuotes}
        keyExtractor={(q) => q.id}
        renderItem={({ item }) => (
          <View style={styles.quoteCard}>
            <AppText variant="body" style={styles.quoteText}>
              {item.text}
            </AppText>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <AppText variant="body" color={theme.colors.inkMuted}>
              No quotes available for this mood yet.
            </AppText>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <AdBanner placement="quotes-footer" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
  },
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  quoteCard: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  quoteText: {
    lineHeight: 24,
  },
  empty: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
});
