import { useTranslation } from 'react-i18next'
import { SignalSlashIcon } from '@heroicons/react/24/outline'

import locationImg from '&/assets/illustrations/location.png'
import { SCHEDULE_TYPES } from '&/common/constants'
import { cl, getScheduleTypeTextColor } from '&/common/utils'
import { useMainPath } from '&/common/hooks'
import { SyncSpinner } from '&/common/components/spinners'
import { DetailsFallback } from '&/common/components/fallbacks/details'

import type { Routine } from '&/modules/routine/types'
import { useRoutineActivity } from '&/modules/routine/hooks/use-routine-activity'
import { DayActivity } from './day-activity'
import { WeekActivity } from './week-activity'
import { MonthActivity } from './month-activity'
import { Link } from 'react-router-dom'

interface Props {
  routine: Routine
  handleDateChange: (date: Date) => void
}

export function RoutineActivity({ routine, handleDateChange }: Props) {
  const { t } = useTranslation('message')
  const mainPath = useMainPath()
  const { actions, isLoading, isError, isPaused } = useRoutineActivity(routine)
  const url = `${mainPath}/d/routine/${routine.id}`

  if (!actions) return <DetailsFallback isError={isError} isLoading={isLoading} isPaused={isPaused} />

  return (
    <div className="flex h-full flex-col justify-between border-t border-gray-200 px-4 pb-16 pt-4">
      <div>
        <h3 className="mb-6 font-serif font-bold text-gray-500">{t('activity')}</h3>
        <Link to={url} className=" mx-auto mb-12 flex w-fit max-w-xl px-4 py-1">
          <h4
            className={cl(
              'line-clamp-3  text-lg font-semibold text-indigo-500',
              getScheduleTypeTextColor(routine.scheduleType)
            )}
          >
            {routine.name}
          </h4>
        </Link>
        {routine.scheduleType === SCHEDULE_TYPES.daily && (
          <DayActivity
            url={url}
            actions={actions}
            occurrence={routine.occurrence}
            handleDateChange={handleDateChange}
            recurrence={routine.daily_recurrence}
            createdAt={routine.created_at}
          />
        )}

        {routine.scheduleType === SCHEDULE_TYPES.weekly && (
          <WeekActivity
            url={url}
            actions={actions}
            occurrence={routine.occurrence}
            handleDateChange={handleDateChange}
            recurrence={routine.weekly_recurrence}
            createdAt={routine.created_at}
          />
        )}

        {routine.scheduleType === SCHEDULE_TYPES.monthly && (
          <MonthActivity
            url={url}
            actions={actions}
            occurrence={routine.occurrence}
            handleDateChange={handleDateChange}
            recurrence={routine.monthly_recurrence}
            oldest={routine.created_at}
          />
        )}

        <SyncSpinner isLoading={isLoading} text={t('loadingDataNotUpToDate')} />

        {isPaused && (
          <p className="mt-12 flex items-start justify-center gap-x-1 px-4 text-center text-gray-400">
            <span className="flex h-6 items-center">
              <SignalSlashIcon width={18} />
            </span>
            {t('offlineDataNotUpToDate')}
          </p>
        )}
      </div>

      <div className="mx-auto pb-16 pt-12">
        <img alt="" src={locationImg} className="h-52 w-52  opacity-25" aria-hidden="true" />
      </div>
    </div>
  )
}
