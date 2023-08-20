import { db } from '&/db'
import type { ScheduleType } from '&/common/types'
import type { RoutineAction } from '../types'

interface IParams {
  queryKey: readonly [
    'ACTION',
    'DETAIL',
    string | undefined,
    { readonly scheduleType?: ScheduleType; readonly date: string }
  ]
}

export const fetchRoutineAction = async ({ queryKey }: IParams) => {
  const [, , routineId, { scheduleType, date }] = queryKey
  if (!routineId) throw new Error('routine id is missing')
  if (!scheduleType) throw new Error('schedule type id is missing')

  const { data, error } = await db
    .from('routine_action')
    .select('id, status, date, checkedList: checked_list, doneOccurrence:done_occurrence, scheduleType: schedule_type')
    .eq('routine_id', routineId)
    .eq('schedule_type', scheduleType)
    .eq('date', date)
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data as RoutineAction
}
