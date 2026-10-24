const API_BASE_URL = '';

export const env = {
  appName: 'Moodora',
  environment: __DEV__ ? 'development' : 'production',
  apiBaseUrl: API_BASE_URL,
  useRemoteQuotes: false,
  requestTimeoutMs: 10000,
  ads: {
    enabled: true,
    showPlaceholdersInDevelopment: false,
    androidBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
    iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
  },
} as const;
