import plugin from 'tailwindcss/plugin'

import { colors } from './shadcn-colors'
import { lightTheme } from './themes'

export const shadcnPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ':root': lightTheme,
      '.dark': lightTheme, // TODO: use `darkTheme` when ready
    })
    addBase({
      '*': {
        '@apply border-border': {},
      },
      body: {
        '@apply bg-background text-foreground': {},
        '@apply selection:bg-primary selection:text-primary-foreground': {},
        'font-feature-settings': '"rlig" 1, "calt" 1',
      },
    })
  },
  {
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors,
        borderRadius: {
          lg: `var(--radius)`,
          md: `calc(var(--radius) - 3px)`,
          sm: 'calc(var(--radius) - 6px)',
        },
        // fontFamily: {
        //   sans: ['var(--font-sans)', ...fontFamily.sans],
        // },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'spin-slow': 'spin 1.5s linear infinite',
        },
      },
    },
  }
)
