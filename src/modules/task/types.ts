import type { JSONContent } from '@tiptap/react'
import type { ScheduleType, Status } from '@/common/types'
import type { Category } from '../category/types'
import { TaskChecklistItem } from '../task-checklist-item/types'

export type TaskScheduleType = ScheduleType | null

export interface Task {
  id: string
  name: string
  created_at: Date
  description?: JSONContent
  category: Category | null
  priority: number
  status: Status
  period: number
  scheduleType: TaskScheduleType
  date: Date | null
  checklist: TaskChecklistItem[]
  newChecklistItem?: TaskChecklistItem
  checkedItemIds: string[]
  deletedCategory?: Category
  showChecklist: boolean
}

export type SortType = 'DATE' | 'PRIORITY' | 'NAME'
