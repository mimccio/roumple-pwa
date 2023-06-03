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
        className={cl('group rounded-md bg-gray-50 p-1 transition-colors', isSelected ? '' : 'hover:bg-green-100')}
        onClick={handleClick}
      >
        <div
          className={cl(
            'group flex h-7 w-7 items-center justify-center rounded-full border-[3px] transition-colors',
            isSelected ? 'border-green-500' : 'border-gray-400'
          )}
        >
          <CheckIcon
            width={18}
            height={18}
            className={cl('transition-colors ', isSelected ? 'text-green-500' : 'text-gray-400')}
          />
        </div>
      </button>
    </Tooltip>
  )
}
