import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid'

import { cl } from '&/common/utils'
import { Tooltip } from '&/common/components/tooltip'

interface Props {
  handleClick: () => void
  isSelected: boolean
}

export function TodoBtn({ handleClick, isSelected }: Props) {
  return (
    <Tooltip message="reset">
      <button
        onClick={handleClick}
        className={cl(
          'group flex h-7 w-7 items-center justify-center rounded-full border-[3px] transition-colors ',
          isSelected ? 'border-gray-500 hover:border-gray-400' : 'border-gray-400 hover:border-gray-500'
        )}
      >
        <ArrowUturnLeftIcon
          width={12}
          height={12}
          className={cl(
            'transition-colors ',
            isSelected ? 'text-gray-500 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-500'
          )}
        />
      </button>
    </Tooltip>
  )
}
