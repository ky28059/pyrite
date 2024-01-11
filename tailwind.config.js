const colors = require('tailwindcss/colors');

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
        secondary: {
          DEFAULT: '#757575',
          dark: '#777777',
        },
        tertiary: {
          DEFAULT: 'rgb(229 231 235)',
          dark: '#404040'
        },
        content: {
          DEFAULT: '#ffffff',
          dark: '#1b1b1b'
        },
        'content-secondary': {
          DEFAULT: colors.gray['100'],
          dark: '#0B0B0B'
        }
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    },
  },
  plugins: []
}
