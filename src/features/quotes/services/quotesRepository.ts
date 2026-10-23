import { env } from '../../../config/env';
import type { QuotesRepository } from '../types/quote';
import { localQuotesRepository } from './localQuotesRepository';
import { remoteQuotesRepository } from './remoteQuotesRepository';

export const quotesRepository: QuotesRepository = env.useRemoteQuotes
  ? remoteQuotesRepository
  : localQuotesRepository;
