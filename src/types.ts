export interface Computation {
  recompute: () => void;
}

export type BaseSignal<T> = {
    get: () => any;
    subscribe: (callback: (value: T) => void) => () => void;
}

export type WritableSignal<T> = BaseSignal<T> & {
    set: (value: T) => void;
}
