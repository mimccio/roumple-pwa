import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, TagIcon } from '@heroicons/react/20/solid'

import { cl } from '&/common/utils'
import type { Routine } from '&/modules/routine/types'
import { useRoutineCategory } from '&/modules/routine/hooks'

interface Props {
  routine: Routine
}

export function Category({ routine }: Props) {
  const { categories, isLoading, error, onSelect } = useRoutineCategory(routine)

  return (
    <div className="mt-8 w-full">
      <Listbox disabled={isLoading || Boolean(error)} value={routine.category} onChange={onSelect}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-400">Category</Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button
                className={cl(
                  'relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6',
                  isLoading && 'cursor-wait',
                  Boolean(error) && 'cursor-not-allowed'
                )}
              >
                <span className="flex items-center">
                  <TagIcon
                    height={20}
                    width={20}
                    className={routine.category?.color ? `text-${routine.category.color}-500` : 'text-gray-300'}
                  />

                  <span className="ml-3 block truncate font-semibold text-gray-600">
                    {routine.category?.name || (isLoading ? '' : error ? 'Error' : 'None')}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <Listbox.Option
                    key="none"
                    className={({ active }) =>
                      cl(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={{ id: null }}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex cursor-pointer items-center">
                          <TagIcon height={20} width={20} className="text-gray-300" />
                          <span className={cl(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                            None
                          </span>
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
                  {categories?.map((category) => (
                    <Listbox.Option
                      key={category.id}
                      className={({ active }) =>
                        cl(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={category}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex cursor-pointer items-center">
                            <TagIcon height={20} width={20} className={`text-${category.color}-500`} />
                            <span className={cl(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                              {category.name}
                            </span>
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
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}
