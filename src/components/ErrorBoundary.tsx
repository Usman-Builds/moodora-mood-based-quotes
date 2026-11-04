import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/theme';

type ErrorBoundaryProps = {
  children: ReactNode;
  /**
   * Rendered instead of the default recovery screen. Pass `null` to hide the
   * failed subtree silently (used for ads).
   */
  fallback?: ReactNode;
  /** Changing this value resets the boundary after an error. */
  resetKey?: unknown;
  onReset?: () => void;
  name?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
  resetKey: unknown;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, resetKey: this.props.resetKey };

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: ErrorBoundaryState,
  ): Partial<ErrorBoundaryState> | null {
    if (props.resetKey !== state.resetKey) {
      return { hasError: false, resetKey: props.resetKey };
    }
    return null;
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.warn(`[Moodora] ${this.props.name ?? 'boundary'} caught:`, error.message);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
    if (this.props.fallback !== undefined) {
      return this.props.fallback;
    }
    return <RecoveryScreen onRetry={this.handleReset} />;
  }
}

/**
 * Deliberately depends on nothing but React Native core and theme constants,
 * so it still renders when providers or shared components are what failed.
 */
export function RecoveryScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.container} testID="recovery-screen">
      <Text style={styles.eyebrow}>MOODORA</Text>
      <Text style={styles.title}>Something went off-key</Text>
      <Text style={styles.body}>Take a breath. Tap below to pick up where you left off.</Text>
      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel="Try again"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>TRY AGAIN</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: colors.background,
  },
  eyebrow: {
    color: colors.inkSubtle,
    fontSize: 12,
    letterSpacing: 6,
    fontWeight: '600',
  },
  title: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },
  body: {
    color: colors.inkMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 28,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  buttonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
  },
});
