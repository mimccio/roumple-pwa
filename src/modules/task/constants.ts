import { ScheduleType } from '&/common/types'

interface BoardOptions {
  type: ScheduleType
  date: Date
}

export const TASK_KEYS = {
  all: ['TASK'] as const,
  lists: () => [...TASK_KEYS.all, 'LIST'] as const,
  list: () => [...TASK_KEYS.lists()] as const,
  boards: () => [...TASK_KEYS.all, 'BOARD'] as const,
  board: (options: BoardOptions) => [...TASK_KEYS.boards(), options] as const,
  details: () => [...TASK_KEYS.all, 'DETAIL'] as const,
  detail: (id?: string) => [...TASK_KEYS.details(), id] as const,
}