/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      fontSize: { '2xs': '.65rem' },
      fontFamily: {
        sans: ['nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
}
