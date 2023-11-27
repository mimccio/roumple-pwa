import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckIcon } from '@heroicons/react/24/solid'

import { SCHEDULE_TYPES } from '@/common/constants'
import { cl } from '@/common/utils'
import { PeriodItem } from '@/common/components/schedule'
import type { ScheduleType } from '@/common/types'

interface Props {
  period: number
  isSelected: boolean
  onSelectPeriod: ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => void
}

export function MonthCard({ period, onSelectPeriod, isSelected }: Props) {
  const { t } = useTranslation('schedule')

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
            scheduleType={SCHEDULE_TYPES.monthly}
            value={1}
          >
            {t('period.month.start')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 2}
            handleChange={handlePeriodChange}
            id="during-month"
            scheduleType={SCHEDULE_TYPES.monthly}
            value={2}
          >
            {t('period.month.duringMonth')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 3}
            handleChange={handlePeriodChange}
            id="end-of-month"
            scheduleType={SCHEDULE_TYPES.monthly}
            value={3}
          >
            {t('period.month.end')}
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
