// tests/core/computed.test.ts
import { describe, it, expect } from "vitest";
import { computedSignal } from "../src/index";

describe("computedSignal", () => {
  it("computes initial value correctly", () => {
    const signal = computedSignal(() => 5);
    expect(signal.get()).toBe(5);
  });

  it("recomputes and notifies subscribers when dependencies change", () => {
    let dependencyValue = 1;

    // A basic signal mock to simulate dependencies with subscribe & get
    function mockSignal() {
      let value = dependencyValue;
      const subscribers = new Set<() => void>();

      return {
        get() {
          // Normally tracks dependency here
          return value;
        },
        set(newValue: number) {
          value = newValue;
          subscribers.forEach(fn => fn());
        },
        subscribe(fn: () => void) {
          subscribers.add(fn);
          return () => subscribers.delete(fn);
        }
      };
    }

    const dep = mockSignal();

    // Create a computed signal depending on dep.get()
    const comp = computedSignal(() => dep.get() * 2);

    expect(comp.get()).toBe(2); // 1 * 2

    let notified = false;
    const unsubscribe = comp.subscribe(() => {
      notified = true;
    });

    // Change dependency value and notify subscribers
    dep.set(3);

    // Manually call recompute (depends on your implementation)
    comp.recompute();

    expect(comp.get()).toBe(6); // 3 * 2
    expect(notified).toBe(true);

    unsubscribe();
  });
});
