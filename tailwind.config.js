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
        underScreen: 'calc(100vh - 200px)',
      },
      minHeight: {
        '96': '24rem'
      },
      colors: {
        burnOrange: '#C05746'
      },
      scale: {
        '-100': '-1'
      },
      transitionProperty: {
        'width': 'width'
      },
    },
    fontFamily: {
      'display': ['Playfair Display', ...defaultTheme.fontFamily.sans],
      'sans-serif': ['Poppins', ...defaultTheme.fontFamily.sans],
      'serif': ['Merriweather', ...defaultTheme.fontFamily.serif]
    }
  },
  plugins: [],
}

