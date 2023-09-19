import { Fragment, useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Popover, Transition } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { SCHEDULE_TYPES } from '&/common/constants'
import { useOccurrenceTypeText } from '&/common/hooks'
import { cl } from '&/common/utils'
import type { RoutineAction, Routine } from '&/modules/routine/types'
import { useEditOccurrence } from '&/modules/routine/hooks'
import { getOccurrenceBg } from '&/modules/routine/utils'

interface Props {
  routine: Routine
  action?: RoutineAction
}

export function Occurrence({ routine, action }: Props) {
  const { t } = useTranslation(['routine', 'action'])
  const typeText = useOccurrenceTypeText(routine.scheduleType)
  const { submit, add, sub, onChange, onBlur, occurrence, reset } = useEditOccurrence(routine)
  const inputBg = getOccurrenceBg(routine.scheduleType)
  const prevCountRef = useRef<number>(action?.doneOccurrence || 0)
  const prevIdRef = useRef<string>(routine.id)

  const [isAnimating, setIsAnimating] = useState(false)
  const [animationVariant, setAnimationVariant] = useState<string>('initial')

  const [color, setColor] = useState('#6b7280')
  const doneOccurrence = action?.doneOccurrence || 0

  const getTwColor = () => {
    if (doneOccurrence === 0) return 'text-gray-500'
    if (doneOccurrence === occurrence) return 'text-green-500'
    return 'text-blue-500'
  }

  const variants = {
    initial: {
      scale: 1,
      color,
    },
    max: {
      color: ['#10b981', '#10b981', '#22c55e'],
      scale: [1, 2, 1],
    },
    zero: {
      color: ['#10b981', '#10b981', '#6b7280'],
      scale: [1, 2, 1],
    },
    between: {
      color: ['#10b981', '#10b981', '#3b82f6'],
      scale: [1, 2, 1],
    },
  }

  useEffect(() => {
    const getColor = () => {
      if (doneOccurrence === 0) {
        setColor('#6b7280')
      } else if (doneOccurrence === routine.occurrence) {
        setColor('#22c55e')
      } else {
        setColor('#3b82f6')
      }
    }
    getColor()
    if (prevCountRef.current !== doneOccurrence && prevIdRef.current === routine.id) {
      setAnimationVariant('')

      if (doneOccurrence === 0) {
        setAnimationVariant('zero')
      } else if (doneOccurrence === routine.occurrence) {
        setAnimationVariant('max')
      } else {
        setAnimationVariant('between')
      }
      setIsAnimating(true)
      prevCountRef.current = doneOccurrence
    }

    prevIdRef.current = routine.id
  }, [doneOccurrence, routine.id, routine.occurrence])

  const getTypeTextColor = () => {
    if (routine.scheduleType === SCHEDULE_TYPES.weekly) return 'text-sky-600 group-hover:text-sky-700'
    if (routine.scheduleType === SCHEDULE_TYPES.monthly) return 'text-purple-600 group-hover:text-purple-700'
    return 'text-indigo-600 group-hover:text-indigo-700'
  }

  if (!routine?.occurrence || routine.occurrence <= 1) return null

  return (
    <Popover>
      <Popover.Button className="text-lg font-bold  transition-colors group-hover:text-gray-600">
        <motion.p
          animate={isAnimating ? animationVariant : false}
          variants={variants}
          className={cl('origin-left', getTwColor())}
          onAnimationComplete={() => setAnimationVariant('initial')}
        >
          {doneOccurrence} / {routine.occurrence}
        </motion.p>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-4 w-max max-w-lg -translate-x-1/2 rounded-lg bg-white p-4 shadow-md">
          {({ close }) => (
            <div>
              <div>
                <div className="flex items-center justify-center gap-x-2 text-gray-600">
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
                    value={occurrence.toString()}
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
              <div className="mt-6 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className=" text-gra-700 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300 sm:col-start-2"
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
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
