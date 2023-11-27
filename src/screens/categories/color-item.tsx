import type { TwColor } from '@/common/types'
import { TW_COLOR_BG_500, TW_COLOR_LIST } from '@/common/constants'
import { cl } from '@/common/utils'

interface Props {
  color: string
  selected?: boolean
  onSelectColor: (color: TwColor) => void
}

export function ColorItem({ color, selected = false, onSelectColor }: Props) {
  let currentColor = 'gray' as TwColor
  if (TW_COLOR_LIST.includes(color)) currentColor = color as TwColor

  return (
    <button
      onClick={() => onSelectColor(currentColor)}
      className={cl(
        'h-4 w-4 rounded-full border-4',
        TW_COLOR_BG_500[currentColor],
        selected ? 'border-white' : 'border-transparent transition-colors hover:border-gray-300'
      )}
    />
  )
}
