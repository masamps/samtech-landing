import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { solucoes, dadosEstruturados } from "./src/data/solucoes.js";

/*
 * Injeta o JSON-LD das páginas de solução a partir de src/data/solucoes.js.
 * O FAQ e o preço que o Google lê vêm do mesmo arquivo que a página mostra,
 * então não tem como um mudar e o outro ficar para trás.
 */
function dadosEstruturadosDasSolucoes() {
  return {
    name: "dados-estruturados-solucoes",
    transformIndexHtml(html, ctx) {
      const solucao = solucoes.find((s) => ctx.path === `${s.slug}index.html` || ctx.path === s.slug);
      if (!solucao) return html;
      return {
        html,
        tags: dadosEstruturados(solucao).map((dados) => ({
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: JSON.stringify(dados),
          injectTo: "head",
        })),
      };
    },
  };
}

// Site multipágina: cada entrada tem o seu próprio HTML e bundle. O painel
// interno é uma entrada separada de propósito — assim o código dele (e o
// cliente do Supabase) não entra no bundle das páginas públicas.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), dadosEstruturadosDasSolucoes()],
  // No build SSR (pré-renderização) a entrada é src/ssr.jsx, passada na linha
  // de comando; as entradas HTML abaixo são só do build do navegador.
  build: isSsrBuild ? {} : {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        appB2B: resolve(__dirname, "aplicativo-b2b/index.html"),
        solucaoLaudoTecnico: resolve(__dirname, "laudo-tecnico-de-remarcacao/index.html"),
        solucaoNotaFiscal: resolve(__dirname, "conferencia-de-nota-fiscal/index.html"),
        admin: resolve(__dirname, "admin/index.html"),
        prototipoReprice: resolve(__dirname, "prototipos/reprice/index.html"),
      },
    },
  },
}));
