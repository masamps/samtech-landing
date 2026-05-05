/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        mist: "#E5EEF8",
        accent: {
          300: "#8EE8FF",
          400: "#65DFFF",
          500: "#3BC8F6",
          600: "#1497C7",
        },
      },
      fontFamily: {
        display: ['"Sora Variable"', '"Sora"', "sans-serif"],
        body: ['"Manrope Variable"', '"Manrope"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 30px 80px rgba(14, 165, 233, 0.18)",
        card: "0 24px 80px rgba(6, 10, 24, 0.45)",
        soft: "0 18px 50px rgba(8, 15, 32, 0.28)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
      },
      animation: {
        "float-slow": "floatSlow 10s ease-in-out infinite",
        "float-delay": "floatSlow 13s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
        pulseSoft: "pulseSoft 6s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

