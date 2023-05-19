import type { FormEvent } from 'react'
import { cl } from '&/common/utils'
import { ScheduleType } from '&/modules/routine/types'
import { DAILY } from '&/modules/routine/constants'

interface Props {
  day: string
  isSelected: boolean
  handleChange: ({ scheduleType, recurrenceNum }: { scheduleType: ScheduleType; recurrenceNum: number }) => void
  value: number
}

export function DayCircle({ day, isSelected, handleChange, value }: Props) {
  const onChange = (evt: FormEvent<HTMLInputElement>) => {
    console.log('evt :', evt)
    evt.preventDefault()
    handleChange({ scheduleType: DAILY, recurrenceNum: value })
  }

  return (
    <label
      className={cl(
        'flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-xs font-semibold transition-colors',
        isSelected
          ? 'bg-indigo-500 text-white hover:bg-indigo-400'
          : 'border-2 border-gray-400 text-gray-400 hover:border-indigo-400 hover:text-indigo-400'
      )}
    >
      <input className="hidden" type="checkbox" checked={isSelected} onChange={onChange} />
      {day}
    </label>
  )
}
