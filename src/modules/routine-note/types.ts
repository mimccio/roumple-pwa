import { Note } from '../note/types'
import { Routine } from '../routine/types'

export interface RoutineNote {
  id: string
  note: Pick<Note, 'id' | 'title'>
  routine: Pick<Routine, 'id' | 'name'>
}

export type RoutineNoteByRoutine = {
  id: RoutineNote['id']
  note: RoutineNote['note']
  deleted?: boolean
}

export type RoutineNoteByNote = {
  id: RoutineNote['id']
  routine: RoutineNote['routine']
  deleted?: boolean
}

export type FetchRoutineNoteListByNoteQueryKey = readonly ['ROUTINE_NOTE', 'NOTE', string | undefined]
export type FetchRoutineNoteListByRoutineQueryKey = readonly ['ROUTINE_NOTE', 'ROUTINE', string | undefined]
