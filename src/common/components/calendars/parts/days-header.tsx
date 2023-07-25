import { useTranslation } from 'react-i18next'

export function DaysHeader() {
  const { t } = useTranslation('schedule')

  return (
    <div className="grid grid-cols-7 text-center text-xs capitalize leading-6 text-gray-500">
      <div>{t('days.1')}</div>
      <div>{t('days.2')}</div>
      <div>{t('days.3')}</div>
      <div>{t('days.4')}</div>
      <div>{t('days.5')}</div>
      <div>{t('days.6')}</div>
      <div>{t('days.7')}</div>
    </div>
  )
}
