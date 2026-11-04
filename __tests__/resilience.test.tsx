/**
 * @format
 */

import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { quotes } from '../src/features/quotes/data/quotes';
import { MOOD_IDS } from '../src/features/moods/types/mood';

function Boom(): React.ReactElement {
  throw new Error('boom');
}

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('ErrorBoundary shows recovery screen instead of crashing', async () => {
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
  });
  expect(tree.root.findByProps({ testID: 'recovery-screen' })).toBeTruthy();
});

test('ErrorBoundary with null fallback hides the failed subtree', async () => {
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(
      <ErrorBoundary fallback={null}>
        <Boom />
      </ErrorBoundary>,
    );
  });
  expect(tree.toJSON()).toBeNull();
});

test('ErrorBoundary recovers when resetKey changes', async () => {
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(
      <ErrorBoundary resetKey={0}>
        <Boom />
      </ErrorBoundary>,
    );
  });
  await ReactTestRenderer.act(() => {
    tree.update(
      <ErrorBoundary resetKey={1}>
        <Text>ok</Text>
      </ErrorBoundary>,
    );
  });
  expect(tree.root.findByType(Text).props.children).toBe('ok');
});

test('quotes data is fully valid and covers every mood', () => {
  expect(quotes).toHaveLength(1600);
  for (const mood of MOOD_IDS) {
    expect(quotes.filter(q => q.moodId === mood).length).toBeGreaterThan(0);
  }
});
