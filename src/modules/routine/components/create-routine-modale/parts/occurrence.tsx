import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'
import type { ScheduleType } from '&/common/types'
import { useOccurrenceTypeText } from '&/common/hooks'
import { getOccurrenceBg } from '&/modules/routine/utils'

interface Props {
  occurrence: number
  scheduleType: ScheduleType
  handleOccurrenceChange: (occurrence: number) => void
}

export function Occurrence({ occurrence, handleOccurrenceChange, scheduleType }: Props) {
  const { t } = useTranslation(['routine', 'schedule'])
  const typeText = useOccurrenceTypeText(scheduleType)
  const bg = getOccurrenceBg(scheduleType)

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value)
    let occurrence = value
    if (value >= 10) occurrence = 10
    handleOccurrenceChange(occurrence)
  }
  const add = () => {
    if (occurrence >= 10) return
    handleOccurrenceChange(occurrence + 1)
  }
  const sub = () => {
    if (occurrence <= 1) return
    handleOccurrenceChange(occurrence - 1)
  }

  const getTypeTextColor = () => {
    if (scheduleType === SCHEDULE_TYPES.weekly) return 'text-sky-700'
    if (scheduleType === SCHEDULE_TYPES.monthly) return 'text-purple-700'
    return 'text-indigo-700'
  }

  const onBlur = () => {
    if (occurrence < 1) handleOccurrenceChange(1)
  }

  return (
    <div>
      <p className="mb-2 text-sm font-bold text-gray-400">{t('occurrence', { ns: 'routine' })}</p>
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
            bg
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
  )
}
