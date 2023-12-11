import type { Config } from 'tailwindcss'
import typographyPlugin from '@tailwindcss/typography'
import { fontFamily } from 'tailwindcss/defaultTheme'

export const roumplePreset = {
  content: [],
  plugins: [typographyPlugin],
  theme: {
    extend: {
      screens: { xs: '320px' },
      fontSize: { '2xs': '.65rem' },
      fontFamily: {
        sans: ['nunito', ...fontFamily.sans],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config
