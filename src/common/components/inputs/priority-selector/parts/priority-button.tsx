import { cl, getPriorityTWTextColor } from '&/common/utils'
import { Menu } from '@headlessui/react'
import { FlagIcon } from '@heroicons/react/24/solid'

interface Props {
  priority: number
}

export function PriorityButton({ priority }: Props) {
  const color = getPriorityTWTextColor(priority)

  return (
    <Menu.Button className="group flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-gray-50 hover:shadow-md">
      <FlagIcon className={cl('transition-colors', color)} width={20} />
    </Menu.Button>
  )
}
