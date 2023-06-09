import type { ElementType } from 'react'
import { Listbox } from '@headlessui/react'

import { cl } from '&/common/utils'

interface Props {
  item?: { id: string; name: string } | null
  isLoading: boolean
  isError: boolean
  Icon?: ElementType
  defaultName?: string
}

export function SelectorBtn({ isLoading, isError, item, Icon, defaultName = 'none' }: Props) {
  return (
    <Listbox.Button
      className={cl(
        'group relative cursor-pointer rounded-md py-1.5 text-left transition-colors',
        isLoading && 'cursor-wait',
        isError && 'cursor-not-allowed'
      )}
    >
      <span className="flex items-center">
        {Icon && <Icon height={16} width={16} className="text-gray-300" />}

        <span
          className={cl(
            'ml-3 block truncate font-semibold transition-colors ',
            item?.id ? 'text-gray-500 group-hover:text-gray-600' : 'text-gray-300 group-hover:text-gray-400'
          )}
        >
          {item?.name || (isLoading ? '' : isError ? 'Error' : defaultName)}
        </span>
      </span>
    </Listbox.Button>
  )
}
