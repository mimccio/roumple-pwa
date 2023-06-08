import type { ElementType } from 'react'
import { Listbox } from '@headlessui/react'

import { cl } from '&/common/utils'

interface Props {
  item?: { id: string; name: string } | null
  isLoading: boolean
  isError: boolean
  Icon?: ElementType
}

export function SelectorBtn({ isLoading, isError, item, Icon }: Props) {
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

        <span className="ml-3 block truncate font-semibold text-gray-500 transition-colors group-hover:text-gray-600">
          {item?.name || (isLoading ? '' : isError ? 'Error' : 'none')}
        </span>
      </span>
    </Listbox.Button>
  )
}
