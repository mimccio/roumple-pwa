import { ChartBarIcon } from '@heroicons/react/24/solid'
import { cl } from '&/common/utils'
import { Tooltip } from '&/common/components/tooltip'

interface Props {
  handleClick: () => void
  isSelected: boolean
}

export function InProgressBtn({ handleClick, isSelected }: Props) {
  return (
    <Tooltip message="in progress">
      <button
        className={cl('group rounded-md p-1', isSelected ? 'bg-green-100' : 'bg-gray-50 hover:bg-green-50')}
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
