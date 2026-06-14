import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // 1. Add the import

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // 2. Pass the underlying Vite configuration block
  vite: {
    plugins: [
      nitro({
        preset: "vercel", // Use "vercel" or your specific platform deployment target
      }),
    ],
  },
});
