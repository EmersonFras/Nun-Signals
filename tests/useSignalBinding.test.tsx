import React, { useEffect, useRef } from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { computedSignal, createSignal, useSignalBinding, BindingSignal } from "../src/index";

// --- Simple test signal implementation ---
function createTestSignal<T>(initial: T) {
  let value = initial;
  const listeners = new Set<(v: T) => void>();

  return {
    get: () => value,
    set: (v: T) => {
      value = v
      listeners.forEach((l) => l(value))
    },
    subscribe: (listener: (v: T) => void) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  }
}

// --- Test component ---
function BoundLabel({ binding }: { binding: BindingSignal<number> }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial
    el.textContent = String(binding.get());

    // Updates
    return binding.subscribe((val) => {
      el.textContent = String(val);
    })
  }, [binding])

  return <span data-testid="label" ref={ref} />;
}

// --- Tests ---
describe("useSignalBinding", () => {
  it("provides initial value without triggering rerenders", () => {
    const signal = createTestSignal(42);

    function TestComponent() {
      const binding = useSignalBinding(signal);
      return <BoundLabel binding={binding} />;
    }

    render(<TestComponent />);

    expect(screen.getByTestId("label")).toHaveTextContent("42");
  })

  it("updates DOM when signal changes, without React re-render", () => {
    const signal = createTestSignal(0);

    let renderCount = 0;
    function TestComponent() {
      renderCount++;
      const binding = useSignalBinding(signal);
      return <BoundLabel binding={binding} />;
    }

    render(<TestComponent />);
    expect(screen.getByTestId("label")).toHaveTextContent("0");
    expect(renderCount).toBe(1);

    signal.set(5);
    expect(screen.getByTestId("label")).toHaveTextContent("5");
    expect(renderCount).toBe(1); // Still 1 → no rerender
  })

  it("keeps stable binding identity", () => {
    const signal = createTestSignal(1);

    let firstBinding: BindingSignal<number> | null = null;
    function TestComponent() {
      const binding = useSignalBinding(signal);
      if (!firstBinding) firstBinding = binding;
      return <BoundLabel binding={binding} />;
    }

    const { rerender } = render(<TestComponent />);
    rerender(<TestComponent />);

    expect(firstBinding).toBeTruthy();
    expect(useSignalBinding).toBeTruthy();
  })

  it("works with computedSignal", () => {
    const signal = createSignal(2);
    const double = computedSignal(() => signal.get() * 2);

    function TestComponent() {
        const binding = useSignalBinding(double);
        return <BoundLabel binding={binding} />;
    }

    render(<TestComponent />);
    const label = screen.getByTestId("label");

    // Initial
    expect(label).toHaveTextContent("4");

    // Update source signal
    act(() => {
        signal.set(5);
    });
    expect(label).toHaveTextContent("10");
    });
})
