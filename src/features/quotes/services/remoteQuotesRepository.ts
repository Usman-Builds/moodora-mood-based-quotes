import { apiRequest } from '../../../services/api/client';
import type { Quote, QuotesRepository } from '../types/quote';

export const remoteQuotesRepository: QuotesRepository = {
  async getByMood(moodId) {
    return apiRequest<readonly Quote[]>(
      `/v1/moods/${encodeURIComponent(moodId)}/quotes`,
    );
  },
};
