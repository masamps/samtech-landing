/** @type {import('tailwindcss').Config} */
// Configuração dos protótipos de clientes. Cada protótipo tem a identidade
// visual do cliente, então não herda as cores e fontes do site da Samps.
export default {
  content: ["./prototipos/**/*.html", "./src/prototipos/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Reprice: papel, tinta e o amarelo de sinalização do escudo.
      colors: {
        papel: { DEFAULT: "#EEE9DF", claro: "#F8F5EF", escuro: "#E3DCCE" },
        linha: { DEFAULT: "#D2C9B7", forte: "#A99F8B" },
        tinta: { DEFAULT: "#17140F", 2: "#4A443A", 3: "#7A7164" },
        sinal: { DEFAULT: "#F4C20D", claro: "#FBEAA2", escuro: "#7A5D00" },
        carimbo: { vermelho: "#B3261E", verde: "#2D6A3A" },
        caneta: "#22408C",
        margem: "#C7463D",
        servico: { eta: "#2F5D8A", chassi: "#9C5D16", motor: "#4E6B2C" },
      },
      fontFamily: {
        sans: ['"Barlow"', "system-ui", "sans-serif"],
        cond: ['"Barlow Condensed"', '"Arial Narrow"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
