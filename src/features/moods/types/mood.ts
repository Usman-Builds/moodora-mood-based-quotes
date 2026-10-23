export const MOOD_IDS = [
  'happy',
  'calm',
  'hopeful',
  'grateful',
  'sad',
  'anxious',
  'angry',
  'lonely',
] as const;

export type MoodId = (typeof MOOD_IDS)[number];

export type Mood = {
  id: MoodId;
  label: string;
  description: string;
  accent: string;
  tint: string;
  monogram: string;
};
