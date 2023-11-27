import { format } from 'date-fns'
import type { ScheduleType } from '@/common/types'
import { DATE_FORMAT } from '@/common/constants'
import { getScheduleFormattedDate } from './utils'

interface BoardOptions {
  scheduleType: ScheduleType
  date: Date
}

export const ROUTINE_KEYS = {
  all: ['ROUTINE'] as const,
  lists: () => [...ROUTINE_KEYS.all, 'LIST'] as const,
  list: ({ archived }: { archived: boolean }) => [...ROUTINE_KEYS.lists(), { archived }] as const,
  boards: () => [...ROUTINE_KEYS.all, 'BOARD'] as const,
  board: ({ scheduleType, date }: BoardOptions) =>
    [...ROUTINE_KEYS.boards(), { scheduleType, date: format(date, DATE_FORMAT) }] as const,
  details: () => [...ROUTINE_KEYS.all, 'DETAIL'] as const,
  detail: (id?: string) => [...ROUTINE_KEYS.details(), id] as const,
}

export const ACTION_KEYS = {
  all: ['ACTION'] as const,
  lists: () => [...ACTION_KEYS.all, 'LIST'] as const,
  list: (routineId: string) => [...ACTION_KEYS.details(), routineId] as const,
  details: () => [...ACTION_KEYS.all, 'DETAIL'] as const,
  detail: ({ routineId, date, scheduleType }: { routineId?: string; date: Date; scheduleType?: ScheduleType }) =>
    [
      ...ACTION_KEYS.details(),
      routineId,
      { scheduleType, date: getScheduleFormattedDate({ scheduleType, date }) },
    ] as const,
}

const PRIORITY = 'PRIORITY'
const NAME = 'NAME'

export const SORT_TYPES = {
  priority: PRIORITY as 'PRIORITY',
  name: NAME as 'NAME',
}
