import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import type { Category } from '&/modules/category/types'
import { CategoryOption } from './parts/category-option'
import { CategoryBtn } from './parts/category-btn'

interface Props {
  category: Category | null
  categoryList?: Category[]
  isLoading: boolean
  isError: boolean
  onSelect: (category: Category) => void
}

export function CategorySelector({ category, categoryList, isLoading, isError, onSelect }: Props) {
  return (
    <div className="w-full">
      <Listbox disabled={isLoading || isError} value={category} onChange={onSelect}>
        {({ open }) => (
          <div className="relative">
            <CategoryBtn category={category} isLoading={isLoading} isError={isError} />
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <CategoryOption category={{ id: null, name: 'no category' }} />

                {categoryList?.map((category) => (
                  <CategoryOption key={category.id} category={category} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  )
}