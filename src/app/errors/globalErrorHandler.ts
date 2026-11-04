/**
 * Catches JS errors that happen outside React rendering (timers, native event
 * callbacks, animation callbacks). In release builds React Native's default
 * handler turns these into a hard crash, so here we report them to the app
 * instead and let the root boundary show a recovery screen.
 *
 * Debug builds keep the default handler so the red box still shows errors.
 */

type Listener = (error: Error) => void;

const listeners = new Set<Listener>();
let installed = false;

export function subscribeToGlobalErrors(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

export function reportError(error: unknown, context?: string): void {
  const err = toError(error);
  console.warn(`[Moodora] ${context ?? 'error'}:`, err.message);
  listeners.forEach(listener => {
    try {
      listener(err);
    } catch {
      // A failing listener must never take the app down.
    }
  });
}

export function installGlobalErrorHandler(): void {
  if (installed || __DEV__) {
    return;
  }
  const errorUtils = (globalThis as { ErrorUtils?: ErrorUtilsLike }).ErrorUtils;
  if (!errorUtils) {
    return;
  }
  installed = true;
  errorUtils.setGlobalHandler((error: unknown, isFatal?: boolean) => {
    reportError(error, isFatal ? 'fatal' : 'non-fatal');
  });
}

type ErrorUtilsLike = {
  setGlobalHandler: (handler: (error: unknown, isFatal?: boolean) => void) => void;
};
