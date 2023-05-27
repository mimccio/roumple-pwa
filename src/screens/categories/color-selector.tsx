import type { RefObject } from 'react'
import { ColorItem } from './color-item'

const colorList = [
  'gray',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]

interface Props {
  selectedColor: string
  onSelectColor: (color: string) => void
  popperRef: RefObject<HTMLDivElement>
}

export function ColorSelector({ onSelectColor, popperRef, selectedColor }: Props) {
  return (
    <div
      ref={popperRef}
      className="absolute -top-2 left-10 z-10 flex w-72 max-w-md flex-wrap gap-4 rounded-md bg-gray-100 p-2 shadow-sm"
    >
      {colorList.map((color) => (
        <ColorItem key={color} color={color} selected={selectedColor === color} onSelectColor={onSelectColor} />
      ))}
    </div>
  )
}
