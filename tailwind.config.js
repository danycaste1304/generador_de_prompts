/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cadir: {
          purple: "#583D82",
          purpleDark: "#422A66",
          cyan: "#72C4DA",
          cyanSoft: "#E9F8FC",
          lavender: "#F4EFFB",
          white: "#FFFFFF",
          ink: "#241A35",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(88, 61, 130, 0.14)",
        glow: "0 22px 70px rgba(114, 196, 218, 0.28)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
