import { useRef } from "react";
import type { BaseSignal } from "../types";

export function useSignalBinding<T>(signal: BaseSignal<T>): BaseSignal<T> {
  // Keep the same binding object across renders
  const bindingRef = useRef<BaseSignal<T> | null>(null)

  if (!bindingRef.current) {
    bindingRef.current = {
      get: () => signal.get(),
      subscribe: (listener) => signal.subscribe(listener)
    }
  }

  return bindingRef.current
}
