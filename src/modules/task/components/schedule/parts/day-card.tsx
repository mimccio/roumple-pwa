import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckIcon } from '@heroicons/react/24/solid'

import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'
import { PeriodItem } from '&/common/components/schedule'

interface Props {
  period: number
  isSelected: boolean
  onSelectPeriod: ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => void
  onSelectDate: (date: Date) => void
  date: Date | null
}

export function DayCard({ period, onSelectPeriod, isSelected }: Props) {
  const { t } = useTranslation('schedule')

  const handlePeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    onSelectPeriod({ scheduleType: SCHEDULE_TYPES.daily, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 border-indigo-200 p-2 transition-colors md:px-4',
        isSelected && `bg-indigo-100 shadow-md shadow-indigo-300/20`
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 text-indigo-200" />}

      <div className="grid grid-cols-6">
        <div className="col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={handlePeriodChange}
            id="morning"
            type={SCHEDULE_TYPES.daily}
            value={1}
          >
            {t('period.day.morning')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 2}
            handleChange={handlePeriodChange}
            id="lunch"
            type={SCHEDULE_TYPES.daily}
            value={2}
          >
            {t('period.day.lunchTime')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && (period === 3 || period === 0)}
            handleChange={handlePeriodChange}
            id="day"
            type={SCHEDULE_TYPES.daily}
            value={3}
          >
            {t('period.day.duringDay')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 4}
            handleChange={handlePeriodChange}
            id="evening"
            type={SCHEDULE_TYPES.daily}
            value={4}
          >
            {t('period.day.evening')}
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
