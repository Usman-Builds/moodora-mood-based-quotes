import React from 'react';
import { Dimensions, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../app/navigation/types';
import { AppText } from '../../../components/ui/AppText';
import { Screen } from '../../../components/ui/Screen';
import { theme } from '../../../theme/theme';
import { moods } from '../data/moods';
import type { Mood } from '../types/mood';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MoodSelection'>;

const { width } = Dimensions.get('window');
const cardWidth = (width - theme.spacing.lg * 2 - theme.spacing.md) / 2;

export function MoodSelectionScreen() {
  const navigation = useNavigation<Nav>();

  const renderCard = (item: Mood) => (
    <Pressable
      onPress={() => navigation.navigate('Quotes', { moodId: item.id })}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: item.accent,
          shadowColor: item.accent,
        },
      ]}
      testID={`mood-${item.id}`}
      accessibilityRole="button"
      accessibilityLabel={`${item.label}, ${item.description}`}>
      <View style={[styles.accentBar, { backgroundColor: item.accent }]} />
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <View style={[styles.monogram, { backgroundColor: item.tint }]}>
            <AppText variant="label" color={item.accent}>
              {item.monogram}
            </AppText>
          </View>
          <AppText variant="title" style={styles.cardTitle}>
            {item.label}
          </AppText>
        </View>
        <AppText variant="body" color={theme.colors.inkMuted} style={styles.desc}>
          {item.description}
        </AppText>
      </View>
    </Pressable>
  );

  return (
    <Screen testID="mood-selection-screen">
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <AppText variant="label" color={theme.colors.inkSubtle}>
          MOODORA
        </AppText>
        <AppText variant="title" style={styles.headerTitle}>
          How are you feeling today?
        </AppText>
        <AppText variant="body" color={theme.colors.inkMuted}>
          Pick a mood to discover quotes curated for you.
        </AppText>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {moods.map((m) => (
            <View key={m.id} style={styles.cardWrapper}>
              {renderCard(m)}
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    fontSize: 28,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: cardWidth,
    marginBottom: theme.spacing.md,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    height: 150,
  },
  accentBar: {
    height: 4,
    width: '100%',
  },
  cardContent: {
    padding: theme.spacing.md,
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monogram: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
