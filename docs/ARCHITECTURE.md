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
- `src/features/ads/` - Ad integration layer (`types`, `config`, `components/AdBanner`) with disabled-by-default placeholders for Google Ads.
- `src/features/splash/` - Splash screen animation and navigation gate.

## Navigation Flow

1. `Splash` - Animated intro, auto-navigates to `MoodSelection` via `replace`.
2. `MoodSelection` - User selects a mood (to be completed in Step 2). `Quotes` route is prepared with `moodId` param.
3. `Quotes` - Displays quotes for the selected mood (to be completed in Step 2). Footer reserved for ad banner.

## Data Strategy

- **Offline-first**: `quotesRepository` defaults to `localQuotesRepository`. No network calls occur by default.
- **Future backend ready**: Flip `env.useRemoteQuotes` to `true` and populate `env.apiBaseUrl` to switch to `remoteQuotesRepository`. The repository interface (`QuotesRepository`) is shared across both implementations.
- **Type-safe contracts**: `Quote` and `QuotesRepository` define the boundary between UI and data sources.

## Google Ads Integration Support

- Configuration lives in `src/config/env.ts` and is surfaced via `src/features/ads/config/adsConfig.ts`.
- `AdBanner` is a non-blocking placeholder component that:
  - Renders nothing when ads are disabled.
  - Optionally shows placeholder metadata in development when enabled.
  - Exposes `placement` (`quotes-footer`) and a stable test ID for future SDK hookup.
- Unit IDs use Google's test IDs by default to avoid accidental production traffic.

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
