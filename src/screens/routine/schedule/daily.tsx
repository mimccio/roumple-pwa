import type { FormEvent } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import { DayCircle } from './day-circle'
import { PeriodItem } from './period-item'

type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY'

interface Props {
  recurrence: number[]
  period: number
  handlePeriodChange: ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => void
  handleRecurrenceChange: ({
    scheduleType,
    recurrenceNum,
  }: {
    scheduleType: ScheduleType
    recurrenceNum: number
  }) => void
  type: ScheduleType
}

export function Daily({ recurrence, period, handlePeriodChange, type, handleRecurrenceChange }: Props) {
  const isSelected = type === 'DAILY'

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: 'DAILY', period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 p-8',
        isSelected ? 'border-transparent bg-indigo-100' : 'border-indigo-200'
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 text-indigo-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-indigo-700 ">Daily</h4>
        <div className="col-span-4 flex gap-2">
          <DayCircle value={1} handleChange={handleRecurrenceChange} isSelected={recurrence.includes(1)} day="m" />
          <DayCircle value={2} handleChange={handleRecurrenceChange} isSelected={recurrence.includes(2)} day="t" />
          <DayCircle value={3} handleChange={handleRecurrenceChange} isSelected={recurrence.includes(3)} day="w" />
          <DayCircle value={4} handleChange={handleRecurrenceChange} isSelected={recurrence.includes(4)} day="t" />
          <DayCircle value={5} handleChange={handleRecurrenceChange} isSelected={recurrence.includes(5)} day="f" />
          <DayCircle value={6} handleChange={handleRecurrenceChange} isSelected={recurrence.includes(6)} day="s" />
          <DayCircle value={0} handleChange={handleRecurrenceChange} isSelected={recurrence.includes(0)} day="s" />
        </div>
      </div>
      <div className="z-10 mt-8 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">Period</h5>
        <div className="col-span-4">
          <PeriodItem handleChange={onPeriodChange} checked={isSelected && period === 1} value={1} id="morning">
            in the morning
          </PeriodItem>
          <PeriodItem handleChange={onPeriodChange} checked={isSelected && period === 2} value={2} id="morning">
            during lunch time
          </PeriodItem>
          <PeriodItem
            handleChange={onPeriodChange}
            checked={isSelected && (period === 3 || period === 0)}
            value={3}
            id="morning"
          >
            during the day
          </PeriodItem>
          <PeriodItem handleChange={onPeriodChange} checked={isSelected && period === 4} value={4} id="morning">
            in the evening
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
