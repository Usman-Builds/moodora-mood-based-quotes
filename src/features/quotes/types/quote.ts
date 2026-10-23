import type { MoodId } from '../../moods/types/mood';

export type Quote = {
  id: string;
  moodId: MoodId;
  text: string;
  author: string;
};

export interface QuotesRepository {
  getByMood(moodId: MoodId): Promise<readonly Quote[]>;
}
