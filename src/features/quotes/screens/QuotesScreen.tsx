import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  AppState,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/types';
import { AppText } from '../../../components/ui/AppText';
import { Screen } from '../../../components/ui/Screen';
import { theme } from '../../../theme/theme';
import { moods } from '../../moods/data/moods';
import { quotes } from '../data/quotes';
import { AdBanner, adsConfig, useInterstitialBreak } from '../../ads';

type QuotesScreenProps = NativeStackScreenProps<RootStackParamList, 'Quotes'>;

function shuffle<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// If an interstitial is requested but never opens, continue anyway after this long.
const AD_OPEN_TIMEOUT_MS = 4000;

export function QuotesScreen({ route, navigation }: QuotesScreenProps) {
  const moodId = route.params?.moodId;
  const { width } = useWindowDimensions();
  const mood = useMemo(() => moods.find((m) => m.id === moodId), [moodId]);

  const shuffled = useMemo(
    () => (moodId ? shuffle(quotes.filter((q) => q.moodId === moodId)) : []),
    [moodId],
  );

  const [index, setIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(1));
  const viewsSinceAd = useRef(0);
  const pendingAdvance = useRef(false);
  const isAnimating = useRef(false);
  const isMounted = useRef(true);
  const adOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interstitial = useInterstitialBreak();
  const { status: interstitialStatus, load: loadInterstitial } = interstitial;

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      fadeAnim.stopAnimation();
      scaleAnim.stopAnimation();
      if (adOpenTimer.current) {
        clearTimeout(adOpenTimer.current);
      }
    };
  }, [fadeAnim, scaleAnim]);

  useEffect(() => {
    setIndex(0);
    viewsSinceAd.current = 0;
  }, [moodId]);

  const current = shuffled.length > 0 ? shuffled[index % shuffled.length] : undefined;

  const advance = useCallback(() => {
    if (!isMounted.current || shuffled.length === 0 || isAnimating.current) {
      return;
    }
    isAnimating.current = true;
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
      if (!isMounted.current) {
        isAnimating.current = false;
        return;
      }
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
      ]).start(() => {
        isAnimating.current = false;
      });
    });
  }, [fadeAnim, scaleAnim, shuffled.length]);

  const resumeAfterAd = useCallback(() => {
    if (adOpenTimer.current) {
      clearTimeout(adOpenTimer.current);
      adOpenTimer.current = null;
    }
    if (pendingAdvance.current) {
      pendingAdvance.current = false;
      advance();
    }
  }, [advance]);

  useEffect(() => {
    if (interstitialStatus === 'showing' && adOpenTimer.current) {
      clearTimeout(adOpenTimer.current);
      adOpenTimer.current = null;
      return;
    }
    if (interstitialStatus === 'closed') {
      loadInterstitial();
      resumeAfterAd();
      return;
    }
    if (interstitialStatus === 'error' || interstitialStatus === 'no-fill') {
      // The ad failed (possibly mid-show): never leave the user stuck on a quote.
      resumeAfterAd();
    }
  }, [interstitialStatus, loadInterstitial, resumeAfterAd]);

  const goNext = () => {
    if (shuffled.length === 0 || isAnimating.current || pendingAdvance.current) return;

    viewsSinceAd.current += 1;
    const every = adsConfig.interstitialEveryNQuotes;
    const dueForBreak =
      adsConfig.enabled && every > 0 && viewsSinceAd.current % every === 0;

    if (dueForBreak && interstitial.isLoaded && AppState.currentState === 'active') {
      pendingAdvance.current = true;
      adOpenTimer.current = setTimeout(resumeAfterAd, AD_OPEN_TIMEOUT_MS);
      interstitial.show();
      return;
    }

    advance();
  };

  const accent = mood?.accent || theme.colors.accent;

  return (
    <Screen testID="quotes-screen" decorative={false}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.background, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Go back">
            <AppText variant="label" color={theme.colors.inkMuted}>
              BACK
            </AppText>
          </Pressable>
          <View style={styles.headerRow}>
            <View style={[styles.dot, { backgroundColor: accent }]} />
            <AppText variant="title" style={styles.headerTitle}>
              {mood ? mood.label : 'Quotes'}
            </AppText>
          </View>
          <AppText variant="label" color={accent} style={styles.moodTag}>
            {mood ? mood.description.toUpperCase() : 'HEADSPACE'}
          </AppText>
        </View>

        <View style={styles.cardContainer}>
          {current ? (
            <Animated.View
              style={[
                styles.quoteCard,
                {
                  width: width - theme.spacing.lg * 2,
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                  borderColor: accent,
                  shadowColor: accent,
                },
              ]}>
              <View style={[styles.quoteAccent, { backgroundColor: accent }]} />
              <AppText variant="title" style={styles.quoteMark}>
                "
              </AppText>
              <AppText variant="title" style={styles.quoteText}>
                {current.text}
              </AppText>
              <AppText variant="body" color={theme.colors.inkMuted} style={styles.author}>
                {current.author}
              </AppText>
            </Animated.View>
          ) : (
            <View
              style={[
                styles.quoteCard,
                { width: width - theme.spacing.lg * 2, borderColor: accent },
              ]}>
              <AppText variant="body" color={theme.colors.inkMuted}>
                No quotes available for this mood yet.
              </AppText>
            </View>
          )}
        </View>

        <View style={styles.actions}>
        <Pressable
          onPress={goNext}
          style={[styles.nextButton, { backgroundColor: accent, shadowColor: accent }]}
          disabled={shuffled.length === 0}
          accessibilityRole="button"
          accessibilityLabel="Next quote">
          <AppText variant="label" color={theme.colors.white}>
            NEXT IN THIS HEADSPACE
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
  moodTag: {
    marginTop: theme.spacing.xs,
    letterSpacing: 4,
    fontSize: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  quoteCard: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderRadius: 22,
    padding: theme.spacing.xl,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.28,
    shadowRadius: 36,
    elevation: 12,
    overflow: 'hidden',
  },
  quoteAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
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
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 22,
    elevation: 10,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
});
