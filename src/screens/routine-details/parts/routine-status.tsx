import { useTranslation } from 'react-i18next'
import type { UseQueryResult } from '@tanstack/react-query'
import { ArchiveBoxIcon, SignalSlashIcon } from '@heroicons/react/24/outline'

import { STATUSES } from '@/common/constants'
import { TW_COLOR_BG_50 } from '@/common/constants/tw-colors'
import { cl, getPriorityFromColor, getPriorityToColor } from '@/common/utils'
import { RoutineStatusSelector } from '@/modules/routine/components'
import type { Routine, RoutineAction } from '@/modules/routine/types'
import { getRoutineIsDone } from '@/modules/routine/utils/status'
import { Occurrence, Priority } from '.'

interface Props {
  routine: Routine
  date: Date
  actionQuery: UseQueryResult<RoutineAction | undefined, unknown>
  offline: boolean
}

export function RoutineStatus({ routine, actionQuery, date, offline }: Props) {
  const { t } = useTranslation(['common', 'routine'])

  const getBg = () => {
    if (routine.archived) return TW_COLOR_BG_50.gray
    const isDone = getRoutineIsDone({ routine, action: actionQuery.data })
    if (isDone) return `bg-gradient-to-r to-green-100 from-green-50`
    const fromColor = getPriorityFromColor(routine.priority)
    if (actionQuery.data?.status === STATUSES.inProgress) return `bg-gradient-to-r to-green-100 ${fromColor}`
    return `bg-gradient-to-r ${getPriorityToColor(routine.priority)} ${fromColor}`
  }

  return (
    <div
      className={cl(
        'flex h-16 items-center justify-center gap-x-4 border-b border-gray-200  transition-colors',
        getBg()
      )}
    >
      {routine.archived && (
        <p className="flex items-center gap-x-3 font-bold uppercase text-gray-400">
          <ArchiveBoxIcon className="w-4" />
          {t('archived', { ns: 'common' })}
        </p>
      )}
      {!routine.archived && !offline && (
        <div className="flex items-center">
          <RoutineStatusSelector routine={routine} actionQuery={actionQuery} date={date} />
          <span className="absolute left-4">
            {actionQuery.isLoading && !actionQuery.isPaused ? null : (
              <Occurrence routine={routine} action={actionQuery.data} date={date} />
            )}
          </span>
        </div>
      )}
      {!routine.archived && offline && (
        <div className="flex items-center gap-x-4">
          <SignalSlashIcon className="w-4 text-gray-300" />
          <span className="text-gray-400">{t('Offline no status to show', { ns: 'routine' })}</span>
        </div>
      )}
      <span className="absolute right-2">
        <Priority routine={routine} />
      </span>
    </div>
  )
}
