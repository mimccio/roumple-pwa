import { useTranslation } from 'react-i18next'
import {
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  isSameMonth,
  isSameWeek,
  isThisMonth,
  isThisWeek,
  isToday,
  isTomorrow,
  startOfToday,
  startOfWeek,
} from 'date-fns'

import { SCHEDULE_TYPES } from '@/common/constants'
import type { TaskScheduleType } from '../types'

export function useDateText() {
  const { t } = useTranslation('schedule')

  const getDayDateText = (date: Date) => {
    if (isToday(date)) return t('today')
    if (isTomorrow(date)) return t('tomorrow')
    return format(date, 'dd MMM yy')
  }

  const getWeekDateText = (date: Date) => {
    if (isThisWeek(date)) return t('thisWeek')
    if (isSameWeek(date, addWeeks(startOfToday(), 1))) return t('nextWeek')
    const start = format(startOfWeek(date), 'dd MMM')
    const end = format(endOfWeek(date), 'dd MMM yy')
    return `${start} - ${end}`
  }

  const getMonthDateText = (date: Date) => {
    if (isThisMonth(date)) return t('thisMonth')
    if (isSameMonth(date, addMonths(startOfToday(), 1))) return t('nextMonth')
    return format(date, 'MMMM yyyy')
  }

  const getDateText = ({ date, scheduleType }: { date: Date | null; scheduleType: TaskScheduleType }) => {
    if (!date) return t('noSchedule')
    const dateToFormat = new Date(date)
    if (scheduleType === SCHEDULE_TYPES.daily) return getDayDateText(dateToFormat)
    if (scheduleType === SCHEDULE_TYPES.weekly) return getWeekDateText(dateToFormat)
    if (scheduleType === SCHEDULE_TYPES.monthly) return getMonthDateText(dateToFormat)
  }

  return { getDateText, getDayDateText, getWeekDateText, getMonthDateText }
}
