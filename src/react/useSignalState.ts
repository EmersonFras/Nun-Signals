import { useEffect, useState } from 'react';
import { createSignal } from '../core/signal';

export function useSignalState<T>(signal: ReturnType<typeof createSignal<T>>) {
    const [value, setValue] = useState(signal.get());

    useEffect(() => {
        const unsubscribe = signal.subscribe(setValue);
        return unsubscribe;
    }, [signal]);

    return value;
}