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
      <button className="group rounded-md bg-gray-50 p-1 hover:bg-gray-100" onClick={handleClick}>
        <div
          className={cl(
            'flex h-7 w-7 items-center justify-center rounded-full border-[3px] transition-colors ',
            isSelected ? 'border-gray-500 ' : 'border-gray-400 '
          )}
        >
          <ArrowUturnLeftIcon
            width={12}
            height={12}
            className={cl('transition-colors ', isSelected ? 'text-gray-500 ' : 'text-gray-400')}
          />
        </div>
      </button>
    </Tooltip>
  )
}
