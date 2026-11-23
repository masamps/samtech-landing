import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@fontsource-variable/sora";
import "@fontsource-variable/manrope";
import "../index.css";
import SolucaoPage from "../pages/SolucaoPage.jsx";
import { remarcadora } from "../data/solucoes.js";
import { initAnalytics } from "../lib/analytics.js";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SolucaoPage solucao={remarcadora} />
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);
