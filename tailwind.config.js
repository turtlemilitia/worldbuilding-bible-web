const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        widest: '0.4em'
      },
      spacing: {
        '128': '32rem',
        underScreen: '80vh'
      },
      minHeight: {
        '96': '24rem'
      }
    },
    fontFamily: {
      'display': ['Poppins', ...defaultTheme.fontFamily.sans],
      'sans-serif': ['Fira Sans', ...defaultTheme.fontFamily.sans],
      'serif': ['Merriweather', ...defaultTheme.fontFamily.serif]
    }
  },
  plugins: [],
}

