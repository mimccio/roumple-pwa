import { Category } from '../category/types'
import { RoutineChecklistItem } from '../routine-checklist-item/types'

export type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY'
export type RoutineStatuses = 'TODO' | 'IN_PROGRESS' | 'DONE'

// export type BoardType = 'TODAY' | 'WEEK' | 'MONTH' | 'TOMORROW'

export interface RoutineAction {
  id: number
  date: Date
  routine_id: string
  status: RoutineStatuses
}

export interface Routine {
  id: string
  name: string
  description?: string
  archived: boolean
  priority: number
  period: number
  daily_recurrence: number[]
  weekly_recurrence: number[]
  monthly_recurrence: number[]
  type: ScheduleType
  actions: Pick<RoutineAction, 'id' | 'date' | 'status'>[]
  category_id: string | null
  category: Category | null
  checklist?: RoutineChecklistItem[]
}

export type RoutineItem = Omit<Routine, 'actions'>

export interface UpdateStatusParams {
  routine: Routine
  actionId: number
  status: RoutineStatuses
}

export interface RoutineDetails {
  id: string
  name: string
  description?: string
}

export interface RoutinePriority {
  id: string
  priority: number
}
