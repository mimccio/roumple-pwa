import { useTranslation } from 'react-i18next'
import { Listbox } from '@headlessui/react'
import { TagIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import type { Category } from '&/modules/category/types'
import { TW_COLOR_TEXT_500 } from '&/common/constants'
import { TW_COLOR_BG_50, TW_COLOR_BORDER_200 } from '&/common/constants/tw-colors'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface Props {
  category?: Category | null
  isLoading: boolean
  isError: boolean
}

export function CategoryBtn({ isLoading, isError, category }: Props) {
  const { t } = useTranslation(['common', 'error'])
  const color = category?.color ? TW_COLOR_TEXT_500[category.color] : 'text-gray-300'
  const bg = category?.color ? TW_COLOR_BG_50[category.color] : 'bg-gray-50'
  const border = category?.color ? TW_COLOR_BORDER_200[category.color] : 'border-gray-200'

  return (
    <Listbox.Button
      className={cl(
        'group relative flex w-full cursor-pointer items-center justify-between border-y px-4 py-1 text-left transition-all hover:opacity-75',
        border,
        bg,
        isLoading && 'cursor-wait',
        isError && 'cursor-not-allowed'
      )}
    >
      <span className="flex items-center">
        <TagIcon height={14} width={14} className={color} />

        <span className={cl('ml-3 block truncate text-sm  transition-colors ', color)}>
          {category?.name ||
            (isLoading ? '' : isError ? t('error', { ns: 'error' }) : t('noCategory', { ns: 'common' }))}
        </span>
      </span>
      <ChevronDownIcon className={cl('w-4 opacity-30', color)} />
    </Listbox.Button>
  )
}
