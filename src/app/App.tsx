import React, { useEffect } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import { AppNavigator } from './navigation/AppNavigator';
import { AppProviders } from './providers/AppProviders';

export function App() {
  useEffect(() => {
    mobileAds()
      .initialize()
      .catch(() => {
        // Ignore initialization errors in dev/test
      });
  }, []);

  return (
    <AppProviders>
      <AppNavigator />
    </AppProviders>
  );
}
