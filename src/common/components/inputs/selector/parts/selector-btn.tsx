import type { ElementType } from 'react'
import { useTranslation } from 'react-i18next'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { cl } from '&/common/utils'

interface Props {
  item?: { id: string; name: string } | null
  isLoading: boolean
  isError: boolean
  Icon?: ElementType
  defaultName?: string
}

export function SelectorBtn({ isLoading, item, isError, Icon, defaultName = 'none' }: Props) {
  const { t } = useTranslation('error')

  return (
    <Listbox.Button
      className={cl(
        'group relative flex w-full  items-center justify-between border-b px-4 py-1 text-left text-sm transition-all hover:opacity-75',
        isLoading && 'cursor-wait',
        isError && 'cursor-not-allowed'
      )}
    >
      <span className="flex items-center">
        {Icon && <Icon height={14} width={14} className={cl('mr-3', isError ? 'text-red-200' : 'text-gray-300')} />}

        {isError ? (
          <span className="text-red-400">{t('error', { ns: 'error' })}</span>
        ) : (
          <span
            className={cl(
              'block truncate font-semibold transition-colors ',
              item?.id ? 'text-gray-500 ' : 'text-gray-300 '
            )}
          >
            {item?.name || defaultName}
          </span>
        )}
      </span>
      <ChevronDownIcon className="w-4 text-gray-200" />
    </Listbox.Button>
  )
}
