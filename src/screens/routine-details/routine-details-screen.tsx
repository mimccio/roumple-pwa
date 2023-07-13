import { DetailContentSection, DetailInfoSection } from '&/common/components/layouts'
import { RoutineStatusSelector } from '&/common/components/inputs/status-selector'
import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { CreatedAt } from '&/common/components/display/created-at'
import { useDetailRoutine } from '&/modules/routine/hooks'
import { NotFoundDetails, OfflineError } from '../errors'
import { RoutineNavbar } from './nav'

import {
  Priority,
  RoutineCategory,
  RoutineChecklist,
  RoutineDescription,
  RoutineName,
  RoutineNotes,
  RoutineSchedule,
} from './parts'

export function RoutineDetailsScreen() {
  const { routine, isPaused, isLoading, date } = useDetailRoutine()

  if (!routine && isPaused) return <OfflineError />
  if (!routine && !isLoading) return <NotFoundDetails />

  return (
    <>
      <RoutineNavbar routine={routine} isLoading={isLoading} />
      {isLoading && <DetailsLoadingPage />}

      {routine && (
        <>
          <DetailInfoSection>
            <div className="-mx-1 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <RoutineStatusSelector routine={routine} date={date} />
                {routine.archived && <p className="font-bold uppercase text-gray-400">Archived</p>}
              </div>
              <Priority routine={routine} />
            </div>

            <RoutineSchedule routine={routine} date={date} />
            <RoutineCategory routine={routine} />
            <CreatedAt createdAt={routine.created_at} />
          </DetailInfoSection>

          <DetailContentSection>
            <RoutineName routine={routine} />
            <RoutineDescription routine={routine} />
            <RoutineChecklist routine={routine} date={date} />
            <RoutineNotes />
          </DetailContentSection>
        </>
      )}
    </>
  )
}
