import { DATE_FORMAT } from '&/common/constants'
import { ScheduleType } from '&/common/types'
import { format } from 'date-fns'

interface BoardOptions {
  type: ScheduleType
  date: Date
}

export const TASK_KEYS = {
  all: ['TASK'] as const,
  lists: () => [...TASK_KEYS.all, 'LIST'] as const,
  list: ({ done }: { done: boolean }) => [...TASK_KEYS.lists(), { done }] as const,
  boards: () => [...TASK_KEYS.all, 'BOARD'] as const,
  board: ({ type, date }: BoardOptions) => [...TASK_KEYS.boards(), { type, date: format(date, DATE_FORMAT) }] as const,
  details: () => [...TASK_KEYS.all, 'DETAIL'] as const,
  detail: (id?: string) => [...TASK_KEYS.details(), id] as const,
}

// TODO?: move to common to use also for routines
const DATE = 'DATE'
const PRIORITY = 'PRIORITY'
const NAME = 'NAME'

export const SORT_TYPES = {
  date: DATE as 'DATE',
  priority: PRIORITY as 'PRIORITY',
  name: NAME as 'NAME',
}
