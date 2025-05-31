/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cute': ['Zen Maru Gothic', 'Nunito', 'sans-serif'],
        'heading': ['Zen Maru Gothic', 'Comfortaa', 'sans-serif'],
        'handwriting': ['Klee One', 'cursive'],
      },
      colors: {
        primary: {
          50: '#fef7ff',
          100: '#fdeeff',
          200: '#fcdcff',
          300: '#fbb9ff',
          400: '#f786ff',
          500: '#ed53ff',
          600: '#d631e8',
          700: '#b521c4',
          800: '#941ba0',
          900: '#7a1b82',
        },
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        cute: {
          50: '#fff0f5',
          100: '#ffe4ec',
          200: '#ffccd9',
          300: '#ffa3b8',
          400: '#ff6b8a',
          500: '#ff3366',
          600: '#f01d4e',
          700: '#cc1340',
          800: '#a8123c',
          900: '#8f1239',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 