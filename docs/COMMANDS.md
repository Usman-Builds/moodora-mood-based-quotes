# Moodora Commands

## Step 1: Create a Production Ready Folder Structure With Future Backend Support as well and Make the Project Running

Run these from the repository root (`D:\Work\Mobile Apps\Moodora`):

### Verify environment
```bash
node --version
npm --version
```

### Install dependencies
```bash
npm ci
```

### Validate the setup
```bash
npm run typecheck
npm run lint
npm run test -- --runInBand
npm run verify
```

### Run the app (development)
```bash
npm start
```

In another terminal:
```bash
npm run android
# or
npm run ios
```

### Optional: bundle check
```bash
npm run bundle:android
npm run bundle:ios
```

**Step 1 complete when `npm run verify` passes.**

## Step 2: Implement the features of the App

After Step 1 is verified, proceed to implement:

1. Build the mood selection UI (`src/features/moods/screens/MoodSelectionScreen.tsx`) using `moods` data.
2. Populate quotes in `src/features/quotes/data/quotes.ts` with multiple quotes per mood.
3. Build the quotes UI (`src/features/quotes/screens/QuotesScreen.tsx`) and navigate from mood selection with `moodId`.
4. Verify the `AdBanner` in the Quotes footer and the interstitial break (both use Google test ads in development).
5. Validate:

```bash
npm run typecheck
npm run lint
npm run test -- --runInBand
npm run verify
```

### Quick dev commands
```bash
npm run start:reset
npm run lint:fix
npm run format
```

## Release build / Play upload
See [BUILD_SIGNED_APK.md](./BUILD_SIGNED_APK.md) and [ADS_GO_LIVE.md](./ADS_GO_LIVE.md).

## Git
```bash
git status
git log --oneline -5
git add -A
git commit -m "feat: implement mood selection and quotes"
```
