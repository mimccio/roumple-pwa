import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

import { useSelectLanguage } from './use-select-language'

export function LanguageSelector() {
  const { t } = useTranslation('settings')
  const { handleSelectLanguage, language, LANGUAGE_OPTIONS } = useSelectLanguage()

  return (
    <Listbox value={language} onChange={handleSelectLanguage}>
      <div className="relative w-full max-w-[200px]">
        <Listbox.Button className="relative w-full grow rounded-lg bg-gray-50 py-2 pl-4 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300">
          <span className="block truncate">{t('langName')}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {LANGUAGE_OPTIONS.map((lang) => (
              <Listbox.Option
                key={lang.value}
                className={({ active }) =>
                  `relative select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-800'}`
                }
                value={lang.value}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{lang.text}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
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
    </Listbox>
  )
}
