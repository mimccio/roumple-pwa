import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon, TagIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import type { Category } from '&/modules/category/types'
import { TW_COLOR_TEXT_500 } from '&/common/constants'

interface Props {
  category: Category | null
  isLoading: boolean
  isError: boolean
}

export function CategoryBtn({ isLoading, isError, category }: Props) {
  const color = category?.color ? TW_COLOR_TEXT_500[category.color] : 'text-gray-300'

  return (
    <Listbox.Button
      className={cl(
        'group relative w-full cursor-pointer rounded-md border-transparent px-2 py-1.5 text-left transition-colors hover:bg-gray-50 hover:shadow-md',
        isLoading && 'cursor-wait',
        isError && 'cursor-not-allowed'
      )}
    >
      <span className="flex items-center">
        <TagIcon height={16} width={16} className={color} />

        <span className="ml-3 block truncate font-semibold text-gray-500">
          {category?.name || (isLoading ? '' : isError ? 'Error' : 'no category')}
        </span>
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon
          className="h-5 w-5 text-transparent transition-colors group-hover:text-gray-400"
          aria-hidden="true"
        />
      </span>
    </Listbox.Button>
  )
}
