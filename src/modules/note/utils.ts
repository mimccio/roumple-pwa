import { compareAsc } from 'date-fns'
import { Note } from './types'
import { RoutineNoteByRoutine } from '../routine-note/types'

export const sortNotes = (a: Note, b: Note) => {
  if (b.created_at && a.created_at) return compareAsc(new Date(b.created_at), new Date(a.created_at))
  return 0
}

export const sortRoutineNotes = (a: RoutineNoteByRoutine, b: RoutineNoteByRoutine) => {
  if (a.note.title === b.note.title) return 0
  if (!a.note.title) return -1
  if (!b.note.title) return 1
  return a.note.title.toLowerCase() < b.note.title.toLowerCase() ? -1 : 1
}
