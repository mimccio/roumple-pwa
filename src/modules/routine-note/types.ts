import { Note } from '../note/types'

export interface RoutineNote {
  id: string
  routineId: string
  noteId: string
  note: Note
}
