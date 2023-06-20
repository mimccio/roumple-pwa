import type { JSONContent } from '@tiptap/react'
import type { Status } from '&/common/types'
import type { Category } from '../category/types'

export interface Task {
  id: string
  name: string
  createdAt: Date
  description?: JSONContent
  category: Category | null
  priority: number
  status: Status
}
