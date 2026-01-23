// import { vitePluginErrorOverlay } from "@hiogawa/vite-plugin-error-overlay";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
// import checker from "vite-plugin-checker";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: ".vite",
  plugins: [
    react({
      babel: {
        plugins: ["styled-jsx/babel"],
      },
    }),
    tailwindcss(),
    // vitePluginErrorOverlay(),
    // checker({
    //   typescript: {
    //     buildMode: true,
    //     tsconfigPath: path.resolve(__dirname, "./tsconfig.json"),
    //   },
    // }),
    viteSingleFile(),
  ],
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      ignored: ["**/*.tsbuildinfo"],
    },
    // Disable caching in development
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
