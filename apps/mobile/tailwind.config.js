/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // noobgg gaming dark theme - Web ile uyumlu
        background: "#0a0613", // Deep dark purple background
        foreground: "#ffffff", // Pure white text
        card: "#1a1625", // Slightly lighter dark card
        "card-foreground": "#ffffff",
        primary: "#9b87f5", // Main purple
        "primary-foreground": "#ffffff",
        secondary: "#2a2438", // Dark secondary
        "secondary-foreground": "#ffffff",
        muted: "#2a2438",
        "muted-foreground": "#a1a1aa", // Lighter muted text
        accent: "#9b87f5",
        "accent-foreground": "#ffffff",
        border: "rgba(155, 135, 245, 0.2)", // Purple border
        input: "rgba(155, 135, 245, 0.15)",
        ring: "#9b87f5",
        // Gaming colors - Consistent palette
        purple: {
          300: "#c4b5fd",
          400: "#9b87f5",
          500: "#6f52f4",
          600: "#5b3fd1",
          700: "#4c1d95",
        },
        green: {
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
        },
        blue: {
          400: "#60a5fa",
          500: "#3b82f6",
        },
        yellow: {
          400: "#facc15",
          500: "#eab308",
        },
        red: {
          400: "#f87171",
          500: "#ef4444",
        },
        // Gaming specific colors
        neon: {
          purple: "#9b87f5",
          green: "#00ff88",
          blue: "#00d4ff",
          pink: "#ff0080",
        },
      },
      fontFamily: {
        poppins: ["Poppins"],
        exo2: ["Exo2"],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      spacing: {
        '18': '72px',
        '88': '352px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};
