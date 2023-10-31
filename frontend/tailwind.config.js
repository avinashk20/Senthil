/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-light": "#fff",
        "background-dark": "#0E141B",
        "text-light": "#0A0C10",
        "text-dark": "#fff",
        accent: "#FFA500",
        skeleton: "rgba(255, 255, 255, 0.1)",
        neutral: "#B7B9BB",
      },
      gridTemplateRows: {
        layout: "auto 1fr auto",
      },
    },
    future: {
      hoverOnlyWhenSupported: true,
    },
  },

  plugins: [],
};
