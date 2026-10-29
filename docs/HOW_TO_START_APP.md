# How to Start the Moodora App

## Prerequisites
- Node.js >= 22.11.0
- Android SDK with emulator or a physical Android device (ADB available)
- For iOS: macOS with Xcode and CocoaPods

## Quick Start (Android - most common)

### 1) Install dependencies
```bash
npm ci
```

### 2) Start Metro bundler
Open terminal 1 in the project root:
```bash
npm start
```
(Or reset cache if you see issues: `npm run start:reset`)

### 3) Run on Android
Open terminal 2 in the project root:
```bash
npm run android
```

This will build and launch the app on your connected Android device/emulator.

## Start on iOS (macOS only)

### 1) Install dependencies
```bash
npm ci
bundle install
```

### 2) Install pods
```bash
bundle exec pod install
```

### 3) Start Metro
```bash
npm start
```

### 4) Run
```bash
npm run ios
```

## Troubleshooting

- **No device/emulator**: Start an Android AVD via Android Studio or `emulator -avd <AVD_NAME>`. Check with `adb devices`.
- **Metro issues**: Run `npm run start:reset` and try again.
- **Build errors**: Ensure Android SDK/NDK match the versions in `android/build.gradle` and environment variables are set.
- **Type/Lint/Tests**: Validate with `npm run verify`.
- **Clean build**: `cd android && ./gradlew clean && cd ..` (or use Android Studio's clean).

## Verification
Before running, you can verify the project is healthy:
```bash
npm run verify
```
