# Going Live with AdMob

This guide takes Moodora from Google's sample/test IDs to your own AdMob account.

Related: [`ADS_INTEGRATION.md`](./ADS_INTEGRATION.md) for code layout, [`BUILD_SIGNED_APK.md`](./BUILD_SIGNED_APK.md) for release builds.

## 1. Create the app in AdMob

1. Sign in at <https://admob.google.com>.
2. **Apps → Add app**.
3. Choose the platform:
   - Android package name: `com.moodora.app`
   - iOS bundle ID: `com.moodora.app`
4. Copy the **App ID** for each platform. It looks like `ca-app-pub-1234567890123456~1234567890` (note the `~`).

If the app does not exist in the store yet, AdMob still lets you add it as "not listed on a store".

## 2. Create ad units

Create two units per platform, matching the in-app placements:

| Placement | Format | Suggested name |
| --- | --- | --- |
| `quotes-footer` | Banner | `Moodora Android Banner` |
| `quotes-break` | Interstitial | `Moodora Android Interstitial` |

Unit IDs look like `ca-app-pub-1234567890123456/1234567890` (note the `/`).

Use one ad unit per placement. Do not reuse a unit ID across formats.

## 3. Replace the application ID (native, required)

The SDK crashes at launch if these are missing or still set to the wrong app.

### Android

`android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"
    tools:replace="android:value" />
```

- Keep `xmlns:tools="http://schemas.android.com/tools"` on the `<manifest>` tag.
- `tools:replace` is required because the library declares the same key with an empty value.
- Rebuild the app after changing this: `npm run android` (or a release build). A Metro reload is not enough.

### iOS

Add the key to `ios/Moodora/Info.plist` (currently missing, so an iOS build would crash before this is added):

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY</string>
```

Then run `bundle exec pod install` and rebuild on macOS.

## 4. Replace the unit IDs

Edit `src/config/env.ts`:

```ts
ads: {
  enabled: true,
  showPlaceholdersInDevelopment: false,
  androidBannerUnitId: 'ca-app-pub-.../android-banner',
  iosBannerUnitId: 'ca-app-pub-.../ios-banner',
  androidInterstitialUnitId: 'ca-app-pub-.../android-interstitial',
  iosInterstitialUnitId: 'ca-app-pub-.../ios-interstitial',
  interstitialEveryNQuotes: 5,
},
```

Notes:

- `__DEV__` builds always use Google test IDs, so a debug build keeps showing "Test Ad" even after this edit.
- Release builds (`npm run android -- --mode release` or `assembleRelease`/`bundleRelease`) use the IDs above.
- Set `interstitialEveryNQuotes` to `0` to disable interstitials without removing code.

## 5. Test before publishing

1. Build a release variant (debug builds deliberately force test ads).
2. Install it on a physical device.
3. Check the banner shows a real ad and the interstitial appears after the 5th quote.
4. Watch logcat while testing:

```powershell
adb logcat | Select-String "Ads|AdMob|GMA"
```

5. In AdMob, open **Apps → your app → Ad units**; impressions appear (often delayed by a few minutes to hours).
6. Register your device as a test device in AdMob **before** generating impressions on live units if you plan to tap ads.

New apps can serve limited or no ads for a few days while AdMob reviews the account. This is normal.

## 6. Privacy and policy checklist

- **Non-personalized ads**: the app requests non-personalized ads by default (`requestNonPersonalizedAdsOnly: true`). Keep this until you add a consent flow.
- **EEA/UK consent**: if you distribute there, add the Google User Messaging Platform (UMP) SDK and a consent form before requesting personalized ads.
- **iOS App Tracking Transparency**: only needed if you enable personalized ads. Add `NSUserTrackingUsageDescription` and request ATT permission.
- **Play Console Data safety**: declare that the app shows ads and that the AdMob SDK collects device/advertising identifiers.
- **Apple App Privacy**: declare "Identifiers → Device ID" and "Usage Data → Advertising Data" for advertising.
- **No self-clicks**: never tap your own live ads or ask others to. It can suspend the account.
- **No accidental clicks**: do not place ads next to buttons or overlay them; the banner already sits below the primary action with padding.
- **No interstitials on launch/exit**: the current implementation only shows one after every 5 quotes.
- **Families policy**: if you target children, use only family-safe ad units and configure the SDK accordingly.

## 7. File reference

| File | What to change |
| --- | --- |
| `android/app/src/main/AndroidManifest.xml` | Android AdMob App ID |
| `ios/Moodora/Info.plist` | iOS AdMob App ID |
| `src/config/env.ts` | Banner + interstitial unit IDs, cadence |
| `src/features/ads/config/adsConfig.ts` | Reads env, no edits normally |
| `src/features/ads/components/AdBanner.tsx` | Banner placement/size |
| `src/features/ads/hooks/useInterstitialBreak.ts` | Interstitial load/show lifecycle |
| `src/features/quotes/screens/QuotesScreen.tsx` | Where and when ads appear |

## 8. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Crash on launch: `Unable to get provider ...MobileAdsInitProvider` | App ID meta-data missing or has the sample value in the wrong place. Check the manifest and `tools:replace`. |
| Banner stays empty | Test ad IDs only render in debug; check network, and give it a few seconds. In release, verify the unit ID and that the app was rebuilt. |
| `Invalid application ID` in logcat | Android app ID does not match the one registered in AdMob. |
| Ads show "Test Ad" in a release build | You are running a debug build; `__DEV__` forces test IDs. |
| Interstitial never appears | It only shows when preloaded (`status === 'loaded'`). Give it time, and confirm the interstitial unit ID. |
| No impressions in AdMob | New account/app review delay, or you are still on test IDs. |
