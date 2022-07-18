import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  chokidarWatchOptions: {
    usePolling: true,
  },
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand
      "/api": "http://localhost:8000",
      // with options
      // '/api': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // },
    },
  },
  resolve: {
    alias: {
      api: path.resolve(__dirname, "src/configApi.js"),
      "@": path.resolve(__dirname, "src"),
      "@redux": path.resolve(__dirname, "src/redux/features"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
