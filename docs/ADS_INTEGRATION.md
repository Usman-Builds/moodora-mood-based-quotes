# Ads Integration

Moodora ships with Google AdMob wired through [`react-native-google-mobile-ads`](https://docs.page/invertase/react-native-google-mobile-ads) v17.

## Placements

| Format | Placement | Where | Trigger |
| --- | --- | --- | --- |
| Banner | `quotes-footer` | `src/features/quotes/screens/QuotesScreen.tsx` | Always visible on the quotes screen |
| Interstitial | `quotes-break` | `src/features/quotes/screens/QuotesScreen.tsx` | Every 5 quotes by default (natural break) |

The interstitial only shows when it is already loaded, so a slow network never blocks the quote flow. After it closes, the next quote advances and a fresh ad is preloaded.

## Configuration

| File | Purpose |
| --- | --- |
| `src/config/env.ts` | `ads.enabled`, unit IDs per platform, `interstitialEveryNQuotes` |
| `src/features/ads/config/adsConfig.ts` | Normalizes config, `getBannerUnitId()`, `getInterstitialUnitId()` |
| `src/features/ads/components/AdBanner.tsx` | Banner wrapper with themed frame |
| `src/features/ads/hooks/useInterstitialBreak.ts` | Interstitial lifecycle wrapper |
| `android/app/src/main/AndroidManifest.xml` | AdMob **application ID** meta-data |
| `ios/Moodora/Info.plist` | AdMob **application ID** (`GADApplicationIdentifier`) |

## Development behavior

- Both unit IDs default to Google's **test** IDs.
- `AdBanner` and `useInterstitialBreak` force `TestIds.BANNER` / `TestIds.INTERSTITIAL` whenever `__DEV__` is true, so a debug build always shows a "Test Ad" and never bills your account.
- Release builds (`__DEV__ === false`) use the IDs from `src/config/env.ts`.

## Going live

Follow [`ADS_GO_LIVE.md`](./ADS_GO_LIVE.md) for the full checklist: creating the AdMob app, replacing the application and unit IDs, iOS setup, testing, and policy requirements.

## Notes

- Requests use `requestNonPersonalizedAdsOnly: true`. Add a consent flow (Google UMP) before enabling personalized ads.
- Keep ads away from tappable controls; the banner sits below the "Next" button with padding.
- Do not tap your own live ads. Use AdMob test devices during development.
