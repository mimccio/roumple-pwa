import { useTranslation } from 'react-i18next'
import type { UseQueryResult } from '@tanstack/react-query'

import { DetailContentSection, DetailInfoSection } from '&/common/components/layouts'
import { RoutineStatusSelector } from '&/common/components/inputs/status-selector'
import { CreatedAt } from '&/common/components/display/created-at'
import { RoutineAction, Routine } from '&/modules/routine/types'

import {
  Priority,
  RoutineCategory,
  RoutineChecklist,
  RoutineDescription,
  RoutineName,
  RoutineNotes,
  RoutineSchedule,
  Occurrence,
  RoutineDate,
} from './parts'
import { OfflineError } from '../errors'
import { getIsCurrentDate } from '&/modules/routine/utils'

interface Props {
  routine: Routine
  date: Date
  handleDateChange: (date: Date) => void
  actionQuery: UseQueryResult<RoutineAction | undefined, unknown>
}

export function RoutineDetails({ routine, date, handleDateChange, actionQuery }: Props) {
  const { t } = useTranslation('common')
  const isCurrentDate = getIsCurrentDate({ scheduleType: routine.scheduleType, date })

  if (!actionQuery.data && actionQuery.isPaused && !isCurrentDate) {
    return (
      <>
        <DetailInfoSection>
          <RoutineDate handleDateChange={handleDateChange} date={date} scheduleType={routine.scheduleType} />
        </DetailInfoSection>
        <OfflineError />
      </>
    )
  }

  return (
    <>
      <DetailInfoSection>
        <RoutineDate handleDateChange={handleDateChange} date={date} scheduleType={routine.scheduleType} />
        <div className="-mx-1 mb-4 mt-2 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <RoutineStatusSelector routine={routine} actionQuery={actionQuery} date={date} />
            {actionQuery.isLoading && !actionQuery.isPaused ? null : (
              <Occurrence routine={routine} action={actionQuery.data} />
            )}
          </div>

          <div className="flex items-center gap-x-4">
            {routine.archived && <p className="font-bold uppercase text-gray-400">{t('archived')}</p>}
            <Priority routine={routine} />
          </div>
        </div>

        <RoutineSchedule routine={routine} date={date} />
        <RoutineCategory routine={routine} />
        <CreatedAt createdAt={routine.created_at} />
      </DetailInfoSection>

      <DetailContentSection>
        <RoutineName routine={routine} />
        <RoutineDescription routine={routine} />
        <RoutineChecklist
          routine={routine}
          date={date}
          action={actionQuery.data}
          isLoading={actionQuery.isLoading && !actionQuery.isPaused}
        />
        <RoutineNotes />
      </DetailContentSection>
    </>
  )
}
