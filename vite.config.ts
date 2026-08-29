// @lovable.dev/vite-tanstack-config provides the TanStack Start, Vite, and Nitro plugins.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    ...(isVercel
      ? { preset: "vercel" }
      : {
          preset: "cloudflare-pages",
          output: {
            dir: "dist",
            publicDir: "dist",
          },
          codeSplitting: false,
        }),
  },
  vite: {
    build: {
      outDir: "dist",
      ...(isVercel
        ? {
            rollupOptions: {
              external: ["cloudflare:workers"],
            },
          }
        : {}),
    },
  },
});
