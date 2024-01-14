const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: '#F8C537',
        primary: { // Primary text color
          DEFAULT: '#212121',
          dark: '#ffffff'
        },
        secondary: { // Secondary text color
          DEFAULT: '#757575',
          dark: '#777777',
        },
        tertiary: { // Tertiary text color
          DEFAULT: 'rgb(229 231 235)',
          dark: '#404040'
        },
        content: {
          DEFAULT: '#ffffff',
          dark: '#1b1b1b'
        },
        'content-secondary': {
          DEFAULT: colors.gray['100'],
          dark: '#131313'
        }
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    plugin(({addVariant}) => {
      addVariant('scrollbar', ['&::-webkit-scrollbar']);
      addVariant('scrollbar-thumb', ['&::-webkit-scrollbar-thumb']);
    })
  ]
}
