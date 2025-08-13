import { getCurrentComputation } from "./computationStack";
import { WritableSignal } from "../types";

export function createSignal<T>(initialValue: T): WritableSignal<T> {
    let value = initialValue;
    const subscribers = new Set<(value: T) => void>();

    const get = () => {
        const current = getCurrentComputation();
        if (current) {
            subscribers.add(current.recompute);
        }

        return value;
    };

    const set = (newValue: T) => {
        if (Object.is(value, newValue)) return; // Prevent unnecessary updates
        value = newValue;

        subscribers.forEach((subscriber) => subscriber(value));
    }

    const subscribe = (fn: (value: T) => void) => {
        subscribers.add(fn);
        fn(value); // Call the subscriber immediately with the current value

        return () => {
            subscribers.delete(fn); // Unsubscribe function
        };
    }

    return { get, set, subscribe}
}