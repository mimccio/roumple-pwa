import type { Config } from 'tailwindcss'

import { roumplePreset } from './config/roumple-preset'
import { shadcnPreset } from './config/shadcn-preset'

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [roumplePreset, shadcnPreset],
} satisfies Config

export default config
