import { quotes } from '../data/quotes';
import type { QuotesRepository } from '../types/quote';

export const localQuotesRepository: QuotesRepository = {
  async getByMood(moodId) {
    return quotes.filter(quote => quote.moodId === moodId);
  },
};
