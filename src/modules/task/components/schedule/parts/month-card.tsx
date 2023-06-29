import type { FormEvent } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'
import { PeriodItem } from '&/common/components/schedule'
import type { ScheduleType } from '&/modules/routine/types'

interface Props {
  period: number
  isSelected: boolean
  onSelectPeriod: ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => void
}

export function MonthCard({ period, onSelectPeriod, isSelected }: Props) {
  const handlePeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    onSelectPeriod({ scheduleType: SCHEDULE_TYPES.monthly, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 border-purple-200 p-2 transition-colors md:px-4',
        isSelected && ` bg-purple-100 shadow-md shadow-purple-300/20`
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-0 right-4 text-purple-200" />}

      <div className="grid grid-cols-6">
        <div className="col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={handlePeriodChange}
            id="start-of-month"
            type={SCHEDULE_TYPES.monthly}
            value={1}
          >
            at the start of the month
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 2}
            handleChange={handlePeriodChange}
            id="during-month"
            type={SCHEDULE_TYPES.monthly}
            value={2}
          >
            during the month
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 3}
            handleChange={handlePeriodChange}
            id="end-of-month"
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
