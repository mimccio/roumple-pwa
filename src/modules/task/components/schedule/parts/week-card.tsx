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
}

export function WeekCard({ period, onSelectPeriod, isSelected }: Props) {
  const { t } = useTranslation('schedule')

  const handlePeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    onSelectPeriod({ scheduleType: SCHEDULE_TYPES.weekly, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 border-sky-200 p-2 transition-colors md:px-4',
        isSelected && `bg-sky-100 shadow-md shadow-sky-300/20`
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute -bottom-2 right-4 text-sky-200" />}

      <div className="grid grid-cols-6">
        <div className="col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={handlePeriodChange}
            id="week"
            type={SCHEDULE_TYPES.weekly}
            value={1}
          >
            {t('period.week.duringWeek')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 2}
            handleChange={handlePeriodChange}
            id="weekend"
            type={SCHEDULE_TYPES.weekly}
            value={2}
          >
            {t('period.week.weekend')}
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
