import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import { cl } from '&/common/utils'
import { useGetDateFnsLocale } from '&/common/hooks'

interface Props {
  createdAt?: Date
}

export function CreatedAt({ createdAt }: Props) {
  const { t } = useTranslation('schedule')
  const { locale } = useGetDateFnsLocale()

  const displayedDate = createdAt ? format(new Date(createdAt), 'd MMMM yyyy', { locale }) : null

  return (
    <p className={cl('text-right text-xs text-gray-300', !displayedDate && 'opacity-0')}>
      {t('createdOn')} {displayedDate}
    </p>
  )
}
