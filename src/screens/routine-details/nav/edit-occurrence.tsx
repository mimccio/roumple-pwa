import { useTranslation } from 'react-i18next'
import { Transition } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { SCHEDULE_TYPES } from '&/common/constants'
import { useOccurrenceTypeText, useOutsideClick } from '&/common/hooks'
import { cl } from '&/common/utils'
import type { Routine } from '&/modules/routine/types'
import { useEditOccurrence } from '&/modules/routine/hooks'
import { getOccurrenceBg } from '&/modules/routine/utils'

interface Props {
  routine: Routine
  close: () => void
  isOpen: boolean
}

export function EditOccurrence({ routine, isOpen, close }: Props) {
  const { t } = useTranslation(['routine', 'action'])
  const { submit, add, sub, onChange, onBlur, occurrence, reset } = useEditOccurrence(routine)
  const typeText = useOccurrenceTypeText(routine.scheduleType)
  const inputBg = getOccurrenceBg(routine.scheduleType)
  const getTypeTextColor = () => {
    if (routine.scheduleType === SCHEDULE_TYPES.weekly) return 'text-sky-600 group-hover:text-sky-700'
    if (routine.scheduleType === SCHEDULE_TYPES.monthly) return 'text-purple-600 group-hover:text-purple-700'
    return 'text-indigo-600 group-hover:text-indigo-700'
  }
  const ref = useOutsideClick(close)

  return (
    <Transition
      ref={ref}
      show={isOpen}
      className="absolute left-1 right-1 top-16 z-20 flex flex-col gap-4 rounded-md border bg-white p-4 shadow-md sm:left-4 sm:right-4"
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div>
        <h5 className="text-sm font-semibold text-gray-500">{t('editOccurrence', { ns: 'action' })}</h5>
        <div className="mt-4 flex items-center justify-center gap-x-2 text-gray-600">
          <button
            disabled={occurrence <= 1}
            onClick={sub}
            className="rounded-lg border border-transparent p-2 transition-colors hover:border-gray-100 hover:text-gray-700 disabled:border-transparent disabled:text-gray-300"
          >
            <ChevronLeftIcon width={18} />
          </button>
          <input
            onChange={onChange}
            onBlur={onBlur}
            type="number"
            step="1"
            min={1}
            max={10}
            className={cl(
              'flex w-10 items-center justify-center rounded-lg border border-transparent py-1 text-center font-semibold text-gray-700 outline-none focus:border-indigo-300',
              inputBg
            )}
            value={occurrence?.toString()}
          />
          <span>{t('time-per', { ns: 'routine', count: occurrence })}</span>
          <span className={cl(getTypeTextColor())}>{typeText}</span>
          <button
            onClick={add}
            disabled={occurrence >= 10}
            className="rounded-lg border border-transparent p-2 transition-colors hover:border-gray-100 hover:text-gray-700 disabled:border-transparent disabled:text-gray-300"
          >
            <ChevronRightIcon width={18} />
          </button>
        </div>
      </div>
      <div className="mt-2 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300 sm:col-start-2"
          onClick={() => {
            submit()
            close()
          }}
        >
          {t('save', { ns: 'action' })}
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          onClick={() => {
            close()
            setTimeout(reset, 200)
          }}
        >
          {t('cancel', { ns: 'action' })}
        </button>
      </div>
    </Transition>
  )
}
