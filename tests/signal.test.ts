import { describe, it, expect } from "vitest";
import { createSignal } from "../src/index";

describe("createSignal", () => {
  it("should get and set values", () => {
    const count = createSignal(0);
    expect(count.get()).toBe(0);
    count.set(1);
    expect(count.get()).toBe(1);
  });

  it("should notify subscribers", () => {
    const count = createSignal(0);
    let lastValue = 0;
    count.subscribe(v => lastValue = v);
    count.set(5);
    expect(lastValue).toBe(5);
  });
});
