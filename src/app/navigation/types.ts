import type { MoodId } from '../../features/moods/types/mood';

export type RootStackParamList = {
  Splash: undefined;
  MoodSelection: undefined;
  Quotes: {
    moodId: MoodId;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
