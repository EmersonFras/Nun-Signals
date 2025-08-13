import type { ComputedSignal } from "../types"

const computationStack: ComputedSignal<any>[] = [];

export function pushComputation<T>(computation: ComputedSignal<T>) {
    computationStack.push(computation);
}

export function popComputation() {
    computationStack.pop();
}

export function getCurrentComputation() {
    return computationStack[computationStack.length - 1];
}