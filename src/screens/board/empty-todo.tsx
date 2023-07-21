import { useTranslation } from 'react-i18next'
import orderCompletedImg from '&/assets/illustrations/order-completed.png'

export function EmptyTodo() {
  const { t } = useTranslation('empty')

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="group mb-20 flex w-full flex-col items-center justify-center gap-4 py-8">
        <img src={orderCompletedImg} className="mx-auto flex h-52 w-52 items-center justify-center opacity-25" />
        <p className="text-center text-sm font-semibold text-gray-200">{t('emptyTodo')}</p>
      </div>
    </div>
  )
}
