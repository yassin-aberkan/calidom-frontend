/** @type {import('tailwindcss').Config} */
module.exports = {
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
