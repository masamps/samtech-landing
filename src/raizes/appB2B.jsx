import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AppB2BPage from "../pages/AppB2BPage.jsx";

// Raiz da página do app B2B (navegador e pré-renderização usam esta mesma).
export default function RaizAppB2B() {
  return (
    <>
      <AppB2BPage />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
