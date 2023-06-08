import { Listbox } from '@headlessui/react'
import { TagIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import type { Category } from '&/modules/category/types'
import { TW_COLOR_TEXT_500 } from '&/common/constants'

interface Props {
  category?: Category | null
  isLoading: boolean
  isError: boolean
}

export function CategoryBtn({ isLoading, isError, category }: Props) {
  const color = category?.color ? TW_COLOR_TEXT_500[category.color] : 'text-gray-300'

  return (
    <Listbox.Button
      className={cl(
        'group relative cursor-pointer rounded-md border-transparent py-1.5 text-left transition-colors',
        isLoading && 'cursor-wait',
        isError && 'cursor-not-allowed'
      )}
    >
      <span className="flex items-center">
        <TagIcon height={16} width={16} className={color} />

        <span className="ml-3 block truncate font-semibold text-gray-500 transition-colors group-hover:text-gray-600">
          {category?.name || (isLoading ? '' : isError ? 'Error' : 'no category')}
        </span>
      </span>
    </Listbox.Button>
  )
}
