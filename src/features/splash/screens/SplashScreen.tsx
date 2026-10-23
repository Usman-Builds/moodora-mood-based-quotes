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

const SPLASH_DURATION_MS = 1700;

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

export function SplashScreen({ navigation }: SplashScreenProps) {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const scale = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        damping: 14,
        stiffness: 90,
        mass: 0.8,
        useNativeDriver: true,
      }),
    ]);

    entrance.start();

    const timeout = setTimeout(() => {
      navigation.replace('MoodSelection');
    }, SPLASH_DURATION_MS);

    return () => {
      clearTimeout(timeout);
      entrance.stop();
    };
  }, [navigation, opacity, scale, translateY]);

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
        <View style={styles.mark}>
          <View style={styles.markDotAccent} />
          <View style={styles.markDotLilac} />
          <View style={styles.markLine} />
        </View>

        <AppText
          variant="display"
          color={theme.colors.splashText}
          align="center"
        >
          Moodora
        </AppText>
        <AppText
          variant="body"
          color={theme.colors.splashMuted}
          align="center"
          style={styles.tagline}
        >
          A quiet space for how you feel.
        </AppText>
      </Animated.View>

      <Animated.View
        style={[styles.footer, { opacity, bottom: insets.bottom + 32 }]}
      >
        <AppText
          variant="label"
          color={theme.colors.splashMuted}
          align="center"
        >
          TAKE A BREATH
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
    top: -120,
    right: -90,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#352A50',
    opacity: 0.8,
  },
  orbTwo: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#2C2342',
    opacity: 0.9,
  },
  orbThree: {
    position: 'absolute',
    top: '42%',
    right: -150,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#3A2D58',
    opacity: 0.55,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  mark: {
    width: 86,
    height: 86,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: theme.colors.splashBorder,
    backgroundColor: theme.colors.splashSurface,
  },
  markDotAccent: {
    position: 'absolute',
    left: 23,
    top: 29,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.accent,
  },
  markDotLilac: {
    position: 'absolute',
    right: 23,
    top: 29,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.splashLilac,
    opacity: 0.9,
  },
  markLine: {
    position: 'absolute',
    bottom: 21,
    width: 24,
    height: 2,
    borderRadius: 1,
    backgroundColor: theme.colors.splashMuted,
    opacity: 0.8,
  },
  tagline: {
    marginTop: theme.spacing.sm,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
