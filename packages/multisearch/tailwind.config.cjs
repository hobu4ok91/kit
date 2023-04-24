const plugin = require("tailwindcss/plugin");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        primary: "#4A60E3",
        secondary: "#2CA4D9",
        positive: "#5fba21",
        neutral: "#838D9A",
        "neutral-light": "#DADDE1",
        hover: "#F5F6F7",
      },
      fontSize: {
        xs: "13px",
        sm: "15px",
        "2xl": "26px",
      },
      fontFamily: {
        sansHeader: ["Montserrat", "sans-serif"],
        sans: ["HelveticaRub", "Helvetica", "Open Sans", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".text-h3": {
          fontSize: "26px",
          fontWeight: 600,
          fontFamily: theme("fontFamily.sansHeader"),
        },
        ".text-h4": {
          fontSize: "20px",
          fontWeight: 600,
          fontFamily: theme("fontFamily.sansHeader"),
        },
        ".text-h5": {
          fontSize: "16px",
          fontWeight: 600,
          fontFamily: theme("fontFamily.sansHeader"),
        },
        ".text-h6": {
          fontSize: "12px",
          fontWeight: 600,
          fontFamily: theme("fontFamily.sansHeader"),
        },
        ".text-overline": {
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          fontFamily: theme("fontFamily.sansHeader"),
        },
      });
    }),
  ],
};

module.exports = config;
