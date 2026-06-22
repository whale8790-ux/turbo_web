/**
 * usePersistentState — wraps useState with localStorage backing.
 *
 * Falls back to `initialValue` when:
 *   - the stored value can't be parsed (corrupted JSON)
 *   - localStorage is unavailable (Safari private mode, blocked by browser)
 *
 * Writes are wrapped in try/catch so quota-exceeded / permission errors
 * don't crash the app — they just lose persistence for that change.
 */

import { useEffect, useState } from 'react';

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) {
        return initialValue;
      }
      return JSON.parse(stored) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota exceeded / storage disabled — silently lose persistence
    }
  }, [key, value]);

  return [value, setValue];
}
