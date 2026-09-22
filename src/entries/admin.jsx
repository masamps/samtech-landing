import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/sora";
import "@fontsource-variable/manrope";
import "../index.css";
import AdminPage from "../pages/AdminPage.jsx";

// Sem Analytics e sem Speed Insights: é painel privado, não faz sentido
// mandar navegação interna para serviço de medição.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminPage />
  </React.StrictMode>
);
