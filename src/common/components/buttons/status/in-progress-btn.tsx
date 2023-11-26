import { useTranslation } from 'react-i18next'
import { ChartBarIcon } from '@heroicons/react/24/solid'
import { cl } from '&/common/utils'
import { Tooltip } from '&/common/components/tooltip'

interface Props {
  handleClick: () => void
  isSelected: boolean
}

export function InProgressBtn({ handleClick, isSelected }: Props) {
  const { t } = useTranslation('status')
  return (
    <Tooltip message={t('inProgress')}>
      <button
        disabled={isSelected}
        className={cl(
          'group flex h-10 w-10 items-center justify-center rounded-md border transition-colors disabled:cursor-default ',
          isSelected ? 'border-gray-200 bg-white' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
        )}
        onClick={handleClick}
      >
        <div
          className={cl(
            'group flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-dotted transition-colors ',
            isSelected ? 'border-green-500 ' : 'border-gray-400 '
          )}
        >
          <ChartBarIcon
            width={14}
            height={14}
            className={cl('transition-colors ', isSelected ? 'text-green-500 ' : 'text-gray-400 ')}
          />
        </div>
      </button>
    </Tooltip>
  )
}
