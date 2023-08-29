import { useTranslation } from 'react-i18next'

import { SCHEDULE_TYPES } from '&/common/constants'
import { BoardScreen } from './board-screen'

const scheduleType = SCHEDULE_TYPES.daily

export function Today() {
  const { t } = useTranslation('schedule')

  return <BoardScreen title={t('today')} scheduleType={scheduleType} />
}
