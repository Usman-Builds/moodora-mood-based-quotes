# Moodora

A dark, atmospheric mood-to-quotes app built with React Native CLI. Pick how you feel and read quotes for that headspace. Offline-first, no auth, no backend.

## Workflow

1. Animated splash screen.
2. Choose a mood (happy, calm, hopeful, grateful, sad, anxious, angry, lonely).
3. Read a shuffled stream of 200 quotes for that mood.
4. Banner ad in the quotes footer; an interstitial appears every 5 quotes.

## Quick Start

```bash
npm ci
npm run verify
npm start
```

In another terminal:

```bash
npm run android
```

## Documentation

- [Getting Started](./docs/HOW_TO_START_APP.md) - Prerequisites and step-by-step startup
- [Commands](./docs/COMMANDS.md) - Runnable command reference
- [Architecture](./docs/ARCHITECTURE.md) - Folder structure, navigation, data strategy
- [Setup Guide](./docs/SETUP.md) - Environment configuration and verification
- [Features](./docs/FEATURES.md) - Implemented features and status
- [Ads Integration](./docs/ADS_INTEGRATION.md) - How ads are wired in the app
- [Going Live with AdMob](./docs/ADS_GO_LIVE.md) - Replace test IDs with your own AdMob account
- [Building a Signed APK / AAB](./docs/BUILD_SIGNED_APK.md) - Keystore, release build, Play upload

## Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Start Metro bundler |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | ESLint |
| `npm test -- --runInBand` | Run tests |
| `npm run verify` | Typecheck, lint, and tests |
| `npm run bundle:android` | Create production bundle for Android |
| `npm run bundle:ios` | Create production bundle for iOS |
| `npm run clean` | Remove build artifacts |
| `npm run clean:all` | Remove build artifacts and `node_modules` |

## Tech Stack

- React Native 0.88 (CLI, New Architecture, Hermes)
- React 19, TypeScript
- React Navigation (native-stack)
- React Native Safe Area Context / Screens
- Google Mobile Ads (`react-native-google-mobile-ads`)

## Notes

- 1600 quotes (200 per mood) loaded from `quotes_bulk.json`; all data is local.
- The launcher icon and splash logo use `src/assets/images/logo/moodora_logo.jpg`.
- Ads default to Google test IDs and always use test ads in development.
- See `AGENTS.md` for repo conventions and gotchas.
