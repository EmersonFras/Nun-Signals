import { useEffect, useState } from 'react';
import { createSignal } from '../core/signal';
import { computedSignal } from '../core/computedSignal';

export function useSignalState<T>(
    signal: 
    ReturnType<typeof createSignal<T>> | 
    ReturnType<typeof computedSignal<T>>
) {
    const [value, setValue] = useState(signal.get());

    useEffect(() => {
        const unsubscribe = signal.subscribe(setValue);
        return unsubscribe;
    }, [signal]);

    return value;
}