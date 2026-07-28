// Rastreamento de conversões.
//
// Os IDs são lidos das variáveis de ambiente (VITE_*). Enquanto não forem
// configurados, tudo aqui vira no-op — o site funciona normalmente, apenas
// sem enviar dados. Assim você pode criar as contas depois, sem mexer no código.
//
// Configure na Vercel (Settings > Environment Variables):
//   VITE_GA4_ID           -> G-XXXXXXXXXX      (Google Analytics 4)
//   VITE_META_PIXEL_ID    -> 000000000000000   (Meta/Facebook Pixel)
//   VITE_GOOGLE_ADS_ID    -> AW-XXXXXXXXX      (Google Ads)

const GA4_ID = import.meta.env.VITE_GA4_ID;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID;

function injectScript(src) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/** Inicializa os pixels configurados. Chamar uma única vez, no boot do app. */
export function initAnalytics() {
  if (typeof window === "undefined") return;

  // --- Google (GA4 e/ou Google Ads compartilham o gtag) ---
  const googleId = GA4_ID || GOOGLE_ADS_ID;
  if (googleId) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${googleId}`);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    if (GA4_ID) window.gtag("config", GA4_ID);
    if (GOOGLE_ADS_ID) window.gtag("config", GOOGLE_ADS_ID);
  }

  // --- Meta Pixel ---
  if (META_PIXEL_ID) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
  }
}

/**
 * Registra uma conversão nas plataformas configuradas.
 * @param {string} name  Nome do evento (ex.: "lead_formulario")
 * @param {object} params Dados extras opcionais
 */
export function trackConversion(name, params = {}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", name, params);
  }

  if (window.fbq) {
    // "Lead" é o evento padrão do Meta para captação de contato.
    window.fbq("track", "Lead", { content_name: name, ...params });
  }
}
