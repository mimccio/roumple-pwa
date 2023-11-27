import type { ElementType } from 'react'
import { Menu } from '@headlessui/react'

import { TW_COLOR_TEXT_400 } from '@/common/constants/tw-colors'
import { cl } from '@/common/utils'

interface Props {
  handleClick: () => void
  children: string
  Icon: ElementType
  color?: string
}

export function MenuBtn({ handleClick, children, Icon, color = TW_COLOR_TEXT_400.gray }: Props) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={handleClick}
          className={cl(
            'flex w-full items-center gap-4',
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm'
          )}
        >
          <Icon className={cl('mr-2 h-4', color)} />
          {children}
        </button>
      )}
    </Menu.Item>
  )
}
