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
        onClick={handleClick}
        className={cl(
          'group flex h-7 w-7 items-center justify-center rounded-full border-[3px] transition-colors hover:border-green-300',
          isSelected ? 'border-green-500' : 'border-gray-400'
        )}
      >
        <CheckIcon
          width={18}
          height={18}
          className={cl(
            'transition-colors ',
            isSelected ? 'text-green-500 group-hover:text-green-400' : 'text-gray-300 group-hover:text-green-300'
          )}
        />
      </button>
    </Tooltip>
  )
}
