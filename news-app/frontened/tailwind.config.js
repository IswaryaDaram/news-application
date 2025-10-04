/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#F8FAFC",
        lightBgPrimary: "#E2E8F0",
        lightText: "#0F172A",
        darkBg: "#1E293B",
        darkText: "#F5F5F5",
        primaryRed: "#D71920",
      },
    },
    screens: {
      xs: { max: "640px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
