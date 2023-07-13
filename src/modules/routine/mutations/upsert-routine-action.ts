import { format, startOfWeek } from 'date-fns'

import { db } from '&/db'
import type { ScheduleType } from '&/common/types'
import { DATE_FORMAT, SCHEDULE_TYPES } from '&/common/constants'
import { getUserId } from '&/modules/utils'
import type { Routine, RoutineStatuses } from '../types'

interface Params {
  actionId?: number
  date: Date
  routine: Routine
  status: RoutineStatuses
  type: ScheduleType
  checkedList?: string[]
}

export const upsertRoutineAction = async ({ status, actionId, type, date, routine, checkedList }: Params) => {
  const userId = await getUserId()

  const getDate = () => {
    if (type === SCHEDULE_TYPES.monthly) return format(date, 'yyyy-MM-01')
    if (type === SCHEDULE_TYPES.weekly) return format(startOfWeek(date), DATE_FORMAT)
    if (type === SCHEDULE_TYPES.daily) return format(date, DATE_FORMAT)
  }

  const action = {
    date: getDate(),
    id: actionId,
    routine_id: routine.id,
    user_id: userId,
    status,
    checked_list: checkedList,
  }

  const { error, data } = await db.from('routine_action').upsert(action).select('*').single()

  if (error) throw error
  return data
}
