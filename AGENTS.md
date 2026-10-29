# AGENTS.md

## Session history (read this first)
- Read [`history/HISTORY.md`](history/HISTORY.md) at the start of every session before making changes.
- Update it at the end of every session: append a dated entry under "Session log" and refresh the
  status/known-issues/next-steps sections so the next session can continue from it.
- Follow its maintenance rules: keep entries short, never write secrets (paths only), do not duplicate
  `docs/` content, and commit the update with the work. Old entries are archived automatically by the
  pre-commit hook (`scripts/history-compact.js`); run `npm run history:compact` if hooks are not installed.
- Treat it as the source of truth for current state (feature status, signing, test APK, open issues);
  verify important claims against the code and `git log`.

## Quick facts
- Name: `moodora` (RN CLI), package `com.moodora.app`, display `Moodora`. New Architecture/Hermes enabled.
- Stack: React Native `0.88.0`, React `19.3.0`, TS `^6.0.3`, RN CLI `20.2.0`. Nav: `@react-navigation/native` `7.5.1` + `native-stack` `7.21.0`. `react-native-screens` `4.30.0`, `react-native-safe-area-context` `5.10.1`.
- Quotes: 1600 total (200/mood), loaded from `quotes_bulk.json` at repo root via `src/features/quotes/data/quotes.ts` (import as JSON). Repo pattern: `QuotesRepository` with `localQuotesRepository` (default) and `remoteQuotesRepository`.
- Env/ads: `src/config/env.ts` toggles `useRemoteQuotes`/`apiBaseUrl` and holds AdMob unit IDs + interstitial cadence; `src/features/ads/` implements banner + interstitial.
- Theme: dark palette in `src/theme/theme.ts` (background `#0B1026`, surfaces `#151B2F`). Brand direction moving to "Noesis"-style dark UI.

## Commands (exact)
- Install: `npm ci` (engines Node >= 22.11.0)
- Verify: `npm run verify` = `typecheck && lint && npm test -- --runInBand`
- Typecheck: `npm run typecheck` (`tsc --noEmit`)
- Lint: `npm run lint` / `npm run lint:fix`
- Test: `npm test` (Jest RN preset). Run single test: `npx jest path/to/file.test.ts --runInBand`
- Dev: `npm start` or `npm run start:reset`; Android `npm run android`; iOS `bundle install && bundle exec pod install && npm run ios`
- Bundle check: `npm run bundle:android` / `npm run bundle:ios` (scripts/bundle.js)
- Clean build artifacts: `npm run clean`; full reset incl. `node_modules`: `npm run clean:all` (then `npm ci`)

## Architecture notes
- Entry: `index.js` -> `App.tsx` -> `src/app/App.tsx` wraps with `SafeAreaProvider`/theme providers; nav in `src/app/navigation/AppNavigator.tsx` (stack: `Splash` -> `MoodSelection` -> `Quotes` with `moodId`).
- Features: `src/features/{splash,moods,quotes,ads}`; shared UI in `src/components/ui/` (`AppText`, `Button`, `Screen`); theme in `src/theme/`.
- Quotes flow: `QuotesScreen` shuffles per mood, single-card with fade/scale animation, "Next" button, `AdBanner` footer, and an interstitial every `ads.interstitialEveryNQuotes` quotes (default 5, only when preloaded).
- No auth/backend; offline-first. Ads enabled with Google test IDs; `__DEV__` forces test ads.
- Branding: logo at `src/assets/images/logo/moodora_logo.jpg` (splash + launcher icons). Android launcher uses adaptive icon in `mipmap-anydpi-v26` with `drawable-nodpi/ic_launcher_foreground.png`; legacy/round mipmaps are generated, as are iOS AppIcon PNGs.

## Gotchas / quirks
- Windows env: no JDK/ANDROID_HOME/SDK/adb/emulator/iOS toolchain guaranteed; native builds/smoke tests may not run here.
- AdMob: SDK `react-native-google-mobile-ads` 17.x. Both platforms need the AdMob **application ID** or the app crashes at launch: Android `com.google.android.gms.ads.APPLICATION_ID` meta-data in `android/app/src/main/AndroidManifest.xml` (also needs `xmlns:tools` + `tools:replace="android:value"` because the library declares an empty value), iOS `GADApplicationIdentifier` in `ios/Moodora/Info.plist`. Sample test IDs are currently used.
- Ads: `src/config/env.ts` uses Google test unit IDs; `AdBanner` and `useInterstitialBreak` force test IDs when `__DEV__`, so dev always shows "Test Ad".
- Release signing: `android/app/build.gradle` reads `android/keystore.properties` (gitignored) and signs `release` with it; falls back to the debug key when absent. See `docs/BUILD_SIGNED_APK.md`.
- First Metro bundle after `start:reset` can take ~90s; a white screen during that time is not a crash.
- TS: large quote arrays caused `TS2590` before; keep quotes in JSON (`quotes_bulk.json`) not massive inline literals.
- Jest: `jest.config.js` has `transformIgnorePatterns` for RN/Nav; tests use `@react-native/jest-preset`.
- StatusBar: use `barStyle` only (no backgroundColor mixing issues in places). 
- No emojis; prefer filled icons consistent with dark brand.

## References
- Root keeps only `README.md` and `AGENTS.md`; all other docs live in `docs/`.
- `history/HISTORY.md` — session handoff log; keep it updated.
- `docs/{COMMANDS,HOW_TO_START_APP,ARCHITECTURE,FEATURES,SETUP,ADS_INTEGRATION,ADS_GO_LIVE,BUILD_SIGNED_APK}.md`
- `opencode.json` / repo scripts for bundling/steps
