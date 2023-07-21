import { useTranslation } from 'react-i18next'
import fatalErrorImg from '&/assets/illustrations/fatal-error.png'

export function CategoriesError() {
  const { t } = useTranslation('error')

  return (
    <div className="mb-20 flex flex-col items-center justify-center gap-4 py-8">
      <img src={fatalErrorImg} className="mx-auto flex h-52 w-52 items-center justify-center opacity-25" />
      <p className={'text-center text-sm font-semibold text-gray-400'}>{t('anErrorOcurred')}</p>
    </div>
  )
}
