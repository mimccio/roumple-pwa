import type { MouseEvent } from 'react'
import { cl } from '&/common/utils'

interface Props {
  day: string
  isSelected: boolean
  handleChange: (index: number) => void
  index: number
}

export function DayCircle({ day, isSelected, handleChange, index }: Props) {
  const onClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    handleChange(index)
  }

  return (
    <button
      onClick={onClick}
      className={cl(
        'flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-xs font-semibold transition-colors',
        isSelected
          ? 'bg-indigo-500 text-white hover:bg-indigo-400'
          : 'border-2 border-gray-400 text-gray-400 hover:border-indigo-400 hover:text-indigo-400'
      )}
    >
      {day}
    </button>
  )
}
