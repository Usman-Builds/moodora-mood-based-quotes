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
    androidBannerUnitId: 'ca-app-pub-6756076643824130/4052972137',
    iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
    androidInterstitialUnitId: 'ca-app-pub-6756076643824130/9852093724',
    iosInterstitialUnitId: 'ca-app-pub-3940256099942544/4411468910',
    interstitialEveryNQuotes: 5,
  },
} as const;
