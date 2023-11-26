import type { UseQueryResult } from '@tanstack/react-query'

import { CreatedAt } from '&/common/components/display/created-at'

import type { RoutineAction, Routine } from '&/modules/routine/types'
import type { RoutineNoteByRoutine } from '&/modules/routine-note/types'
import { getIsCurrentDate } from '&/modules/routine/utils'

import {
  RoutineCategory,
  RoutineChecklist,
  RoutineDate,
  RoutineDescription,
  RoutineName,
  RoutineNotes,
  RoutineSchedule,
  RoutineStatus,
} from './parts'

interface Props {
  routine: Routine
  date: Date
  handleDateChange: (date: Date) => void
  actionQuery: UseQueryResult<RoutineAction | undefined, unknown>
  routineNoteList?: RoutineNoteByRoutine[]
}

export function RoutineDetails({ routine, date, handleDateChange, actionQuery, routineNoteList }: Props) {
  const offline =
    !actionQuery.data && actionQuery.isPaused && !getIsCurrentDate({ scheduleType: routine.scheduleType, date })

  return (
    <>
      <RoutineCategory routine={routine} />
      <RoutineName routine={routine} />
      <RoutineSchedule routine={routine} date={date} />
      <RoutineStatus routine={routine} actionQuery={actionQuery} date={date} offline={offline} />

      {!routine.archived && (
        <RoutineDate handleDateChange={handleDateChange} date={date} scheduleType={routine.scheduleType} />
      )}

      {!offline && routine.showChecklist && (
        <RoutineChecklist
          archived={routine.archived}
          isLoading={actionQuery.isLoading && !actionQuery.isPaused}
          routine={routine}
          date={date}
          action={!routine.archived ? actionQuery.data : undefined}
        />
      )}
      <RoutineDescription routine={routine} />
      <RoutineNotes routineNoteList={routineNoteList} />
      <CreatedAt createdAt={routine.created_at} />
    </>
  )
}
