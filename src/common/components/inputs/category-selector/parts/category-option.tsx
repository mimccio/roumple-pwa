import { Listbox } from '@headlessui/react'
import { CheckIcon, TagIcon } from '@heroicons/react/24/solid'

import type { TwColor } from '&/common/types'
import { cl, getTWTextColor500 } from '&/common/utils'

interface CategoryOption {
  id: string | null
  name: string
  color?: TwColor
}

interface Props {
  category: CategoryOption
  selected: boolean
}

export function CategoryOption({ category, selected }: Props) {
  const color = category.color ? getTWTextColor500(category.color) : 'text-gray-300'

  return (
    <Listbox.Option
      key={category.id || 'none'}
      className={({ active }) =>
        cl(
          active ? 'bg-indigo-400 text-white' : 'text-gray-600',
          'relative cursor-default select-none py-2 pl-3 pr-9 transition-colors'
        )
      }
      value={category}
    >
      {({ active }) => (
        <>
          <div className="flex cursor-pointer items-center">
            <TagIcon height={14} width={14} className={color} />
            <span className={cl(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
              {category.name}
            </span>
          </div>

          {selected ? (
            <span
              className={cl(
                active ? 'text-white' : 'text-indigo-500',
                'absolute inset-y-0 right-0 flex items-center pr-4 transition-colors'
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  )
}
