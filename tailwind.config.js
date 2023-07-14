const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans-serif': ['Fira Sans', ...defaultTheme.fontFamily.sans],
      'serif': ['Merriweather', ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [],
}

