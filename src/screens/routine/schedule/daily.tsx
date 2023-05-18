import type { FormEvent } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import { DayCircle } from './day-circle'
import { PeriodItem } from './period-item'

type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY'

interface Props {
  recurrence: boolean[]
  period: number
  handlePeriodChange: ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => void
  handleRecurrenceChange: (index: number) => void
  type: ScheduleType
}

export function Daily({ recurrence, period, handlePeriodChange, type, handleRecurrenceChange }: Props) {
  const isSelected = type === 'DAILY'

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: 'DAILY', period: Number(evt.currentTarget.value) })
  }

  return (
    <div className={cl('relative rounded-lg p-8', isSelected && 'bg-indigo-100')}>
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 text-indigo-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-indigo-700 ">Daily</h4>
        <div className="col-span-4 flex gap-2">
          <DayCircle index={1} handleChange={handleRecurrenceChange} isSelected={recurrence[1]} day="m" />
          <DayCircle index={2} handleChange={handleRecurrenceChange} isSelected={recurrence[2]} day="t" />
          <DayCircle index={3} handleChange={handleRecurrenceChange} isSelected={recurrence[3]} day="w" />
          <DayCircle index={4} handleChange={handleRecurrenceChange} isSelected={recurrence[4]} day="t" />
          <DayCircle index={5} handleChange={handleRecurrenceChange} isSelected={recurrence[5]} day="f" />
          <DayCircle index={6} handleChange={handleRecurrenceChange} isSelected={recurrence[6]} day="s" />
          <DayCircle index={0} handleChange={handleRecurrenceChange} isSelected={recurrence[0]} day="s" />
        </div>
      </div>
      <div className="z-10 mt-8 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">Period</h5>
        <div className="col-span-4">
          <PeriodItem handleChange={onPeriodChange} checked={period === 1} value={1} id="morning">
            in the morning
          </PeriodItem>
          <PeriodItem handleChange={onPeriodChange} checked={period === 2} value={2} id="morning">
            during lunch time
          </PeriodItem>
          <PeriodItem handleChange={onPeriodChange} checked={period === 3 || period === 0} value={3} id="morning">
            during the day
          </PeriodItem>
          <PeriodItem handleChange={onPeriodChange} checked={period === 4} value={4} id="morning">
            in the evening
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
