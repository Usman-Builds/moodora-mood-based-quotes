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

const moodIcons: Record<string, string> = {
  happy: '●',
  calm: '◐',
  hopeful: '▲',
  grateful: '◆',
  sad: '▼',
  anxious: '⧖',
  angry: '✶',
  lonely: '○',
};

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
          <View style={[styles.iconWrap, { backgroundColor: item.accent }]}>
            <AppText variant="label" color={theme.colors.white}>
              {moodIcons[item.id] || item.monogram}
            </AppText>
          </View>
          <View style={styles.titleBlock}>
            <AppText variant="title" style={styles.cardTitle}>
              {item.label}
            </AppText>
            <AppText variant="label" color={item.accent} style={styles.tag}>
              VIBE
            </AppText>
          </View>
        </View>
        <AppText variant="body" color={theme.colors.inkMuted} style={styles.desc}>
          {item.description}
        </AppText>
      </View>
    </Pressable>
  );

  return (
    <Screen testID="mood-selection-screen">
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <AppText variant="label" color={theme.colors.inkSubtle} style={styles.eyebrow}>
          NOESIS
        </AppText>
        <AppText variant="title" style={styles.headerTitle}>
          Choose your headspace
        </AppText>
        <AppText variant="body" color={theme.colors.inkMuted}>
          Select a mood to tune into curated perspective.
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
  eyebrow: {
    letterSpacing: 6,
  },
  headerTitle: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    fontSize: 30,
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
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 8,
    height: 158,
  },
  accentBar: {
    height: 3,
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
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  titleBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 19,
  },
  tag: {
    marginTop: 2,
    letterSpacing: 4,
    fontSize: 10,
  },
  desc: {
    fontSize: 13,
    lineHeight: 19,
  },
});
