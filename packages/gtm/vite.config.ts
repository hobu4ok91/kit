// vite.config.ts
import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "./src") }],
  },
  build: {
    // manifest: true,
    // minify: true,
    // reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      fileName: "main",
      formats: ["es", "cjs"],
    },
  },
});
