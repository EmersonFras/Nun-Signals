import { getCurrentComputation, popComputation, pushComputation } from "./computationStack";
import type { Computation } from "../types";

export function computedSignal<T>(fn: () => T): Computation {
    let value: T;
    const subscribers = new Set<() => void>();
    const computed = {} as Computation; 

    computed.recompute = () => {
        pushComputation(computed)
        const newValue = fn();
        popComputation();

        if (!Object.is(value, newValue)) {
            value = newValue;
            subscribers.forEach(fn => fn())
        }
    };

    computed.get = () => {
        const current = getCurrentComputation();
        if (current) {
            subscribers.add(current.recompute);
        }

        return value;
    };

    computed.subscribe = (callback: () => void) => {
        subscribers.add(callback);
        return () => subscribers.delete(callback);
    }

    computed.recompute();

    return computed;
}