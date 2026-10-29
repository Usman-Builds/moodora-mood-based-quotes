# Project History / Session Handoff

This file is the running log of what has been built, changed, verified, and what is still open.

**For agents:** read this file at the start of every session, then append a dated entry at the end
when you finish a task. Keep it current — it is the handoff between sessions.

- Repo: `https://github.com/Usman-Builds/moodora-mood-based-quotes`
- Branch: `main`
- Last updated: 2026-10-29

## How to maintain this file

Goals: a new session should be able to continue in under 2 minutes, and this file must never become
a stale, bloated second README.

1. **Read before changing code.** Then confirm anything important against the actual files /
   `git log` — this file is state, the code is truth.
2. **Update at the end of every session.** Append one dated entry under "Session log" (newest last) and
   refresh the sections above it if they changed (status, known issues, next steps, signing).
3. **Keep entries short.** Goal → changes → verification → open issues. No command dumps, no narration.
4. **No secrets.** Never write passwords, tokens, or keystore contents here. Paths only
   (e.g. "password lives in `android/keystore.properties`, gitignored").
5. **No duplication.** How-to lives in `docs/`, rules live in `AGENTS.md`, current state lives here.
   Link instead of restating.
6. **Commit it with the work.** A log that only exists locally is invisible to the next session.
7. **Rotation:** when the session log exceeds ~15 entries or this file passes ~250 lines, move all but
   the newest 2 entries into `history/archive/YYYY-MM.md` (append, do not overwrite) and keep only a
   one-line pointer to the archive here. Archive files are plain Markdown and are never edited again.
8. **Don't fix history.** If an earlier entry is wrong, correct the current status sections and note
   the correction in the new entry; leave old entries as written.

Entry template:

```md
### YYYY-MM-DD — short title (commit abc1234)
- Goal:
- Changed: (files/areas)
- Verified: (commands/results)
- Open: (blockers/next steps)
```

---

## 1. What the app is

**Moodora** — offline-first React Native CLI app (`com.moodora.app`). Flow:

`Splash` (logo, ~1.9s) → `MoodSelection` (8 moods, 2-column grid) → `Quotes` (200 quotes per mood,
shuffled, single card with fade/scale animation, "Next" button, banner ad, interstitial every 5 quotes).

- 1600 quotes total in `quotes_bulk.json` (repo root), loaded through `src/features/quotes/data/quotes.ts`.
- No auth/backend. Dark "Noesis" theme (`src/theme/theme.ts`, background `#0B1026`).
- New Architecture + Hermes enabled.

## 2. Stack / versions

- React Native `0.88.0`, React `19.3.0`, TypeScript `^6.0.3`, RN CLI `20.2.0`
- `@react-navigation/native` `7.5.1` + `native-stack` `7.21.0`
- `react-native-google-mobile-ads` `^17.4.0`
- Android: minSdk 24, compileSdk 37, targetSdk 36, buildTools 37.0.0, Kotlin 2.2.0
- `versionCode 1`, `versionName "1.0"` (`android/app/build.gradle`)

## 3. Ads (implemented, still Google TEST ids)

- Config: `src/config/env.ts` — `ads.enabled`, `useRemoteQuotes`, `apiBaseUrl`,
  banner + interstitial unit IDs, `interstitialEveryNQuotes: 5`.
- `src/features/ads/config/adsConfig.ts` — resolves per-platform unit IDs; `__DEV__` forces `TestIds.*`.
- Banner: `src/features/ads/components/AdBanner.tsx` (Quotes footer).
- Interstitial: `src/features/ads/hooks/useInterstitialBreak.ts` + trigger logic in
  `src/features/quotes/screens/QuotesScreen.tsx`. Shows on every 5th "Next", preloaded only,
  advances to the next quote after close, re-loads after `closed`, never retries on error.
- Android manifest has AdMob application ID with `xmlns:tools` + `tools:replace="android:value"`
  (missing it crashed the app on launch — fixed in `5b16ae2`).
- iOS `Info.plist` has `GADApplicationIdentifier` (sample test ID).
- Go-live instructions: `docs/ADS_GO_LIVE.md`.

## 4. Branding / icons

- Source logo: `src/assets/images/logo/moodora_logo.jpg` (1024×1024).
- Splash uses the logo + tagline; the old "NOESIS" wordmark was removed from the splash
  (MoodSelection header still shows "NOESIS").
- Android launcher: adaptive icon `mipmap-anydpi-v26/ic_launcher(.xml|_round.xml)` with
  `drawable-nodpi/ic_launcher_foreground.png`, background `#0B1026` in `values/colors.xml`;
  legacy + round mipmaps regenerated for all densities.
- iOS: all `AppIcon.appiconset` PNG sizes generated + `Contents.json` updated (unverified on Windows).

## 5. Docs

All documentation lives in `docs/`; only `README.md` and `AGENTS.md` stay at the repo root.

- `docs/COMMANDS.md`, `docs/HOW_TO_START_APP.md` (moved from root)
- `docs/ARCHITECTURE.md`, `docs/FEATURES.md`, `docs/SETUP.md`
- `docs/ADS_INTEGRATION.md`, `docs/ADS_GO_LIVE.md`
- `docs/BUILD_SIGNED_APK.md`

## 6. Signing / release builds

- Release signing wired in `android/app/build.gradle`; reads `android/keystore.properties`.
- Release keystore: `android/app/moodora-release.keystore` (alias `moodora`, CN=Moodora, valid ~10000 days).
- Credentials: `android/keystore.properties` (**gitignored** — never commit; back up keystore + password).
- **Backup status: NOT verified (2026-10-29).** Both files exist only on this machine. Back them up to a
  password manager + offline copy before any Play upload. Losing them blocks updates under the same identity.
- Without `keystore.properties`, release falls back to the debug key (installs locally, not for Play).
- `.gitignore` includes `*.keystore`, `*.jks`, `android/keystore.properties`, `/test_apk/`.
- Test APK location: `test_apk/moodora-release.apk` (built and signature-verified with
  `build-tools\36.1.0\apksigner`; `37.0.0`'s `apksigner.jar` is corrupt on this machine).
- Last test APK: 68.6 MB, SHA-256 `C02DB094B00A206C530A3E729DB085480F2FA6B15C7C313C0B94CF5884CFD81A`.
- Release signature differs from debug, so uninstall `com.moodora.app` before switching between
  release and `npm run android` (debug) builds.

## 7. Verification status

- `npm run verify` (typecheck + lint + Jest) passes.
- `assembleDebug`/`installDebug` and `assembleRelease` both succeed.
- Release APK installs and launches on emulator (Pixel_7a, API 37); banner + interstitial show "Test Ad".
- Interstitial verified: ad appears on 5th quote and resumes at `6 / 200`.
- iOS: **not built or verified** (no macOS/Xcode in this environment).

## 8. Environment quirks (Windows/PowerShell)

- `adb`: `%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe`; `JAVA_HOME` = Android Studio JBR.
- PowerShell 5.1: no `&&`, no `head`/`tail`/heredocs. Use `Select-Object -Last N`, `Get-Content -Tail`.
- Redirect long build/log output to `C:\Users\Optimus\AppData\Local\Temp\opencode\*.out`.
- Screenshots: `adb shell screencap -p /sdcard/x.png` then `adb pull` (`exec-out > file` corrupts PNG).
- Use `uiautomator dump` + `adb pull` to inspect UI; tap via `adb shell input tap X Y`.
- First Metro bundle after `start:reset` can take ~90s; a white screen then is not a crash.

## 9. Known issues / caveats

- All ads still use Google **test** IDs; replace before Play upload (`docs/ADS_GO_LIVE.md`).
- `versionCode`/`versionName` never bumped; bump before any Play upload.
- iOS side unverified (icons, Info.plist, pods).
- Root README/AGENTS links point into `docs/`.
- `test_apk/` is intentionally untracked/ignored; the APK is shared manually (cloud/USB), not via GitHub.
- Windows line-ending warnings from Git (`LF will be replaced by CRLF`) are expected, not errors.

## 10. Next steps (ideas)

- **Back up the release keystore + password** (see section 6) — do this before anything else.
- Swap in real AdMob app/unit IDs and test on a physical device.
- Bump version, build AAB (`.\gradlew.bat bundleRelease`), create Play Console listing.
- Verify iOS build on macOS.
- Optional: settings screen, favorites/history, share quote, daily quote notification.
- When this log grows: follow the rotation policy at the top of this file.

---

## Session log (newest last — append new entries below)

### 2026-10-29 — initial implementation
- Built app skeleton, navigation, dark theme, mood grid, quote flow, 1600 quotes.
- Added docs, AGENTS.md, clean scripts, AdMob banner with test IDs.
- Fixed startup crash from missing AdMob application ID (`5b16ae2`).

### 2026-10-29 — interstitial, logo, docs, signing (commit `1924c59`, pushed)
- Added preloaded interstitial on every 5th quote with resume-on-close.
- Applied new logo to splash, Android legacy/adaptive icons, iOS AppIcon set; added iOS App ID.
- Created `docs/ADS_GO_LIVE.md` and `docs/BUILD_SIGNED_APK.md`; moved root docs into `docs/`;
  rewrote README; updated AGENTS + other docs.
- Wired release signing; ignored keystores.
- Verified: `npm run verify`, debug install, `assembleRelease`, release APK runtime check.

### 2026-10-29 — test APK (commit `3983025`, pushed)
- Added `/test_apk/` to `.gitignore`.
- Generated release keystore `android/app/moodora-release.keystore` + `android/keystore.properties`
  (both gitignored), built and verified signed APK, moved to `test_apk/moodora-release.apk`.
- Installed the signed APK on the emulator successfully.
- Rebuilt on request; output byte-identical to previous build.

### 2026-10-29 — history maintenance policy
- Goal: keep this handoff log useful long-term instead of letting it go stale or bloat.
- Changed: maintenance rules, rotation/archive policy, entry template (top of this file); keystore
  backup risk recorded in section 6; AGENTS.md now requires reading/updating this file.
- Verified: file renders, paths match the repo, `git status` shows only `history/` + `AGENTS.md`.
- Open: user must back up `android/app/moodora-release.keystore` + password.
