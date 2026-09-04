const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C2430",
        paper: "#FCFCFC",
        slate: "#8A94A3",
        navy: "#1F3A5F",
        chrome: "#8A94A3",
        grey: "#BDBDBD",
        black: "#2C2C2C",
        dimgray: "#888888",
        status: {
          red: "#B5504A",
          green: "#4F8A5B",
          gold: "#C99A3E",
          blue: "#3E7CB1"
        },
        accent: {
          blue: "#0088FF"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
