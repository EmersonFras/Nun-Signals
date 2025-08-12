import { useRef } from "react";
import type { BindingSignal } from "../types";

export function useSignalBinding<T>(
  signal: { get: () => T; subscribe: (cb: (value: T) => void) => () => void }
): BindingSignal<T> {
  // Keep the same binding object across renders
  const bindingRef = useRef<BindingSignal<T> | null>(null)

  if (!bindingRef.current) {
    bindingRef.current = {
      get: () => signal.get(),
      subscribe: (listener) => signal.subscribe(listener)
    }
  }

  return bindingRef.current
}
