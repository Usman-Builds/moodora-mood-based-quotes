import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Dimensions, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/types';
import { AppText } from '../../../components/ui/AppText';
import { Screen } from '../../../components/ui/Screen';
import { theme } from '../../../theme/theme';
import { moods } from '../../moods/data/moods';
import { quotes } from '../data/quotes';
import { AdBanner } from '../../ads';

type QuotesScreenProps = NativeStackScreenProps<RootStackParamList, 'Quotes'>;

function shuffle<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const { width } = Dimensions.get('window');

export function QuotesScreen({ route, navigation }: QuotesScreenProps) {
  const { moodId } = route.params;
  const mood = useMemo(() => moods.find((m) => m.id === moodId), [moodId]);

  const shuffled = useMemo(
    () => shuffle(quotes.filter((q) => q.moodId === moodId)),
    [moodId],
  );

  const [index, setIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    setIndex(0);
  }, [moodId]);

  const current = shuffled[index];

  const goNext = () => {
    if (shuffled.length === 0) return;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex((prev) => (prev + 1) % shuffled.length);
      fadeAnim.setValue(0);
      scaleAnim.setValue(1.02);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const accent = mood?.accent || theme.colors.accent;
  const tint = mood?.tint || theme.colors.background;

  return (
    <Screen testID="quotes-screen">
      <StatusBar barStyle="dark-content" />
      <View style={[styles.background, { backgroundColor: tint }]}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Go back">
            <AppText variant="label" color={theme.colors.inkSubtle}>
              BACK
            </AppText>
          </Pressable>
          <View style={styles.headerRow}>
            <View style={[styles.dot, { backgroundColor: accent }]} />
            <AppText variant="title" style={styles.headerTitle}>
              {mood ? mood.label : moodId}
            </AppText>
            <AppText variant="label" color={theme.colors.inkSubtle}>
              {shuffled.length > 0 ? `${index + 1} / ${shuffled.length}` : '0'}
            </AppText>
          </View>
          <AppText variant="body" color={theme.colors.inkMuted}>
            {mood ? mood.description : 'Quotes for this mood'}
          </AppText>
        </View>

        <View style={styles.cardContainer}>
          {current ? (
            <Animated.View
              style={[
                styles.quoteCard,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                  borderColor: accent,
                  shadowColor: accent,
                },
              ]}>
              <AppText variant="title" style={styles.quoteMark}>
                "
              </AppText>
              <AppText variant="title" style={styles.quoteText}>
                {current.text}
              </AppText>
              <AppText variant="body" color={theme.colors.inkMuted} style={styles.author}>
                - {current.author}
              </AppText>
            </Animated.View>
          ) : (
            <View style={[styles.quoteCard, { borderColor: accent }]}>
              <AppText variant="body" color={theme.colors.inkMuted}>
                No quotes available for this mood yet.
              </AppText>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={goNext}
            style={[styles.nextButton, { backgroundColor: accent }]}
            disabled={shuffled.length === 0}
            accessibilityRole="button"
            accessibilityLabel="Next quote">
            <AppText variant="label" color={theme.colors.surface}>
              NEXT QUOTE
            </AppText>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <AdBanner placement="quotes-footer" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  quoteCard: {
    width: width - theme.spacing.lg * 2,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderRadius: 20,
    padding: theme.spacing.xl,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  quoteMark: {
    fontSize: 48,
    lineHeight: 48,
    marginBottom: theme.spacing.sm,
  },
  quoteText: {
    lineHeight: 32,
    fontSize: 22,
  },
  author: {
    marginTop: theme.spacing.lg,
    textAlign: 'right',
  },
  actions: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  nextButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 999,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
});
