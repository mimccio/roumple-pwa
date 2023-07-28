import { useTranslation } from 'react-i18next'

import type { ScheduleType } from '../types'
import { SCHEDULE_TYPES } from '../constants'

export function useOccurrenceTypeText(type: ScheduleType) {
  const { t } = useTranslation('schedule')

  if (type === SCHEDULE_TYPES.weekly) return t('week', { ns: 'schedule' })
  if (type === SCHEDULE_TYPES.monthly) return t('month', { ns: 'schedule' })
  return t('day', { ns: 'schedule' })
}
