import { Note } from '../note/types'

export interface TaskNote {
  id: string
  taskId: string
  noteId: string
  note: Note
}
