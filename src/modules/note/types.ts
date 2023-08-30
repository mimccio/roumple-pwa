import { JSONContent } from '@tiptap/react'
import { Category } from '../category/types'
import { NoteFolder } from '../note-folder/types'
import { RoutineNote } from '../routine-note/types'
import { TaskNote } from '../task-note/types'

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
