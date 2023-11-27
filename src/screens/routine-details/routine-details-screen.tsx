import { useRoutineDetail } from '@/modules/routine/hooks'
import { RoutineNavbar } from './nav'
import { RoutineDetailsContent } from './routine-details-content'

export function RoutineDetailsScreen() {
  const { date, handleDateChange, routine, actionQuery, isPaused, routineNoteList, isLoading } = useRoutineDetail()

  return (
    <>
      <RoutineNavbar routine={routine} date={date} handleDateChange={handleDateChange} />
      <RoutineDetailsContent
        isLoading={isLoading}
        routine={routine}
        date={date}
        handleDateChange={handleDateChange}
        isPaused={isPaused}
        actionQuery={actionQuery}
        routineNoteList={routineNoteList}
      />
    </>
  )
}
