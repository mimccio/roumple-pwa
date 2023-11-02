import { useParams } from 'react-router-dom'

import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { useRoutineDetail } from '&/modules/routine/hooks'
import { NotFoundDetails, OfflineError } from '../errors'
import { RoutineNavbar } from './nav'
import { RoutineActivity } from './routine-activity'
import { RoutineDetails } from './routine-details'

export function RoutineDetailsScreen() {
  const { activity } = useParams()
  const { date, handleDateChange, routine, actionQuery, isPaused, routineNoteList, isLoading } = useRoutineDetail()

  if (isLoading) return <DetailsLoadingPage />
  if (!routine && isPaused) return <OfflineError />
  if (!routine) return <NotFoundDetails />

  return (
    <>
      <RoutineNavbar routine={routine} date={date} handleDateChange={handleDateChange} />
      {activity && <RoutineActivity routine={routine} handleDateChange={handleDateChange} />}
      {!activity && (
        <RoutineDetails
          routine={routine}
          date={date}
          handleDateChange={handleDateChange}
          actionQuery={actionQuery}
          routineNoteList={routineNoteList}
        />
      )}
    </>
  )
}
