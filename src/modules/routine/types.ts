import type { JSONContent } from '@tiptap/react'
import type { Category } from '../category/types'
import type { RoutineChecklistItem } from '../routine-checklist-item/types'
export type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY'
export type RoutineStatuses = 'TODO' | 'IN_PROGRESS' | 'DONE'

interface RoutineAction {
  id: number
  date: Date
  routine_id: string
  status: RoutineStatuses
  checked_list?: string[]
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
  actions: Pick<RoutineAction, 'id' | 'date' | 'status' | 'checked_list'>[]
  category_id: string | null
  category: Category | null
  checklist?: RoutineChecklistItem[]
  deletedCategory?: Category
}

export type RoutineItem = Omit<Routine, 'actions'>

export interface UpdateStatusParams {
  routine: Routine
  actionId: number
  status: RoutineStatuses
}

export interface UpdateCheckedListParams {
  routine: Routine
  checklistItemId: string
}
