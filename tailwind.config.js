/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  fontFamily: {
    custom: ['Yantramanav', 'sans-serif']
  },
  plugins: [require("daisyui")],

};
