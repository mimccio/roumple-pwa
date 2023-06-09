import {
  TW_COLOR_BG_100,
  TW_COLOR_BG_400,
  TW_COLOR_BG_500,
  TW_COLOR_BG_700,
  TW_COLOR_BORDER_100,
  TW_COLOR_BORDER_400,
  TW_COLOR_BORDER_700,
  TW_COLOR_TEXT_400,
  TW_COLOR_TEXT_500,
  TW_COLOR_TEXT_700,
} from '&/common/constants/tw-colors'
import { TW_COLOR_BORDER_500 } from '../constants'
import { TwColor } from '../types'

type ColorType = 'text'
type Nuance = 100 | 400 | 500 | 700

const getTextTwColors = (nuance: Nuance) => {
  if (nuance === 400) return TW_COLOR_TEXT_400
  if (nuance === 500) return TW_COLOR_TEXT_500
  if (nuance === 700) return TW_COLOR_TEXT_700

  null
}

const getBgTwColors = (nuance: Nuance) => {
  if (nuance === 100) return TW_COLOR_BG_100
  if (nuance === 400) return TW_COLOR_BG_400
  if (nuance === 500) return TW_COLOR_BG_500
  if (nuance === 700) return TW_COLOR_BG_700
  null
}

const getBorderTwColors = (nuance: Nuance) => {
  if (nuance === 100) return TW_COLOR_BORDER_100
  if (nuance === 400) return TW_COLOR_BORDER_400
  if (nuance === 500) return TW_COLOR_BORDER_500
  if (nuance === 700) return TW_COLOR_BORDER_700
  null
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

export const getTwColor = (colorType: ColorType = 'text', color: TwColor = 'gray', nuance: Nuance = 400) => {
  if (colorType === 'text') return getTwTextColor(nuance, color)
  if (colorType === 'bg') return getTwBgColor(nuance, color)
  if (colorType === 'border') return getTwBorderColor(nuance, color)
}
