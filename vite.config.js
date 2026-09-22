import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Site multipágina: cada entrada tem o seu próprio HTML e bundle. O painel
// interno é uma entrada separada de propósito — assim o código dele (e o
// cliente do Supabase) não entra no bundle das páginas públicas.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        appB2B: resolve(__dirname, "aplicativo-b2b/index.html"),
        admin: resolve(__dirname, "admin/index.html"),
      },
    },
  },
});
