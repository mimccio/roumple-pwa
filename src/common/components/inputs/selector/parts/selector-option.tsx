import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'

interface Props {
  option: { id?: string; name: string }
  selected: boolean
}

export function SelectorOption({ option, selected }: Props) {
  return (
    <Listbox.Option
      key={option.id || 'none'}
      className={({ active }) =>
        cl(active ? 'bg-indigo-600 text-white' : 'text-gray-600', 'relative cursor-default select-none py-2 pl-3 pr-9')
      }
      value={option}
    >
      {({ active }) => (
        <>
          <div className="flex cursor-pointer items-center">
            <span className={cl(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>{option.name}</span>
          </div>

          {selected ? (
            <span
              className={cl(
                active ? 'text-white' : 'text-indigo-600',
                'absolute inset-y-0 right-0 flex items-center pr-4'
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
