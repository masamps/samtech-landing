import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@fontsource-variable/sora";
import "@fontsource-variable/manrope";
import "../index.css";
import AppB2BPage from "../pages/AppB2BPage.jsx";
import { initAnalytics } from "../lib/analytics.js";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppB2BPage />
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);
