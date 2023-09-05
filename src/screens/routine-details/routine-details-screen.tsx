import { useParams } from 'react-router-dom'

import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { useRoutineDetail } from '&/modules/routine/hooks'
import { NotFoundDetails, OfflineError } from '../errors'
import { RoutineNavbar } from './nav'
import { RoutineActivity } from './routine-activity'
import { RoutineDetails } from './routine-details'

export function RoutineDetailsScreen() {
  const { activity } = useParams()
  const { date, handleDateChange, routineQuery, actionQuery } = useRoutineDetail()

  if (!routineQuery.data && routineQuery.isPaused) return <OfflineError />
  if (!routineQuery.data && !routineQuery.isLoading) return <NotFoundDetails />

  return (
    <>
      <RoutineNavbar
        routine={routineQuery.data}
        isLoading={routineQuery.isLoading}
        date={date}
        handleDateChange={handleDateChange}
      />
      {routineQuery.isLoading && <DetailsLoadingPage />}
      {routineQuery.data && activity && (
        <RoutineActivity routine={routineQuery.data} handleDateChange={handleDateChange} />
      )}
      {routineQuery.data && !activity && (
        <RoutineDetails
          routine={routineQuery.data}
          date={date}
          handleDateChange={handleDateChange}
          actionQuery={actionQuery}
        />
      )}
    </>
  )
}
