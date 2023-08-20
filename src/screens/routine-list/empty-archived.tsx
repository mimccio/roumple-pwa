import { useTranslation } from 'react-i18next'
import locationImg from '&/assets/illustrations/location.png'

export function EmptyArchived() {
  const { t } = useTranslation('routine')
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="group mb-20 flex w-full flex-col items-center justify-center gap-4 py-8">
        <img src={locationImg} className="mx-auto flex h-52 w-52 items-center justify-center opacity-25" />
        <p className="text-center text-sm font-semibold text-gray-300">{t('noArchivedRoutine')}</p>
      </div>
    </div>
  )
}
