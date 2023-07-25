import { useTranslation } from 'react-i18next'

import { cl, getDateFnsLocale } from '&/common/utils'
import { format } from 'date-fns'

interface Props {
  createdAt?: Date
}

export function CreatedAt({ createdAt }: Props) {
  const { t } = useTranslation('schedule')
  const displayedDate = createdAt ? format(new Date(createdAt), 'd MMMM yyyy', { locale: getDateFnsLocale() }) : null

  return (
    <p className={cl('text-right text-xs text-gray-300', !displayedDate && 'opacity-0')}>
      {t('createdOn')} {displayedDate}
    </p>
  )
}
