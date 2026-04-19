/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ec5b13",
        "brand-gold": "#c9a25b",
        "background-light": "#f8f6f6",
        "background-dark": "#1a130f",
      },
    },
  },
  plugins: [],
}

