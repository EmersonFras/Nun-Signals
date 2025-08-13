export interface Computation {
  recompute: () => void;
}

export type BaseSignal<T> = {
    get: () => T;
    subscribe: (callback: (value: T) => void) => () => void;
}

export type WritableSignal<T> = BaseSignal<T> & {
    set: (value: T) => void;
}
