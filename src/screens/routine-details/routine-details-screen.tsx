import { useParams } from 'react-router-dom'

import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { useRoutineDetail } from '&/modules/routine/hooks'
import { NotFoundDetails, OfflineError } from '../errors'
import { RoutineNavbar } from './nav'
import { RoutineActivity } from './routine-activity'
import { RoutineDetails } from './routine-details'

// TODO: handle isPaused for action => what to do ?

export function RoutineDetailsScreen() {
  const { activity } = useParams()
  const { routine, isPaused, routineIsLoading, actionIsLoading, date, handleDateChange, action } = useRoutineDetail()

  if (!routine && isPaused) return <OfflineError />
  if (!routine && !routineIsLoading) return <NotFoundDetails />

  return (
    <>
      <RoutineNavbar routine={routine} isLoading={routineIsLoading} />
      {routineIsLoading && <DetailsLoadingPage />}
      {routine && activity && <RoutineActivity />}
      {routine && !activity && (
        <RoutineDetails
          routine={routine}
          action={action}
          date={date}
          handleDateChange={handleDateChange}
          actionIsLoading={actionIsLoading}
        />
      )}
    </>
  )
}
