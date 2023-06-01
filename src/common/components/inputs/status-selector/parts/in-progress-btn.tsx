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
        onClick={handleClick}
        className={cl(
          'group flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-dotted transition-colors ',
          isSelected ? 'border-green-500 hover:border-green-400' : 'border-gray-400 hover:border-green-300'
        )}
      >
        <ChartBarIcon
          width={14}
          height={14}
          className={cl(
            'transition-colors ',
            isSelected ? 'text-green-400 group-hover:text-green-500' : 'text-gray-300 group-hover:text-green-300'
          )}
        />
      </button>
    </Tooltip>
  )
}
