import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite(),
    tailwindcss(),
    react(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["cloudflare:workers"],
    },
  },
});
