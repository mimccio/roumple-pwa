import { useTranslation } from 'react-i18next'
import { FlagIcon as FlagIconOutline } from '@heroicons/react/24/outline'
import { FlagIcon } from '@heroicons/react/24/solid'

interface Props {
  priority: number
  onSelect: (priority: number) => void
}

export function ModalePrioritySelector({ priority, onSelect }: Props) {
  const { t } = useTranslation('priority')

  return (
    <div className="w-full">
      <p className="mb-2 text-sm font-bold text-gray-400">{t('priority')}</p>
      <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-4">
        <button className="flex gap-2 p-2" onClick={() => onSelect(0)}>
          {!priority ? (
            <FlagIcon className="text-gray-400" width={20} />
          ) : (
            <FlagIconOutline className="text-gray-400" width={20} />
          )}
          <span className="text-sm  text-gray-400">{t('default')}</span>
        </button>

        <button className="flex gap-2 p-2" onClick={() => onSelect(1)}>
          {priority === 1 ? (
            <FlagIcon className="text-blue-500" width={20} />
          ) : (
            <FlagIconOutline className="text-blue-500" width={20} />
          )}
          <span className="text-sm  text-gray-400">{t('medium')}</span>
        </button>

        <button className="flex gap-2 p-2" onClick={() => onSelect(2)}>
          {priority === 2 ? (
            <FlagIcon className="text-orange-500" width={20} />
          ) : (
            <FlagIconOutline className="text-orange-500" width={20} />
          )}
          <span className="text-sm  text-gray-400">{t('hight')}</span>
        </button>
      </div>
    </div>
  )
}
