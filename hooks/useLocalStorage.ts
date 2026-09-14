"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "shankies-local-storage";

/**
 * localStorage-backed string value via useSyncExternalStore, so components
 * hydrate with the server snapshot (null) and then sync to the stored value
 * without setState-in-effect cascades. Writes notify all subscribers.
 */
export function useLocalStorage(key: string): [string | null, (value: string) => void] {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const value = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(key),
    () => null
  );

  const setValue = useCallback(
    (v: string) => {
      window.localStorage.setItem(key, v);
      window.dispatchEvent(new Event(EVENT));
    },
    [key]
  );

  return [value, setValue];
}
