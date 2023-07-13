import type { FormEvent } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'
import type { ScheduleType } from '&/modules/routine/types'
import { PeriodItem } from './period-item'
import { MonthCircle } from './month-circle'

interface Props {
  type: ScheduleType
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
}

const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

export function Monthly({ recurrence, period, handlePeriodChange, type, handleRecurrenceChange }: Props) {
  const isSelected = type === SCHEDULE_TYPES.monthly

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: SCHEDULE_TYPES.monthly, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 p-4 transition-colors',
        isSelected ? 'border-transparent bg-purple-100  shadow-md shadow-purple-200' : 'border-purple-200'
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 z-0 text-purple-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-purple-700 ">Monthly</h4>
        <div className="col-span-4 flex flex-wrap gap-1">
          {months.map((month, index) => (
            <MonthCircle
              key={index}
              disabled={!isSelected}
              value={index}
              handleChange={handleRecurrenceChange}
              isSelected={isSelected && recurrence.includes(index)}
              month={month}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">Period</h5>
        <div className="z-10 col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={onPeriodChange}
            id="start"
            type={SCHEDULE_TYPES.monthly}
            value={1}
          >
            at the start of the month
          </PeriodItem>
          <PeriodItem
            checked={isSelected && (period === 2 || period === 0)}
            handleChange={onPeriodChange}
            id="month"
            type={SCHEDULE_TYPES.monthly}
            value={2}
          >
            during the month
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 3}
            handleChange={onPeriodChange}
            id="end"
            type={SCHEDULE_TYPES.monthly}
            value={3}
          >
            at the end of the month
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
