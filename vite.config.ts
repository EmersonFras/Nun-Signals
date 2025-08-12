import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MySignals",
      fileName: (format) => `nun-signals.${format}.js`
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React"
        }
      }
    }
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom"
  }
});
