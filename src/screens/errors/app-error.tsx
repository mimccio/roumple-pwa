import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import fatalErrorImg from '&/assets/illustrations/fatal-error.png'

export function AppError() {
  const { t } = useTranslation('error')
  return (
    <div className="flex h-full min-h-screen w-full  flex-col items-center justify-center">
      <div className="group mb-20 flex w-full flex-col items-center justify-center gap-4 py-8">
        <img src={fatalErrorImg} className="mx-auto flex h-52 w-52 items-center justify-center opacity-50" />
        <p className="text-center text-sm font-semibold text-gray-400">{t('sorryErrorOcurred')}</p>
        <Link className="mt-4 text-gray-400 transition-colors hover:text-indigo-500" to="/">
          {t('backHome')}
        </Link>
      </div>
    </div>
  )
}
