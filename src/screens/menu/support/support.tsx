import { useTranslation } from 'react-i18next'

export function Support() {
  const { t } = useTranslation('feedback')

  return (
    <div className="-mx-4 mt-2 border-t bg-indigo-50 font-semibold text-gray-500">
      <a
        className="-ml-2 flex items-center justify-center py-4 hover:text-gray-600"
        target="_blank"
        rel="noreferrer"
        href="https://www.buymeacoffee.com/roumple"
      >
        ☕ {t('byMeACoffee')}
      </a>
    </div>
  )
}
