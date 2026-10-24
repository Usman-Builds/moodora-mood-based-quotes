# AGENTS.md

## Quick facts
- Name: `moodora` (RN CLI), package `com.moodora.app`, display `Moodora`. New Architecture/Hermes enabled.
- Stack: React Native `0.88.0`, React `19.3.0`, TS `^6.0.3`, RN CLI `20.2.0`. Nav: `@react-navigation/native` `7.5.1` + `native-stack` `7.21.0`. `react-native-screens` `4.30.0`, `react-native-safe-area-context` `5.10.1`.
- Quotes: 1600 total (200/mood), loaded from `quotes_bulk.json` at repo root via `src/features/quotes/data/quotes.ts` (import as JSON). Repo pattern: `QuotesRepository` with `localQuotesRepository` (default) and `remoteQuotesRepository`.
- Env/ads: `src/config/env.ts` toggles `useRemoteQuotes`/`apiBaseUrl`; `src/features/ads/` has disabled-by-default placeholders.
- Theme: dark palette in `src/theme/theme.ts` (background `#0B1026`, surfaces `#151B2F`). Brand direction moving to "Noesis"-style dark UI.

## Commands (exact)
- Install: `npm ci` (engines Node >= 22.11.0)
- Verify: `npm run verify` = `typecheck && lint && npm test -- --runInBand`
- Typecheck: `npm run typecheck` (`tsc --noEmit`)
- Lint: `npm run lint` / `npm run lint:fix`
- Test: `npm test` (Jest RN preset). Run single test: `npx jest path/to/file.test.ts --runInBand`
- Dev: `npm start` or `npm run start:reset`; Android `npm run android`; iOS `bundle install && bundle exec pod install && npm run ios`
- Bundle check: `npm run bundle:android` / `npm run bundle:ios` (scripts/bundle.js)

## Architecture notes
- Entry: `index.js` -> `App.tsx` -> `src/app/App.tsx` wraps with `SafeAreaProvider`/theme providers; nav in `src/app/navigation/AppNavigator.tsx` (stack: `Splash` -> `MoodSelection` -> `Quotes` with `moodId`).
- Features: `src/features/{splash,moods,quotes,ads}`; shared UI in `src/components/ui/` (`AppText`, `Button`, `Screen`); theme in `src/theme/`.
- Quotes flow: `QuotesScreen` shuffles per mood, single-card with fade/scale animation, "Next" button, `AdBanner` footer.
- No auth/backend; offline-first. Ads disabled by default.

## Gotchas / quirks
- Windows env: no JDK/ANDROID_HOME/SDK/adb/emulator/iOS toolchain guaranteed; native builds/smoke tests may not run here.
- TS: large quote arrays caused `TS2590` before; keep quotes in JSON (`quotes_bulk.json`) not massive inline literals.
- Jest: `jest.config.js` has `transformIgnorePatterns` for RN/Nav; tests use `@react-native/jest-preset`.
- StatusBar: use `barStyle` only (no backgroundColor mixing issues in places). 
- No emojis; prefer filled icons consistent with dark brand.

## References
- `README.md`, `COMMANDS.md`, `docs/{ARCHITECTURE,FEATURES,SETUP,ADS_INTEGRATION}.md`
- `opencode.json` / repo scripts for bundling/steps
