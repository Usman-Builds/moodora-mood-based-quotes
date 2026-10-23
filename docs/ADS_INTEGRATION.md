# Google Ads Integration Guide (Future)

Moodora includes non-invasive hooks for Google Mobile Ads without pulling a third-party SDK in Step 1.

## Configuration

- `src/config/env.ts` - Toggle `ads.enabled` and provide platform unit IDs. Uses test IDs by default.
- `src/features/ads/config/adsConfig.ts` - Normalizes config and provides `getBannerUnitId()`.
- `src/features/ads/components/AdBanner.tsx` - Placeholder component with `placement="quotes-footer"`. Returns `null` when disabled.

## Recommended SDK

- [Google Mobile Ads SDK for React Native](https://developers.google.com/admob/react-native/start) (commonly `react-native-google-mobile-ads`).
- Follow Google AdMob policies and your app's consent requirements (GDPR/ATT) as applicable.

## Integration Steps (when ready)

1. Install the SDK: `npm install react-native-google-mobile-ads`.
2. Complete native setup per the SDK docs (Android `AndroidManifest.xml`, iOS `Info.plist`).
3. Replace the placeholder in `AdBanner` with the real `BannerAd` component, passing `unitId={getBannerUnitId()}` and `size`.
4. Set `ads.enabled = true` in `env.ts` only after testing with test IDs.
5. Consider loading strategies, error handling, and collapsing the banner when it fails to load.
6. Verify with test ads before using production unit IDs.

## Notes

- Keep `useRemoteQuotes` and ads decoupled. Both can be enabled independently.
- The `quotes-footer` placement is reserved so UI doesn't need restructuring when ads are added.
- In development, you can set `showPlaceholdersInDevelopment` to visualize banner space.
