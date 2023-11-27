import { useTranslation } from 'react-i18next'
import { CheckIcon } from '@heroicons/react/20/solid'
import { cl } from '@/common/utils'
import { Tooltip } from '@/common/components/tooltip'

interface Props {
  handleClick: () => void
  isSelected: boolean
  showCheck?: boolean
}

export function DoneBtn({ handleClick, isSelected, showCheck }: Props) {
  const { t } = useTranslation('status')
  return (
    <Tooltip message={t('done')}>
      <button
        disabled={isSelected}
        className={cl(
          'group flex h-10 w-10 items-center justify-center rounded-md border transition-colors disabled:cursor-default',
          isSelected ? ' border-green-400 bg-green-400' : 'border-transparent hover:border-green-400 hover:bg-green-300'
        )}
        onClick={handleClick}
      >
        <div
          className={cl(
            'group flex h-7 w-7 items-center justify-center rounded-full border-[3px] transition-colors',
            isSelected ? 'border-white' : 'border-gray-400 group-hover:border-gray-100'
          )}
        >
          {showCheck && (
            <CheckIcon
              width={18}
              height={18}
              className={cl(
                'transition-colors ',
                isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-100'
              )}
            />
          )}
          {!showCheck && (
            <span
              className={cl(
                'text text-xs font-semibold transition-colors',
                isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-100'
              )}
            >
              +1
            </span>
          )}
        </div>
      </button>
    </Tooltip>
  )
}
