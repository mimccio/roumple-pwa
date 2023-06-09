import { JSONContent } from '@tiptap/react'
import { Category } from '../category/types'
import { NoteFolder } from '../note-folder/types'
import { RoutineNote } from '../routine-note/types'

export interface Note {
  id: string
  title?: string
  content?: JSONContent
  created_at?: Date
  category?: Category | null
  folder?: NoteFolder | null
  routineNotes?: RoutineNote[]
}

export type NoteListQueryKey = [key: string, list: string, options: { folderId?: string }]
