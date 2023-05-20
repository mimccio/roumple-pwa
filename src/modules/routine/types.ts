export type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY'

export type BoardType = 'TODAY' | 'WEEK' | 'MONTH' | 'TOMORROW'

export interface RoutineAction {
  id: number
  date: Date
  routine_id: string
  done: boolean
}

export interface Routine {
  id: string
  name: string
  description?: string
  priority: number
  period: number
  daily_recurrence: number[]
  weekly_recurrence: number[]
  monthly_recurrence: number[]
  type: ScheduleType
  actions: Pick<RoutineAction, 'id' | 'date' | 'done'>[]
}

export interface UpdateStatusParams {
  routine: Routine
  actionId: number
  done: boolean
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
