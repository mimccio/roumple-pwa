import { useTranslation } from 'react-i18next'

import type { ScheduleType } from '../types'
import { SCHEDULE_TYPES } from '../constants'

export function usePeriodText() {
  const { t } = useTranslation('schedule')

  const getPeriodText = ({ type, period }: { type: ScheduleType; period: number }) => {
    if (type === SCHEDULE_TYPES.daily) {
      if (period === 1) return t('period.day.morning')
      if (period === 2) return t('period.day.lunchTime')
      if (period === 3 || period === 0) return t('period.day.duringDay')
      if (period === 4) return t('period.day.evening')
    }

    if (type === SCHEDULE_TYPES.weekly) {
      if (period === 1 || period === 0) return t('period.week.duringWeek')
      if (period === 2) return t('period.week.weekend')
    }

    if (type === SCHEDULE_TYPES.monthly) {
      if (period === 1) return t('period.month.start')
      if (period === 2 || period === 0) return t('period.month.duringMonth')
      if (period === 3) return t('period.month.end')
    }
  }

  return { getPeriodText }
}
