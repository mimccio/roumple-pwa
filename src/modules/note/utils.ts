import { compareAsc } from 'date-fns'
import { Note } from './types'

export const sortNotes = (a: Note, b: Note) => {
  if (b.created_at && a.created_at) return compareAsc(new Date(b.created_at), new Date(a.created_at))
  return 0
}
