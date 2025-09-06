import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react";
import vercel from "vite-plugin-vercel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vercel()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ]
  },
  optimizeDeps: {
    include: ['@mui/material/Tooltip', '@emotion/styled'],
  },
})