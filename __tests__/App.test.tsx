/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('react-native-google-mobile-ads', () => ({
  __esModule: true,
  default: () => ({
    initialize: jest.fn().mockResolvedValue([]),
  }),
  BannerAd: () => null,
  BannerAdSize: { BANNER: 'BANNER' },
  TestIds: { BANNER: 'ca-app-pub-3940256099942544/6300978111' },
}));

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
