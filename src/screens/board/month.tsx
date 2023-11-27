import { useTranslation } from 'react-i18next'

import { SCHEDULE_TYPES } from '@/common/constants'
import { BoardScreen } from './board-screen'

const scheduleType = SCHEDULE_TYPES.monthly

export function Month() {
  const { t } = useTranslation('schedule')

  return <BoardScreen title={t('thisMonth')} scheduleType={scheduleType} />
}
