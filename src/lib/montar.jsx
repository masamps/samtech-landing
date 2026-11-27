import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

/*
 * Monta a página no navegador. No site publicado o HTML já chega preenchido
 * (pré-renderizado no build, ver scripts/prerender.mjs): aí o React só
 * "hidrata", ou seja, liga os eventos no HTML que já está na tela. No
 * `npm run dev` o HTML vem vazio e a página é montada do zero.
 */
export function montarPagina(Raiz) {
  const raiz = document.getElementById("root");
  const arvore = (
    <React.StrictMode>
      <Raiz />
    </React.StrictMode>
  );
  if (raiz.hasChildNodes()) hydrateRoot(raiz, arvore);
  else createRoot(raiz).render(arvore);
}
