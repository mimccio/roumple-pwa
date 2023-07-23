import { useTranslation } from 'react-i18next'

interface Props {
  close: () => void
  onSubmit: () => void
  disabled: boolean
}

export function ActionSection({ close, onSubmit, disabled }: Props) {
  const { t } = useTranslation('action')

  const handleSubmit = () => {
    onSubmit()
    close()
  }

  return (
    <div className="mt-6 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
      <button
        disabled={disabled}
        type="button"
        className=" text-gra-700 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300 sm:col-start-2"
        onClick={handleSubmit}
      >
        {t('save')}
      </button>
      <button
        type="button"
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
        onClick={close}
      >
        {t('cancel')}
      </button>
    </div>
  )
}
