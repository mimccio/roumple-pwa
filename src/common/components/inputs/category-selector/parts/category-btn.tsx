import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation(['common', 'error'])
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

        <span
          className={cl(
            'ml-3 block truncate font-semibold  transition-colors ',
            category?.id ? 'text-gray-500 group-hover:text-gray-600' : 'text-gray-300 group-hover:text-gray-400'
          )}
        >
          {category?.name ||
            (isLoading ? '' : isError ? t('error', { ns: 'error' }) : t('noCategory', { ns: 'common' }))}
        </span>
      </span>
    </Listbox.Button>
  )
}
