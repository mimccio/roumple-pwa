import { JSONContent } from '@tiptap/react'
import { Category } from '../category/types'
import { NoteFolder } from '../note-folder/types'

export interface Note {
  id: string
  title?: string
  content?: JSONContent
  created_at?: Date
  category?: Category | null
  folder?: NoteFolder | null
}
