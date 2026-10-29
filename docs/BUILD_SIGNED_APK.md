# Building a Signed APK / AAB

How to produce a standalone signed build you can install on your phone and upload to Google Play.

- **APK** = install directly on a device (`adb install`, file transfer, sharing).
- **AAB** = required for new Google Play uploads. Play generates per-device APKs from it.

Related: [`ADS_GO_LIVE.md`](./ADS_GO_LIVE.md) before shipping real ads.

## 0. Prerequisites

- Node.js >= 22.11.0 and `npm ci` already run.
- JDK 17+ (Android Studio's bundled JBR works).
- Android SDK with `ANDROID_HOME` set, or `android/local.properties` pointing at the SDK.

Check from PowerShell:

```powershell
node --version
& "$env:JAVA_HOME\bin\java.exe" -version
echo $env:ANDROID_HOME
```

If `JAVA_HOME` is empty, use the Android Studio JBR:

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
```

## 1. Bump the version (every release)

`android/app/build.gradle`:

```groovy
defaultConfig {
    versionCode 2        // integer, must increase for every Play upload
    versionName "1.0.1"  // shown to users
}
```

- `versionCode` must be strictly greater than the last uploaded build.
- Keep `versionName` human-readable.
- iOS equivalents live in Xcode (`CURRENT_PROJECT_VERSION`, `MARKETING_VERSION`).

## 2. Create a release keystore (once)

Run from the repo root:

```powershell
& "$env:JAVA_HOME\bin\keytool.exe" -genkeypair -v -storetype PKCS12 `
  -keystore android\app\moodora-release.keystore `
  -alias moodora `
  -keyalg RSA -keysize 2048 -validity 10000
```

You will be asked for:

- A **store password** (keystore password).
- Your name/org/location (can be anything reasonable).
- A **key password** (press Enter to reuse the store password).

Notes:

- This file is the identity of your app. **Back it up** (password manager + offline copy). Losing it means you cannot publish updates signed with the same key.
- `*.keystore`, `*.jks`, and `android/keystore.properties` are gitignored. Never commit them.
- With Play App Signing (default), this is your **upload key**; Google holds the app-signing key and can help you reset a lost upload key.

## 3. Create `android/keystore.properties`

Create the file `android/keystore.properties` (not committed):

```properties
storeFile=moodora-release.keystore
storePassword=YOUR_STORE_PASSWORD
keyAlias=moodora
keyPassword=YOUR_KEY_PASSWORD
```

- `storeFile` is resolved relative to `android/app/`, so `moodora-release.keystore` means `android/app/moodora-release.keystore`.
- `android/app/build.gradle` already loads this file when it exists and signs `release` with it.
- Without the file, release builds fall back to the debug key. They install locally but **must not** be uploaded to Play.

## 4. Build

From the repo root:

```powershell
cd android
.\gradlew.bat clean assembleRelease
```

Output:

```
android\app\build\outputs\apk\release\app-release.apk
```

Gradle bundles the JS automatically; you do not need `npm run bundle:android` first.

### Check the signature

```powershell
& "$env:ANDROID_HOME\build-tools\37.0.0\apksigner.bat" verify --print-certs `
  app\build\outputs\apk\release\app-release.apk
```

You should see `Signer #1 certificate DN: CN=...` and no errors. If it says the APK is signed with the Android debug key, `keystore.properties` was not picked up.

## 5. Install on your phone

```powershell
adb install -r "app\build\outputs\apk\release\app-release.apk"
```

If installation fails with `INSTALL_FAILED_UPDATE_INCOMPATIBLE` or "package conflicts", the phone still has the debug build:

```powershell
adb uninstall com.moodora.app
adb install "app\build\outputs\apk\release\app-release.apk"
```

You can also copy the APK to the phone and open it (enable "Install unknown apps" for your file manager).

## 6. Build the Play Store bundle (AAB)

```powershell
cd android
.\gradlew.bat bundleRelease
```

Output:

```
android\app\build\outputs\bundle\release\app-release.aab
```

Upload this file to Play Console. Do not upload the APK for new apps; Play requires AAB.

## 7. Upload to Google Play

1. Create a Google Play Developer account (<https://play.google.com/console>) and complete identity verification (one-time fee).
2. **Create app**: name `Moodora`, default language, app (not game), free.
3. Complete **Dashboard → Set up your app**:
   - Privacy policy URL (required if you collect any data; AdMob counts).
   - Ads declaration: **Yes, contains ads**.
   - Content rating questionnaire.
   - Target audience and content.
   - Data safety: declare AdMob's device/advertising identifier collection.
4. **Testing → Internal testing → Create new release**, upload `app-release.aab`, add tester emails, roll out.
5. Install from the opt-in link on your phone.
6. Move to **Closed testing**, then **Production** once verified.

New personal developer accounts must run a closed test with enough testers (currently 12+) opted in for 14 continuous days before production is unlocked. Check Play Console for the current requirement.

### Store listing assets you still need

| Asset | Requirement |
| --- | --- |
| App icon | 512 x 512 PNG, 32-bit, no alpha |
| Feature graphic | 1024 x 500 PNG/JPEG |
| Phone screenshots | At least 2, 16:9 or 9:16 |
| Short description | 80 characters |
| Full description | 4000 characters |

The in-app launcher icon is already generated from `src/assets/images/logo/moodora_logo.jpg`, but Play needs a separate 512 x 512 upload.

## 8. Before you upload — checklist

- [ ] Real AdMob app ID in `AndroidManifest.xml` (not the `ca-app-pub-3940256099942544~3347511713` sample).
- [ ] Real banner + interstitial unit IDs in `src/config/env.ts`.
- [ ] `versionCode` incremented.
- [ ] Release build installed on a physical device and ad behavior checked.
- [ ] `android/keystore.properties` exists and the APK is signed with your release key.
- [ ] Keystore backed up somewhere safe.
- [ ] `npm run verify` passes.

## 9. Troubleshooting

| Symptom | Fix |
| --- | --- |
| `JAVA_HOME is not set` | Set it to Android Studio's JBR (see step 0). |
| `SDK location not found` | Create `android/local.properties` with `sdk.dir=C\:\\Users\\<you>\\AppData\\Local\\Android\\Sdk` (escaped backslashes) or set `ANDROID_HOME`. |
| Build succeeds but app shows a white screen | The JS bundle failed to build. Run `npm run verify` and `cd android; .\gradlew.bat assembleRelease --stacktrace` for the real error. |
| "App not installed" on device | Uninstall the debug build first (signature mismatch), or free up storage. |
| Ads blank in release | Confirm the app was rebuilt after changing unit IDs, and that IDs are not the test ones by mistake. Debug builds always show "Test Ad" by design. |
| Play rejects "debug certificate" | The AAB was signed with the debug key; add `android/keystore.properties`. |
| Lost keystore | If enrolled in Play App Signing, request an upload key reset in Play Console. Otherwise the app cannot be updated under the same identity. |
