import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import SvgPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./assets"),
    },
  },
  plugins: [react(), SvgPlugin()],
});
