export interface Computation {
  recompute: () => void;
  get: () => any;
  subscribe:  (callback: () => void) => () => void;
  id?: string | number;
}

export type BindingSignal<T> = {
  get: () => T
  subscribe: (listener: (value: T) => void) => () => void
}
