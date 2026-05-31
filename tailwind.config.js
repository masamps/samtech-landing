/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070A16",
        surface: "#0D1224",
        mist: "#C3CBE8",
        line: "rgba(148, 163, 220, 0.12)",
        brand: {
          50: "#EEF1FF",
          100: "#E0E5FF",
          200: "#C5CCFF",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        },
        accent: {
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
        },
      },
      fontFamily: {
        display: ['"Sora Variable"', '"Sora"', "system-ui", "sans-serif"],
        body: ['"Manrope Variable"', '"Manrope"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 30px 90px rgba(99, 102, 241, 0.25)",
        card: "0 24px 70px rgba(5, 8, 22, 0.55)",
        soft: "0 16px 44px rgba(8, 12, 30, 0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(148, 163, 220, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 220, 0.06) 1px, transparent 1px)",
        "brand-gradient":
          "linear-gradient(120deg, #818CF8 0%, #6366F1 45%, #22D3EE 100%)",
      },
      animation: {
        "float-slow": "floatSlow 11s ease-in-out infinite",
        "float-delay": "floatSlow 14s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-soft": "pulseSoft 7s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.06)" },
        },
      },
    },
  },
  plugins: [],
};
