import { useTranslation } from 'react-i18next'

export function DaysHeader() {
  const { t } = useTranslation('schedule')

  return (
    <>
      <div className="grid grid-cols-7 border-b py-2 text-center text-xs capitalize leading-6 text-gray-500 lg:hidden">
        <div>{t('days.1').slice(0, 1)}</div>
        <div>{t('days.2').slice(0, 1)}</div>
        <div>{t('days.3').slice(0, 1)}</div>
        <div>{t('days.4').slice(0, 1)}</div>
        <div>{t('days.5').slice(0, 1)}</div>
        <div>{t('days.6').slice(0, 1)}</div>
        <div>{t('days.7').slice(0, 1)}</div>
      </div>
      <div className="hidden border-b py-2 text-center text-xs capitalize leading-6 text-gray-500 lg:grid lg:grid-cols-7">
        <div>{t('days.1')}</div>
        <div>{t('days.2')}</div>
        <div>{t('days.3')}</div>
        <div>{t('days.4')}</div>
        <div>{t('days.5')}</div>
        <div>{t('days.6')}</div>
        <div>{t('days.7')}</div>
      </div>
    </>
  )
}
