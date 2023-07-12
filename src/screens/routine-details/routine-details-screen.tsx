import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { useRoutine } from '&/modules/routine/hooks'

import { NotFoundDetails, OfflineError } from '../errors'
import { RoutineNavbar } from './nav'

import { DetailContentSection, DetailInfoSection } from '&/common/components/layouts'
import { RoutineStatusSelector } from '&/common/components/inputs/status-selector'
import { CreatedAt } from '&/common/components/display/created-at'
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
  const { routine, isPaused, isLoading, date } = useRoutine()

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
              <RoutineStatusSelector routine={routine} date={date} />
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
