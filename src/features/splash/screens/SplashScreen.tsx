import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../../app/navigation/types';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/theme';

const SPLASH_DURATION_MS = 1900;

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

export function SplashScreen({ navigation }: SplashScreenProps) {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        damping: 12,
        stiffness: 100,
        mass: 0.9,
        useNativeDriver: true,
      }),
    ]);

    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    entrance.start();
    glow.start();

    const timeout = setTimeout(() => {
      navigation.replace('MoodSelection');
    }, SPLASH_DURATION_MS);

    return () => {
      clearTimeout(timeout);
      entrance.stop();
      glow.stop();
    };
  }, [navigation, opacity, pulse, scale, translateY]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.orbOne} />
      <View style={styles.orbTwo} />
      <View style={styles.orbThree} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <Animated.View style={[styles.markRing, { transform: [{ scale: pulse }] }]}>
          <View style={styles.mark}>
            <View style={styles.markCore} />
            <View style={styles.markArcTop} />
            <View style={styles.markArcBottom} />
          </View>
        </Animated.View>

        <AppText
          variant="display"
          color={theme.colors.splashText}
          align="center"
          style={styles.brand}
        >
          NOESIS
        </AppText>
        <AppText
          variant="label"
          color={theme.colors.splashLilac}
          align="center"
          style={styles.tagline}
        >
          HEADSPACE IN QUOTES
        </AppText>
        <AppText
          variant="body"
          color={theme.colors.splashMuted}
          align="center"
          style={styles.subline}
        >
          Find clarity in the way you feel.
        </AppText>
      </Animated.View>

      <Animated.View
        style={[styles.footer, { opacity, bottom: insets.bottom + 28 }]}
      >
        <AppText
          variant="label"
          color={theme.colors.splashMuted}
          align="center"
        >
          BREATH. REFLECT. RESET.
        </AppText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.splashBackground,
    overflow: 'hidden',
  },
  orbOne: {
    position: 'absolute',
    top: -140,
    right: -110,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#1F2647',
    opacity: 0.9,
  },
  orbTwo: {
    position: 'absolute',
    bottom: -170,
    left: -120,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: '#1A203B',
    opacity: 0.95,
  },
  orbThree: {
    position: 'absolute',
    top: '38%',
    right: -170,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#262D52',
    opacity: 0.6,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  markRing: {
    width: 110,
    height: 110,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 55,
    borderWidth: 1,
    borderColor: 'rgba(155, 123, 255, 0.4)',
    backgroundColor: 'rgba(155, 123, 255, 0.12)',
  },
  mark: {
    width: 78,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 39,
    backgroundColor: theme.colors.splashSurface,
    borderWidth: 1,
    borderColor: theme.colors.splashBorder,
  },
  markCore: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.splashLilac,
  },
  markArcTop: {
    position: 'absolute',
    top: 16,
    width: 36,
    height: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: theme.colors.accent,
    opacity: 0.9,
  },
  markArcBottom: {
    position: 'absolute',
    bottom: 16,
    width: 36,
    height: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderWidth: 3,
    borderTopWidth: 0,
    borderColor: theme.colors.aurora,
    opacity: 0.8,
  },
  brand: {
    letterSpacing: 10,
  },
  tagline: {
    marginTop: theme.spacing.md,
    letterSpacing: 6,
  },
  subline: {
    marginTop: theme.spacing.sm,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
