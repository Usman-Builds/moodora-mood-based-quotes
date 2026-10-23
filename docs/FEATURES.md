# Features

## v1 Workflow (as implemented/planned)

1. **Splash** - User opens the app and sees the animated splash screen.
2. **Mood selection** - App asks how the user is feeling and displays a list of moods (Step 2).
3. **Quotes** - User selects a mood and navigates to quotes related to that mood (Step 2).
4. **Multiple quotes per mood** - The quote list supports multiple quotes per mood (Step 2).

## Current State (Step 1)

- [x] React Native CLI project initialized in the root folder with app name `Moodora`.
- [x] Production-ready folder structure with feature modules.
- [x] Navigation scaffold (`Splash` -> `MoodSelection` -> `Quotes` with `moodId`).
- [x] Theme system, UI primitives, and screen shell.
- [x] Offline-first quotes repository pattern with future backend support.
- [x] Google Ads integration points (`AdBanner`, `adsConfig`, placement reserved for `quotes-footer`).
- [x] TypeScript, ESLint, Jest configured and passing.
- [x] Git repository with initial commit.
- [x] Documentation and runnable commands prepared.

## Future (Step 2 scope)

- Implement full mood selection UI with the `moods` dataset.
- Implement quotes list/carousel with `quotesRepository` and multiple quotes per mood.
- Add navigation between MoodSelection and Quotes.
- Reserve and wire `AdBanner` in the Quotes screen footer.
- Populate `src/features/quotes/data/quotes.ts` with curated quotes.
- Keep all data local by default (no auth/backend required).
