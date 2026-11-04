import React, { useCallback, useEffect, useState } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import { ErrorBoundary, RecoveryScreen } from '../components/ErrorBoundary';
import { adsConfig } from '../features/ads/config/adsConfig';
import {
  installGlobalErrorHandler,
  subscribeToGlobalErrors,
} from './errors/globalErrorHandler';
import { AppNavigator } from './navigation/AppNavigator';
import { AppProviders } from './providers/AppProviders';

installGlobalErrorHandler();

function initializeAds() {
  if (!adsConfig.enabled) {
    return;
  }
  try {
    mobileAds()
      .initialize()
      .catch(() => {
        // Ads are optional; the app works without them.
      });
  } catch {
    // Native module unavailable; ads simply won't show.
  }
}

export function App() {
  // Bumping this remounts the whole tree (fresh navigation state) after an error.
  const [sessionKey, setSessionKey] = useState(0);
  const [globalError, setGlobalError] = useState(false);

  useEffect(() => {
    initializeAds();
  }, []);

  useEffect(
    () => subscribeToGlobalErrors(() => setGlobalError(true)),
    [],
  );

  const restart = useCallback(() => {
    setGlobalError(false);
    setSessionKey(key => key + 1);
  }, []);

  if (globalError) {
    return <RecoveryScreen onRetry={restart} />;
  }

  return (
    <ErrorBoundary name="root" resetKey={sessionKey} onReset={restart}>
      <AppProviders key={sessionKey}>
        <AppNavigator />
      </AppProviders>
    </ErrorBoundary>
  );
}
