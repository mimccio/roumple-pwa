import { format, startOfMonth, startOfToday, startOfYear, subMonths, subYears } from 'date-fns'
import { db } from '@/db'
import type { ScheduleType } from '@/common/types'
import { DATE_FORMAT, SCHEDULE_TYPES } from '@/common/constants'
import type { RoutineAction } from '../types'

export const fetchActionList = async (routineId: string, scheduleType: ScheduleType) => {
  const date = startOfToday()

  const getOldestDate = () => {
    if (scheduleType === SCHEDULE_TYPES.daily) return startOfMonth(subMonths(date, 3))
    if (scheduleType === SCHEDULE_TYPES.weekly) return startOfMonth(subMonths(date, 5))
    return startOfYear(subYears(date, 2))
  }

  const oldestDate = getOldestDate()

  const { data, error } = await db
    .from('routine_action')
    .select('id, status, date, checkedList: checked_list, doneOccurrence:done_occurrence, scheduleType: schedule_type')
    .eq('routine_id', routineId)
    .eq('schedule_type', scheduleType)
    .gte('date', format(new Date(oldestDate), DATE_FORMAT))
    .limit(125)

  if (error) throw error
  return data as RoutineAction[]
}
