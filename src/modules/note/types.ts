import { JSONContent } from '@tiptap/react'
import type { Category } from '../category/types'
import type { NoteFolder } from '../note-folder/types'

export interface TaskNote {
  id: string
  task: { id: string; name: string }
  deleted?: boolean
}

export interface Note {
  id: string
  title?: string
  content?: JSONContent
  created_at?: Date
  category?: Category | null
  folder?: NoteFolder | null
  taskNotes?: TaskNote[]
  deletedCategory?: Category
}

export type NoteListQueryKey = readonly ['NOTE', 'LIST', { readonly folderId: string | undefined }]
