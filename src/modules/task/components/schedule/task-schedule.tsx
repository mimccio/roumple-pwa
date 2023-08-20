import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarDaysIcon } from '@heroicons/react/24/solid'
import { startOfToday } from 'date-fns'

import { SCHEDULE_TYPES } from '&/common/constants'
import { TaskScheduleType } from '../../types'
import { DayCard, MonthCard, WeekCard, DayDateBtn, WeekDateBtn, MonthDateBtn } from './parts'

interface Props {
  scheduleType: TaskScheduleType
  period: number
  onSelectDate: (date: Date | null) => void
  date: Date | null
  onSelectPeriod: ({ scheduleType, period }: { scheduleType: TaskScheduleType; period: number }) => void
}

export function TaskSchedule({ scheduleType, period, onSelectDate, date, onSelectPeriod }: Props) {
  const { t } = useTranslation('schedule')
  const [showPreciseSchedule, setShowPreciseSchedule] = useState(Boolean(date))

  const setSchedule = () => {
    onSelectPeriod({ scheduleType: SCHEDULE_TYPES.daily, period: 3 })
    onSelectDate(startOfToday())
    setShowPreciseSchedule((prevState) => !prevState)
  }

  const removeSchedule = () => {
    onSelectPeriod({ scheduleType: null, period: 0 })
    onSelectDate(null)
    setShowPreciseSchedule((prevState) => !prevState)
  }

  const toggleSchedule = () => {
    if (!showPreciseSchedule) {
      setSchedule()
    } else {
      removeSchedule()
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-400">{t('schedule')}</span>

        <button onClick={toggleSchedule} className="p-1">
          <CalendarDaysIcon height={20} className="text-gray-500 transition-colors hover:text-gray-600" />
        </button>
      </div>
      {!showPreciseSchedule && <p className="text-sm text-gray-500">{t('noSchedule')}</p>}
      {showPreciseSchedule && date && (
        <>
          <div className="mb-4">
            {scheduleType === SCHEDULE_TYPES.daily && <DayDateBtn date={date} onSelectDate={onSelectDate} />}
            {scheduleType === SCHEDULE_TYPES.weekly && <WeekDateBtn date={date} onSelectDate={onSelectDate} />}
            {scheduleType === SCHEDULE_TYPES.monthly && <MonthDateBtn date={date} onSelectDate={onSelectDate} />}
          </div>

          <DayCard
            period={period}
            isSelected={scheduleType === SCHEDULE_TYPES.daily}
            onSelectPeriod={onSelectPeriod}
            date={date}
            onSelectDate={onSelectDate}
          />
          <WeekCard
            period={period}
            isSelected={scheduleType === SCHEDULE_TYPES.weekly}
            onSelectPeriod={onSelectPeriod}
          />
          <MonthCard
            period={period}
            isSelected={scheduleType === SCHEDULE_TYPES.monthly}
            onSelectPeriod={onSelectPeriod}
          />
        </>
      )}
    </div>
  )
}
