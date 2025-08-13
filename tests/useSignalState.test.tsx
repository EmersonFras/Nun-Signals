import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createSignal, useSignalState, computedSignal } from "../src/index";
type SignalType<T> = ReturnType<typeof createSignal<T>>;

function TestComponent<T>({ signal }: { signal: SignalType<T> }) {
  const value = useSignalState(signal);
  return <div data-testid="value">{String(value)}</div>;
}

function ComputedTestComponent<T>({ signal }: { signal: ReturnType<typeof computedSignal<T>> }) {
  const value = useSignalState(signal);
  return <div data-testid="value">{String(value)}</div>;
}


describe("useSignalState hook", () => {
  it("renders initial signal value and updates on signal.set()", async () => {
    const signal = createSignal<number>(0);

    render(<TestComponent signal={signal} />);
    const valueDiv = screen.getByTestId("value");

    // Initial value
    expect(valueDiv.textContent).toBe("0");

    // Update signal
    act(() => {
        signal.set(42);
    });

    // Wait for React to update
    // React 18+ batch updates are async
    await screen.findByText("42");

    expect(valueDiv.textContent).toBe("42");
  });

  it("renders initial signal value and updates with computedSignal", async () => {
    const signal = createSignal<number>(0);
    const double = computedSignal(() => signal.get() * 2);

    render(<ComputedTestComponent signal={double} />);
    const valueDiv = screen.getByTestId("value");

    // Initial value
    expect(valueDiv.textContent).toBe("0");

    // Update signal
    act(() => {
        signal.set(42);
    });

    // Wait for React to update
    // React 18+ batch updates are async
    await screen.findByText("84");

    expect(valueDiv.textContent).toBe("84");
  });
});
