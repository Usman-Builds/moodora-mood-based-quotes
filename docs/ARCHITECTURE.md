# Moodora Architecture

Moodora is a zero-auth, offline-first React Native CLI app with a clear path to a future backend. The project is organized by feature with shared primitives and explicit integration points for Google Ads.

## Directory Structure

- `src/app/` - App root wiring (`App.tsx`), navigation (`AppNavigator`, route types), and global providers (`AppProviders`).
- `src/components/ui/` - Reusable, theme-aware primitives (`AppText`, `Button`, `Screen`).
- `src/theme/` - Design tokens, typography, shadows, and `ThemeProvider`.
- `src/config/` - Environment configuration (`env.ts`) used to toggle remote data sources and ads.
- `src/services/api/` - Typed `fetch` client with timeout/error handling for future backend calls.
- `src/features/moods/` - Mood metadata (`types`, `data`), public exports.
- `src/features/quotes/` - Quotes domain (`types`, `data`), repository pattern (`localQuotesRepository`, `remoteQuotesRepository`, `quotesRepository`), public exports.
- `src/features/ads/` - AdMob integration: `AdBanner`, `useInterstitialBreak`, config, placement types.
- `src/features/splash/` - Splash screen animation and navigation gate.
- `src/assets/images/logo/` - App logo used by the splash screen and generated launcher icons.

## Navigation Flow

1. `Splash` - Animated logo intro, auto-navigates to `MoodSelection` via `replace`.
2. `MoodSelection` - User selects a mood. `Quotes` route receives `moodId`.
3. `Quotes` - Shuffled quotes for the selected mood with a banner footer and an interstitial every 5 quotes.

## Data Strategy

- **Offline-first**: `quotesRepository` defaults to `localQuotesRepository`. No network calls occur by default.
- **Future backend ready**: Flip `env.useRemoteQuotes` to `true` and populate `env.apiBaseUrl` to switch to `remoteQuotesRepository`. The repository interface (`QuotesRepository`) is shared across both implementations.
- **Type-safe contracts**: `Quote` and `QuotesRepository` define the boundary between UI and data sources.

## Google Ads Integration

- Configuration lives in `src/config/env.ts` and is surfaced via `src/features/ads/config/adsConfig.ts`.
- `AdBanner` renders a real `BannerAd` in the quotes footer and disappears when `ads.enabled` is false.
- `useInterstitialBreak` wraps the SDK hook and preloads an interstitial; `QuotesScreen` shows it every `interstitialEveryNQuotes` quotes, only if loaded.
- Both formats use Google test IDs in development (`__DEV__`), and test IDs are the defaults in `env.ts`.
- See [`ADS_INTEGRATION.md`](./ADS_INTEGRATION.md) and [`ADS_GO_LIVE.md`](./ADS_GO_LIVE.md).

## Production Readiness

- **Navigation**: `react-native-screens` registered via dependencies; `SafeAreaProvider` wraps the app.
- **Styling**: Centralized theme prevents hard-coded colors/spacing.
- **TypeScript**: Strict config, path-agnostic feature modules, `noEmit` enforced in `npm run typecheck`.
- **Linting/Testing**: ESLint (`@react-native`) and Jest with React Native preset; tests run via `npm test`.
- **Builds**: Standard React Native CLI scripts for Android/iOS. `scripts/bundle.js` supports manual bundling for verification.
- **Git**: Repository initialized with tracked source; native/build artifacts ignored via `.gitignore`.

## Extending to Backend

1. Implement your API to match `GET /v1/moods/:moodId/quotes` returning `Quote[]`.
2. Set `env.apiBaseUrl` to your base URL and `env.useRemoteQuotes = true`.
3. Replace or extend `remoteQuotesRepository` if you need auth, caching, or normalization.
4. Keep UI consuming `quotesRepository` to avoid coupling to transport details.
