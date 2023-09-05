import { JSONContent } from '@tiptap/react'
import type { Category } from '../category/types'
import type { NoteFolder } from '../note-folder/types'

interface RoutineNote {
  id: string
  routine: { id: string; name: string }
}

interface TaskNote {
  id: string
  task: { id: string; name: string }
}

export interface Note {
  id: string
  title?: string
  content?: JSONContent
  created_at?: Date
  category?: Category | null
  folder?: NoteFolder | null
  routineNotes?: RoutineNote[]
  taskNotes?: TaskNote[]
  deletedCategory?: Category
}

export type NoteListQueryKey = readonly ['NOTE', 'LIST', { readonly folderId: string | undefined }]
