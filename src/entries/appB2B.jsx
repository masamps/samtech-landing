import "@fontsource-variable/sora";
import "@fontsource-variable/manrope";
import "../index.css";
import Raiz from "../raizes/appB2B.jsx";
import { montarPagina } from "../lib/montar.jsx";
import { initAnalytics } from "../lib/analytics.js";

initAnalytics();
montarPagina(Raiz);
