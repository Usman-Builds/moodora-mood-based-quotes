# Setup Guide

## Prerequisites

- Node.js >= 22.11.0
- npm 11+
- React Native development environment per [React Native docs](https://reactnative.dev/docs/set-up-your-environment)
- Android: JDK, Android SDK/AVD (or physical device)
- iOS: macOS with Xcode and CocoaPods (for iOS builds)

## Install Dependencies

```bash
npm ci
```

Or:

```bash
npm install
```

## Environment Configuration

- Edit `src/config/env.ts` to point to a future backend, toggle ads, or change the interstitial cadence.
- `ads.enabled` is `true`; ad unit IDs are Google's test IDs until you replace them.
- Debug builds always force Google test ads; see [`ADS_GO_LIVE.md`](./ADS_GO_LIVE.md) before shipping.
- Release signing is configured through `android/keystore.properties`; see [`BUILD_SIGNED_APK.md`](./BUILD_SIGNED_APK.md).

## Running the App

### Metro

```bash
npm start
```

Reset cache if needed:

```bash
npm run start:reset
```

### Android

```bash
npm run android
```

### iOS

```bash
bundle install
bundle exec pod install
npm run ios
```

## Verification Commands

```bash
npm run typecheck
npm run lint
npm run test -- --runInBand
npm run verify
```

## Bundling (optional verification)

```bash
npm run bundle:android
npm run bundle:ios
```

Bundled output goes to `.build/<platform>/`.
