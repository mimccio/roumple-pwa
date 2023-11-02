import type { JSONContent } from '@tiptap/react'
import type { ScheduleType, Status } from '&/common/types'
import type { Category } from '../category/types'
import type { RoutineChecklistItem } from '../routine-checklist-item/types'

export interface RoutineAction {
  id: string
  date: Date
  status: Status
  checkedList?: string[]
  doneOccurrence: number
  scheduleType: ScheduleType
}

export interface Routine {
  id: string
  created_at: Date
  name: string
  description?: JSONContent
  archived: boolean
  scheduleType: ScheduleType
  priority: number
  occurrence: number
  period: number
  daily_recurrence: number[]
  monthly_recurrence: number[]
  weekly_recurrence: number[]
  category_id?: string | null
  category: Category | null
  actions?: RoutineAction[]
  checklist?: RoutineChecklistItem[]
  deletedCategory?: Category
}

export type RoutineItem = Omit<Routine, 'actions'>

export interface UpdateStatusParams {
  routine: Routine
  action?: RoutineAction
  status: Status
}

export interface UpdateCheckedListParams {
  routine: Routine
  action?: RoutineAction
  checklistItemId: string
}

export type SortType = 'PRIORITY' | 'NAME'
