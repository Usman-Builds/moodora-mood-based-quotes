import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MoodSelectionScreen } from '../../features/moods/screens/MoodSelectionScreen';
import { QuotesScreen } from '../../features/quotes/screens/QuotesScreen';
import { SplashScreen } from '../../features/splash/screens/SplashScreen';
import { theme } from '../../theme/theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.background,
    text: theme.colors.ink,
    primary: theme.colors.primary,
    border: 'transparent',
    notification: theme.colors.accent,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MoodSelection" component={MoodSelectionScreen} />
        <Stack.Screen name="Quotes" component={QuotesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
