import { useParams } from 'react-router-dom'
import type { UseQueryResult } from '@tanstack/react-query'

import { DetailsFallback } from '&/common/components/fallbacks/details'
import type { RoutineAction, Routine } from '&/modules/routine/types'
import type { RoutineNoteByRoutine } from '&/modules/routine-note/types'

import { RoutineActivity } from './routine-activity'
import { RoutineDetails } from './routine-details'

interface Props {
  routine?: Routine
  isPaused: boolean
  isLoading: boolean
  date: Date
  handleDateChange: (date: Date) => void
  actionQuery: UseQueryResult<RoutineAction | undefined, unknown>
  routineNoteList?: RoutineNoteByRoutine[]
}

export function RoutineDetailsContent({
  routine,
  date,
  handleDateChange,
  actionQuery,
  routineNoteList,
  isLoading,
  isPaused,
}: Props) {
  const { activity } = useParams()

  if (!routine) return <DetailsFallback isLoading={isLoading} isPaused={isPaused} />

  return (
    <>
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
