import type { RefObject } from 'react'

import { TW_COLOR_LIST } from '&/common/constants'
import type { TwColor } from '&/common/types'
import { ColorItem } from './color-item'

interface Props {
  selectedColor: string
  onSelectColor: (color: TwColor) => void
  popperRef: RefObject<HTMLDivElement>
}

export function ColorSelector({ onSelectColor, popperRef, selectedColor }: Props) {
  return (
    <div
      ref={popperRef}
      className="absolute -top-2 left-12 z-10 flex w-72 max-w-md flex-wrap gap-4 rounded-md bg-gray-100 p-2 shadow-md"
    >
      {TW_COLOR_LIST.map((color) => (
        <ColorItem key={color} color={color} selected={selectedColor === color} onSelectColor={onSelectColor} />
      ))}
    </div>
  )
}
