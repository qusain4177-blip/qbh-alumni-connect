import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  plugins: [TanStackRouterVite()],
  vite: {
    plugins: [tsconfigPaths(), tailwindcss(), react()],
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  },
  nitro: {
    preset: "cloudflare_pages",
    output: {
      dir: "dist",
      publicDir: "dist",
    },
  },
});
