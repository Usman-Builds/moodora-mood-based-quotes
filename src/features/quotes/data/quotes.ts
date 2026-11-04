import { MOOD_IDS } from '../../moods/types/mood';
import type { Quote } from '../types/quote';
import data from '../../../../quotes_bulk.json';

const validMoods = new Set<string>(MOOD_IDS);

function isValidQuote(value: unknown): value is Quote {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const q = value as Record<string, unknown>;
  return (
    typeof q.id === 'string' &&
    typeof q.moodId === 'string' &&
    validMoods.has(q.moodId) &&
    typeof q.text === 'string' &&
    q.text.trim().length > 0 &&
    typeof q.author === 'string'
  );
}

// Drop malformed entries once at load so screens never render a broken quote.
export const quotes: Quote[] = Array.isArray(data)
  ? (data as unknown[]).filter(isValidQuote)
  : [];
