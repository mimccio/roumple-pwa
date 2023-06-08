import { Note } from '../note/types'

export interface NoteFolder {
  id: string
  name: string
  notes?: Note
  noteCount?: [{ count: number }]
}
