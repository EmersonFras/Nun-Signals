# Nun-Signals

## Why Signals?
Signals provide a clean and predictable way to manage state by allowing components to subscribe only to the precise pieces of data they care about. This leads to:

* **More predictable updates**, components re-render only when relevant data changes.
* **Better performance**, fine-grained reactivity reduces unnecessary work.
* **Simplified state management**, signals can replace complex context usage.


* **Easy integration** with reactive patterns like bindings for partial UI updates.


### Features & Current Support
* **Signals:** Objects with get and set methods representing reactive values.

* **Computed Signals:** Signals derived from other signals via a pure function. Automatically recomputes when dependencies change.

* **React Integration:**

    * **useSignalState:** connects signals to React state for full component updates.

    * **useSignalBinding:** converts signals into bindings that enable granular updates for components supporting bindings.

### When to Use useSignalState vs useSignalBinding
* **Bindings:**
Perfect for fine-grained updates by changing only the parts of the UI that need it.
**Note:** Components must explicitly support bindings to take advantage of this.

* **State Hook (useSignalState):**
Provides compatibility with any React component since it leverages React’s native state mechanism.
Triggers full component re-renders when the signal changes.

Use bindings when you want maximum performance with compatible components. Use useSignalState for wider compatibility or simpler cases.

### Getting Started

~~~js
import { createSignal, computed, useSignalState, useSignalBinding } from "nun-signals";

// Create a signal
const count = createSignal(0);

// Create a computed signal
const doubled = computed(() => count.get() * 2);

// React component with state hook
function Counter() {
  const value = useSignalState(count);
  return <button onClick={() => count.set(value + 1)}>{value}</button>;
}
~~~