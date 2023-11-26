import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Listbox, Transition } from '@headlessui/react'

import type { Category } from '&/modules/category/types'
import { CategoryOption } from './parts/category-option'
import { CategoryBtn } from './parts/category-btn'

interface Props {
  category?: Category | null
  categoryList?: Category[]
  isLoading: boolean
  isError: boolean
  onSelect: (category: Category) => void
}

export function CategorySelector({ category, categoryList, isLoading, isError, onSelect }: Props) {
  const { t } = useTranslation('common')

  return (
    <div className="w-full">
      <Listbox disabled={isLoading || isError} value={category} onChange={onSelect}>
        {({ open }) => (
          <div className="relative">
            <CategoryBtn category={category} isLoading={isLoading} isError={isError} />
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute left-1 right-1 z-10 mt-1 max-h-60  max-w-lg overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <CategoryOption category={{ id: null, name: t('noCategory') }} selected={category?.id == null} />

                {categoryList?.map((categoryItem) => (
                  <CategoryOption
                    key={categoryItem.id}
                    category={categoryItem}
                    selected={categoryItem.id === category?.id}
                  />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  )
}
