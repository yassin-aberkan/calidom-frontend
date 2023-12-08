/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#10b981",

          "secondary": "#d1d5db",

          "accent": "#34d399",

          "neutral": "#ffffff",

          "base-100": "#ffffff",

          "info": "#67e8f9",

          "success": "#10b981",

          "warning": "#fde047",

          "error": "#f87171",
        },
      },
    ],
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: '#36d384', // Change to your desired primary color
      },
    },
  },
  fontFamily: {
    custom: ['Yantramanav', 'sans-serif']
  },
  plugins: [require("daisyui")],

};
