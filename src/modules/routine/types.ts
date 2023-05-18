export type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY'

export interface Routine {
  id: string
  name: string
  description?: string
  priority: number
  period: number
  recurrence: boolean[]
  type: ScheduleType
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
