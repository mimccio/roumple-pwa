import { Menu } from '@headlessui/react'
import { cl, getPriorityTWTextColor } from '@/common/utils'
import { FlagIcon } from '@heroicons/react/24/solid'

interface Props {
  priority: number
  onSelect: (priority: number) => void
}

export function PriorityItem({ onSelect, priority }: Props) {
  const onClick = () => onSelect(priority)
  const color = getPriorityTWTextColor(priority)

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={cl(active && 'rounded-md bg-gray-200', 'flex h-8 w-8 items-center justify-center')}
        >
          <FlagIcon className={cl('transition-colors', color)} width={20} />
        </button>
      )}
    </Menu.Item>
  )
}
