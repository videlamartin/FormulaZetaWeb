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
          "0%": { textShadow: "0 0 10px rgba(255, 0, 0, 0.2)" },
          "100%": { textShadow: "0 0 25px rgba(255, 0, 0, 0.6), 0 0 40px rgba(0, 102, 255, 0.2)" },
        },
        scanner: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        scrollPulse: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(15px)", opacity: "0" },
        },
        pulseRed: {
          "0%, 100%": { backgroundColor: "rgba(255, 0, 0, 1)" },
          "50%": { backgroundColor: "rgba(200, 0, 0, 1)" },
        }
      },
      animation: {
        glow: "glow 3s infinite alternate ease-in-out",
        scanner: "scanner 2s ease-in-out 1",
        scrollPulse: "scrollPulse 1.5s infinite",
        pulseRed: "pulseRed 1.5s infinite",
      },
    },
  },
  plugins: [],
};
