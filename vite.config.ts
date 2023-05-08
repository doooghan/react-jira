import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 路径别名
    },
  },
  define: {
    "process.env": {
      REACT_APP_API_URL: "http://localhost:3000",
    },
  },
});
