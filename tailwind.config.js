const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
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
      fontSize: {
        'serif-md': '1.25rem',
        'serif-lg': '1.35rem'
      }
    },
    fontFamily: {
      'display': ['Playfair Display', ...defaultTheme.fontFamily.sans],
      'sans-serif': ['Poppins', ...defaultTheme.fontFamily.sans],
      'serif': ['EB Garamond', 'Merriweather', ...defaultTheme.fontFamily.serif]
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
          '.no-scrollbar': {
            /* IE and Edge */
            '-ms-overflow-style': 'none',

            /* Firefox */
            'scrollbar-width': 'none',

            /* Safari and Chrome */
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }
        }
      )
    })
  ],
}

