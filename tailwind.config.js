/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff0000", // racing red
        accent: "#0066ff", // racing blue
        darkBG: "#0a0a0a",
        lightGray: "#e5e5e5",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #ff0000" },
          "100%": { boxShadow: "0 0 20px #ff0000" },
        },
      },
      animation: {
        glow: "glow 2s infinite alternate",
      },
    },
  },
  plugins: [],
};
