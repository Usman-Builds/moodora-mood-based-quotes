# Features

## v1 Workflow

1. **Splash** - Animated logo intro, then automatic navigation.
2. **Mood selection** - 2-column grid of 8 moods with accent colors and glyph icons.
3. **Quotes** - Shuffled single-card stream for the selected mood (200 quotes each).
4. **Ads** - Footer banner plus an interstitial every 5 quotes.

## Implemented

- [x] React Native CLI project with app name `Moodora` (`com.moodora.app`).
- [x] Feature-based folder structure with shared UI primitives and theme.
- [x] Navigation (`Splash` -> `MoodSelection` -> `Quotes` with `moodId`).
- [x] Dark "Noesis" visual theme with glow accents and animated splash.
- [x] 1600 quotes (200 per mood) loaded offline from `quotes_bulk.json`.
- [x] Google AdMob: banner in the quotes footer and a preloaded interstitial on natural breaks.
- [x] Generated launcher icons (adaptive + legacy + round) and iOS AppIcon from the brand logo.
- [x] TypeScript, ESLint, Jest configured and passing.
- [x] Release signing support via `android/keystore.properties`.
- [x] Documentation for setup, ads go-live, and signed builds.

## Next / Ideas

- Favorites and share actions.
- Daily quote notification.
- Backend sync by flipping `env.useRemoteQuotes`.
- Consent flow (Google UMP) for personalized ads in EEA/UK.
