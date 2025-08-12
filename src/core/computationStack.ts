import type { Computation } from "../types"

const computationStack: Computation[] = [];

export function pushComputation(computation: Computation) {
    computationStack.push(computation);
}

export function popComputation() {
    computationStack.pop();
}

export function getCurrentComputation() {
    return computationStack[computationStack.length - 1];
}