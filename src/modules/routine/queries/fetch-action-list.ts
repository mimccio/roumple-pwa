import { format, startOfMonth, startOfToday, subMonths } from 'date-fns'
import { db } from '&/db'
import type { ScheduleType } from '&/common/types'
import { DATE_FORMAT, SCHEDULE_TYPES } from '&/common/constants'
import type { RoutineAction } from '../types'

export const fetchActionList = async (routineId: string, scheduleType: ScheduleType) => {
  const date = startOfToday()

  // TODO!: WEEK
  const getOldestDate = () => {
    if (scheduleType === SCHEDULE_TYPES.monthly) return startOfMonth(subMonths(date, 12))
    // if (scheduleType === SCHEDULE_TYPES.weekly) return startOfMonth(subMonths(date, 1))

    return startOfMonth(subMonths(date, 1))
  }

  const oldestDate = getOldestDate()

  const { data, error } = await db
    .from('routine_action')
    .select('id, status, date, checkedList: checked_list, doneOccurrence:done_occurrence, scheduleType: schedule_type')
    .eq('routine_id', routineId)
    .gte('date', format(new Date(oldestDate), DATE_FORMAT))
    .limit(65)

  if (error) throw error
  return data as RoutineAction[]
}
