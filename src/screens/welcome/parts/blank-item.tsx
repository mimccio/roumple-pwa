import { useTranslation } from 'react-i18next'
import { DocumentIcon } from '@heroicons/react/24/outline'

import { useToggleOpen } from '@/common/hooks'
import { ConfirmStartBlankModale } from './confirm-start-blank-modale'

export function BlankItem() {
  const { t } = useTranslation('welcome')
  const { open, close, isOpen } = useToggleOpen()

  return (
    <div>
      <button
        onClick={open}
        className="relative flex h-72 w-96 flex-col rounded-lg border-2 bg-gray-50 p-4 shadow-md transition-all hover:shadow-lg"
      >
        <h3 className="text-center text-2xl font-semibold">{t('Start blank')}</h3>
        <div className="flex grow items-center justify-center">
          <DocumentIcon className="w-20 text-gray-400" />
        </div>
      </button>
      <ConfirmStartBlankModale close={close} isOpen={isOpen} />
    </div>
  )
}
