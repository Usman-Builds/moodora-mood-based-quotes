# Moodora

A simple, offline-first mood-to-quotes app built with React Native CLI. No auth, no backend required for v1. Designed for future backend integration and Google Ads support.

## Workflow (v1)

1. User opens the app and sees the splash screen.
2. App asks how you are feeling and displays a list of moods.
3. User selects a mood and sees quotes related to that mood.
4. User can see multiple quotes for one mood.

## Quick Start

See [COMMANDS.md](./COMMANDS.md) for Step 1 and Step 2 commands.

### Minimal setup

`ash
npm ci
npm run verify
npm start
`

In another terminal:
`ash
npm run android
`

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) - Folder structure, navigation, data strategy, ads hooks
- [Setup Guide](./docs/SETUP.md) - Prerequisites, installation, running, verification
- [Features](./docs/FEATURES.md) - v1 requirements and current implementation status
- [Google Ads Integration](./docs/ADS_INTEGRATION.md) - Future ads hookup guide
- [Commands](./COMMANDS.md) - Step 1 and Step 2 runnable commands

## Scripts

| Script | Purpose |
| --- | --- |
| 
pm start | Start Metro bundler |
| 
pm run android | Build and run on Android |
| 
pm run ios | Build and run on iOS |
| 
pm run typecheck | TypeScript type checking |
| 
pm run lint | ESLint |
| 
pm run test -- --runInBand | Run tests |
| 
pm run verify | Run typecheck, lint, and tests |
| 
pm run bundle:android | Create production bundle for Android |
| 
pm run bundle:ios | Create production bundle for iOS |

## Tech Stack

- React Native 0.88 (React Native CLI)
- React 19
- TypeScript
- React Navigation (native-stack)
- React Native Safe Area Context / Screens

## Notes

- All code lives in the repo root (\Moodora/\).
- No authentication or backend is required for v1; data is local/offline-first.
- Google Ads integration points are prepared but disabled by default.
- Git repository is initialized.
