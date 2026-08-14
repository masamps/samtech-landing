import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Site multipágina: a home e a página do aplicativo B2B são entradas
// independentes, cada uma com o seu próprio HTML e metadados de SEO.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        appB2B: resolve(__dirname, "aplicativo-b2b/index.html"),
      },
    },
  },
});
