/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['nunito', ...defaultTheme.fontFamily.sans],
        serif: ['crimson-pro', ...defaultTheme.fontFamily.serif],
      },
    },
  },
}
