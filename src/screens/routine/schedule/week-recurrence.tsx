import type { FormEvent } from 'react'
import type { ScheduleType } from '&/modules/routine/types'
import { cl } from '&/common/utils'
import { WEEKLY } from '&/modules/routine/constants'

interface Props {
  children: string
  isSelected: boolean
  handleChange: ({ scheduleType, recurrenceNum }: { scheduleType: ScheduleType; recurrenceNum: number }) => void
  value: number
}

export function WeekRecurrence({ children, isSelected, handleChange, value }: Props) {
  const onChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault()
    handleChange({ scheduleType: WEEKLY, recurrenceNum: value })
  }

  return (
    <label
      className={cl(
        'flex h-5 w-11 cursor-pointer items-center justify-center rounded-md text-xs font-semibold transition-colors',
        isSelected
          ? 'bg-sky-500 text-white hover:bg-sky-400'
          : 'border-2 border-gray-400 text-gray-400 hover:border-sky-400 hover:text-sky-400'
      )}
    >
      <input className="hidden" type="checkbox" checked={isSelected} onChange={onChange} />

      {children}
    </label>
  )
}
