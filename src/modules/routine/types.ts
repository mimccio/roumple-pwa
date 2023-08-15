import type { JSONContent } from '@tiptap/react'
import type { Category } from '../category/types'
import type { RoutineChecklistItem } from '../routine-checklist-item/types'
export type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY'
export type RoutineStatuses = 'TODO' | 'IN_PROGRESS' | 'DONE'

export interface RoutineAction {
  id: string
  date: Date
  status: RoutineStatuses
  checkedList?: string[]
  doneOccurrence: number
}

export interface Routine {
  id: string
  created_at: Date
  name: string
  description?: JSONContent
  archived: boolean
  priority: number
  period: number
  daily_recurrence: number[]
  weekly_recurrence: number[]
  monthly_recurrence: number[]
  type: ScheduleType
  category_id?: string | null
  category: Category | null
  checklist?: RoutineChecklistItem[]
  deletedCategory?: Category
  occurrence: number
  actions?: RoutineAction[]
}

export type RoutineItem = Omit<Routine, 'actions'>

export interface UpdateStatusParams {
  routine: Routine
  action?: RoutineAction
  status: RoutineStatuses
}

export interface UpdateCheckedListParams {
  routine: Routine
  action?: RoutineAction
  checklistItemId: string
}

export type SortType = 'PRIORITY' | 'NAME'
