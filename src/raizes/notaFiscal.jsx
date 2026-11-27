import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import SolucaoPage from "../pages/SolucaoPage.jsx";
import { notaFiscal } from "../data/solucoes.js";

// Raiz da página de solução (navegador e pré-renderização usam esta mesma).
export default function Raiz() {
  return (
    <>
      <SolucaoPage solucao={notaFiscal} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
