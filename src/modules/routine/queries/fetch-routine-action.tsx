import { format } from 'date-fns'
import { db } from '&/db'
import { DATE_FORMAT } from '&/common/constants'
import type { RoutineAction } from '../types'

interface IParams {
  queryKey: readonly ['ACTION', 'ROUTINE', string | undefined, Date]
}

export const fetchRoutineAction = async ({ queryKey }: IParams) => {
  const [, , routineId, date] = queryKey

  if (!routineId) throw new Error('routine id is missing')

  const { data, error } = await db
    .from('routine_action')
    .select('id, status, date, checkedList: checked_list, doneOccurrence:done_occurrence')
    .eq('routine_id', routineId)
    .eq('date', format(new Date(date), DATE_FORMAT))
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data as RoutineAction
}
