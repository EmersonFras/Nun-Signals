

export type BaseSignal<T> = {
    get: () => T;
    subscribe: (callback: (value: T) => void) => () => void;
}

export interface Signal<T> extends BaseSignal<T> {
  set(value: T): void;
}

export interface ComputedSignal<T> extends BaseSignal<T> {
  recompute: () => void;
}

export type BindingSignal<T> = BaseSignal<T>;