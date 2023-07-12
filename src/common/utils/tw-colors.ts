// TODO?: use import colors from 'tailwindcss/colors'

import {
  TW_COLOR_BG_100,
  TW_COLOR_BG_400,
  TW_COLOR_BG_500,
  TW_COLOR_BG_700,
  TW_COLOR_BORDER_100,
  TW_COLOR_BORDER_200,
  TW_COLOR_BORDER_400,
  TW_COLOR_BORDER_700,
  TW_COLOR_SHADOW_100,
  TW_COLOR_SHADOW_200,
  TW_COLOR_TEXT_200,
  TW_COLOR_TEXT_400,
  TW_COLOR_TEXT_500,
  TW_COLOR_TEXT_700,
} from '&/common/constants/tw-colors'
import type { TwColor } from '../types'
import { TW_COLOR_BORDER_500 } from '../constants'

type ColorType = 'text' | 'bg' | 'border' | 'shadow'
type Nuance = 100 | 200 | 400 | 500 | 700

const getTextTwColors = (nuance: Nuance) => {
  if (nuance === 200) return TW_COLOR_TEXT_200
  if (nuance === 400) return TW_COLOR_TEXT_400
  if (nuance === 500) return TW_COLOR_TEXT_500
  if (nuance === 700) return TW_COLOR_TEXT_700
  console.error(`nuance ${nuance} doesn't exist for text`)
  return TW_COLOR_TEXT_500
}

const getBgTwColors = (nuance: Nuance) => {
  if (nuance === 100) return TW_COLOR_BG_100
  if (nuance === 400) return TW_COLOR_BG_400
  if (nuance === 500) return TW_COLOR_BG_500
  if (nuance === 700) return TW_COLOR_BG_700
  console.error(`${nuance} doesn't exist for bg}`)
  return TW_COLOR_BG_500
}

const getBorderTwColors = (nuance: Nuance) => {
  if (nuance === 100) return TW_COLOR_BORDER_100
  if (nuance === 200) return TW_COLOR_BORDER_200
  if (nuance === 400) return TW_COLOR_BORDER_400
  if (nuance === 500) return TW_COLOR_BORDER_500
  if (nuance === 700) return TW_COLOR_BORDER_700
  console.error(`${nuance} doesn't exist for border}`)
  return TW_COLOR_BORDER_200
}

const getShadowTwColors = (nuance: Nuance) => {
  if (nuance === 100) return TW_COLOR_SHADOW_100
  if (nuance === 200) return TW_COLOR_SHADOW_200
  console.error(`${nuance} doesn't exist for shadow}`)
  return TW_COLOR_SHADOW_200
}

const getTwTextColor = (nuance: Nuance, color: TwColor) => {
  return getTextTwColors(nuance)?.[color]
}

const getTwBgColor = (nuance: Nuance, color: TwColor) => {
  return getBgTwColors(nuance)?.[color]
}

const getTwBorderColor = (nuance: Nuance, color: TwColor) => {
  return getBorderTwColors(nuance)?.[color]
}

const getTwSHadowColor = (nuance: Nuance, color: TwColor) => {
  return getShadowTwColors(nuance)?.[color]
}

export const getTwColor = (colorType: ColorType = 'text', color: TwColor = 'gray', nuance: Nuance) => {
  if (colorType === 'bg') return getTwBgColor(nuance, color)
  if (colorType === 'border') return getTwBorderColor(nuance, color)
  if (colorType === 'shadow') return getTwSHadowColor(nuance, color)
  return getTwTextColor(nuance, color)
}
