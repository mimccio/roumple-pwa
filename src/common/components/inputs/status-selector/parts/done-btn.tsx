import { CheckIcon } from '@heroicons/react/20/solid'
import { cl } from '&/common/utils'
import { Tooltip } from '&/common/components/tooltip'

interface Props {
  handleClick: () => void
  isSelected: boolean
}

export function DoneBtn({ handleClick, isSelected }: Props) {
  return (
    <Tooltip message="done">
      <button
        className={cl(
          'group flex h-10 w-10 items-center justify-center rounded-md transition-colors ',
          isSelected ? 'bg-green-400 shadow-md shadow-green-600 hover:bg-green-300' : 'hover:bg-gray-50 hover:shadow-md'
        )}
        onClick={handleClick}
      >
        <div
          className={cl(
            'group flex h-7 w-7 items-center justify-center rounded-full border-[3px] transition-colors',
            isSelected ? 'border-white' : 'border-gray-400'
          )}
        >
          <CheckIcon
            width={18}
            height={18}
            className={cl('transition-colors ', isSelected ? 'text-white' : 'text-gray-400')}
          />
        </div>
      </button>
    </Tooltip>
  )
}
