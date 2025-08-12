import { describe, it, expect } from "vitest";
import { createSignal, computedSignal } from "../src/index";

describe("computation stack integration", () => {
  it("tracks dependencies and updates computed signals", () => {
    const count = createSignal(1);

    const double = computedSignal(() => {
      return count.get() * 2;
    });

    expect(double.get()).toBe(2);

    let recomputed = false;
    double.subscribe(() => {
      recomputed = true;
    });

    count.set(3);

    expect(double.get()).toBe(6);
    expect(recomputed).toBe(true);
  });
});
