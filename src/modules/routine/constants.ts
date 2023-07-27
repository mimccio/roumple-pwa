import { format } from 'date-fns'
import type { ScheduleType } from '&/common/types'
import { DATE_FORMAT } from '&/common/constants'

interface BoardOptions {
  type: ScheduleType
  date: Date
}

export const ROUTINE_KEYS = {
  all: ['ROUTINE'] as const,
  lists: () => [...ROUTINE_KEYS.all, 'LIST'] as const,
  list: ({ archived }: { archived: boolean }) => [...ROUTINE_KEYS.lists(), { archived }] as const,
  boards: () => [...ROUTINE_KEYS.all, 'BOARD'] as const,
  board: ({ type, date }: BoardOptions) =>
    [...ROUTINE_KEYS.boards(), { type, date: format(date, DATE_FORMAT) }] as const,
  details: () => [...ROUTINE_KEYS.all, 'DETAIL'] as const,
  detail: (id?: string) => [...ROUTINE_KEYS.details(), id] as const,
}

const PRIORITY = 'PRIORITY'
const NAME = 'NAME'

export const SORT_TYPES = {
  priority: PRIORITY as 'PRIORITY',
  name: NAME as 'NAME',
}
