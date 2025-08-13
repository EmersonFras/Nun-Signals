import { getCurrentComputation, popComputation, pushComputation } from "./computationStack";
import type { ComputedSignal } from "../types";

export function computedSignal<T>(fn: () => T): ComputedSignal<T> {
    let value: T;
    const subscribers = new Set<(value: T) => void>();
    const computed = {} as ComputedSignal<T>; 

    computed.recompute = () => {
        pushComputation(computed)
        const newValue = fn();
        popComputation();

        if (!Object.is(value, newValue)) {
            value = newValue;
            subscribers.forEach(fn => fn(value))
        }
    };

    computed.get = () => {
        const current = getCurrentComputation();
        if (current) {
            subscribers.add(current.recompute);
        }

        return value;
    };

    computed.subscribe = (callback: (value: T) => void) => {
        subscribers.add(callback);  
        return () => subscribers.delete(callback);
    }

    computed.recompute();
    return computed;
}