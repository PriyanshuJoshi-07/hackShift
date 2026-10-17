import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FBFAF7",
        ink: "#0B1F33",
        muted: "#5B6B7C",
        teal: {
          50: "#EFFAF7",
          100: "#D7F2EC",
          500: "#0F9E8D",
          600: "#0B7F73",
          700: "#0A655C",
        },
        medical: {
          50: "#EEF4FF",
          100: "#DBE8FF",
          500: "#2F6BFF",
          600: "#1D4ED8",
          700: "#1E3A8A",
        },
      },
      boxShadow: {
        soft: "0 18px 50px -30px rgba(11, 31, 51, 0.35)",
        card: "0 1px 2px rgba(11, 31, 51, 0.04), 0 12px 32px -20px rgba(11, 31, 51, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
