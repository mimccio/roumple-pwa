/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
  theme: {
    extend: {
      screens: { xs: '320px' },
      fontSize: { '2xs': '.65rem' },
      fontFamily: {
        sans: ['nunito', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ['class'],
}
