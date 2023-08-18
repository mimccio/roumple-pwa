import { useTranslation } from 'react-i18next'
import { RingLoader } from 'react-spinners'
import { Transition } from '@headlessui/react'

import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { SCHEDULE_TYPES, SPINNER_COLOR } from '&/common/constants'
import { useRoutineActivity } from '&/modules/routine/hooks/use-routine-activity'

import { Routine } from '&/modules/routine/types'
import { DayActivity } from './day-activity'
import { FatalError, OfflineError } from '&/screens/errors'
import { MonthActivity } from './month-activity'
import { useMainPath } from '&/common/hooks'
import { SignalSlashIcon } from '@heroicons/react/24/outline'

interface Props {
  routine: Routine
  handleDateChange: (date: Date) => void
}

export function RoutineActivity({ routine, handleDateChange }: Props) {
  const { t } = useTranslation('message')
  const mainPath = useMainPath()
  const { actions, isLoading, isError, isPaused } = useRoutineActivity(routine)
  const url = `${mainPath}/d/routine/${routine.id}`

  if (isError) return <FatalError />
  if (!actions && isPaused) return <OfflineError />
  if (isLoading && !actions) return <DetailsLoadingPage />
  if (actions) {
    return (
      <div className="p-2">
        <h4 className="mb-4 p-4 text-center font-bold text-gray-500">{t('activity')}</h4>
        {routine.type === SCHEDULE_TYPES.daily && (
          <DayActivity
            url={url}
            actions={actions}
            occurrence={routine.occurrence}
            handleDateChange={handleDateChange}
            recurrence={routine.daily_recurrence}
          />
        )}

        {routine.type === SCHEDULE_TYPES.monthly && (
          <MonthActivity
            url={url}
            actions={actions}
            occurrence={routine.occurrence}
            handleDateChange={handleDateChange}
            recurrence={routine.daily_recurrence}
          />
        )}

        <Transition
          as="div"
          appear
          show={isLoading}
          className="mt-12 flex flex-col items-center justify-center gap-y-8"
          enter="transition ease-in-out duration-700 delay-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <RingLoader
            color={SPINNER_COLOR}
            loading
            size={50}
            aria-label="Loading Spinner"
            data-testid="fetching loader"
          />
          <p className="text-gray-400">{t('loadingDataNotUpToDate')}</p>
        </Transition>
        {isPaused && (
          <p className="mt-12 flex items-start justify-center gap-x-1 px-4 text-center text-gray-400">
            <span className="flex h-6 items-center">
              <SignalSlashIcon width={18} />
            </span>
            {t('offlineDataNotUpToDate')}
          </p>
        )}
      </div>
    )
  }
  return <FatalError />
}
