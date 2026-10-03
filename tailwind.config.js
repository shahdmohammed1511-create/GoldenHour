/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FDFBF7",
          warm: "#FAF6F0",
          cream: "#F4EFE6",
          border: "#E8DFC9",
        },
        champagne: "#EFE7DA",
        espresso: "#2C2825",
        charcoal: "#4A443E",
        warmMuted: "#7E766D",
        gold: {
          light: "#DFBA73",
          DEFAULT: "#C5A059",
          bright: "#D4AF37",
          dark: "#997736",
          deep: "#806126",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        script: ["Allura", "cursive"],
        sans: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 45px -10px rgba(197, 160, 89, 0.16)",
        paper: "0 30px 60px -12px rgba(90, 70, 45, 0.12), 0 0 1px 1px rgba(197, 160, 89, 0.25)",
        envelope: "0 35px 70px -15px rgba(60, 45, 25, 0.25)",
        seal: "0 8px 24px rgba(153, 119, 54, 0.38)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
};
