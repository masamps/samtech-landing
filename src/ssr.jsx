import React from "react";
import { renderToString } from "react-dom/server";
import Home from "./raizes/home.jsx";
import AppB2B from "./raizes/appB2B.jsx";
import LaudoTecnico from "./raizes/laudoTecnico.jsx";
import NotaFiscal from "./raizes/notaFiscal.jsx";

/*
 * Entrada da pré-renderização (só roda no build, em Node). Cada página pública
 * é renderizada com a MESMA raiz que o navegador monta, para o HTML gerado e
 * a página hidratada serem idênticos. Admin e protótipos ficam de fora: são
 * privados (noindex) e dependem do navegador para montar.
 */
export const paginas = [
  { html: "index.html", Raiz: Home },
  { html: "aplicativo-b2b/index.html", Raiz: AppB2B },
  { html: "laudo-tecnico-de-remarcacao/index.html", Raiz: LaudoTecnico },
  { html: "conferencia-de-nota-fiscal/index.html", Raiz: NotaFiscal },
];

export function renderizar(Raiz) {
  return renderToString(
    <React.StrictMode>
      <Raiz />
    </React.StrictMode>
  );
}
