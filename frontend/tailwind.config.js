/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        react: '#61DAFB',
        nodejs: '#339933',
        express: '#000000', // Express doesn't have an official color, so black is used here
        puppeteer: '#40B5A4', // This is an approximation
        tailwind: '#38B2AC',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
