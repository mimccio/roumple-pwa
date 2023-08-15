import { useTranslation } from 'react-i18next'
import { endOfWeek, format, startOfWeek } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { getDateFnsLocale } from '&/common/utils'

export function useActionDateText() {
  const { t } = useTranslation('schedule')

  const getDayDateText = (date: Date) => format(date, 'EEEE dd MMM yyyy', { locale: getDateFnsLocale() })

  const getWeekDateText = (date: Date) => {
    const start = format(startOfWeek(date), 'dd MMM')
    const end = format(endOfWeek(date), 'dd MMM yy')
    return `${start} - ${end}`
  }

  const getMonthDateText = (date: Date) => format(date, 'MMMM yyyy')

  const getDateText = ({ date, scheduleType }: { date: Date | null; scheduleType: ScheduleType }) => {
    if (!date) return t('noSchedule')
    const dateToFormat = new Date(date)
    if (scheduleType === SCHEDULE_TYPES.daily) return getDayDateText(dateToFormat)
    if (scheduleType === SCHEDULE_TYPES.weekly) return getWeekDateText(dateToFormat)
    if (scheduleType === SCHEDULE_TYPES.monthly) return getMonthDateText(dateToFormat)
  }

  return { getDateText, getDayDateText, getWeekDateText, getMonthDateText }
}
